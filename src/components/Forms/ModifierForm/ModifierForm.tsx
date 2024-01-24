import { Button, Group, Select, SimpleGrid, Stack, TextInput, Textarea } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useCreatePromptMutation } from "../../../api/promptsApi";
import { useUser } from "../../../context/UserContext";
import { Label, LabelPlural, SelectedDatabaseType, Type } from "../../../model/SelectedDatabaseType";
import { Language } from "../../../model/Language";
import { PromptRequest } from "../../../model/PromptRequest";
import { useEffect, useState } from "react";
import { useSelectedDatabaseType } from "../../../context/SelectedDatabaseTypeContext";
import { useFiltersQuery } from "../../../api/filtersApi";
import { useSelectedFilters } from "../../../context/SelectedFiltersContext";
import { getProviders } from "../../../api/providersApi";
import { Repository } from "../../../model/Repository";
import { Technology } from "../../../model/Technology";
import { Provider } from "../../../model/Provider";
import { useCreateModifierMutation } from "../../../api/modifiersApi";

interface ModifierForm {
    promptRequest: PromptRequest | undefined
}

export function ModifierForm({ promptRequest }: ModifierForm) {
    const { selectedFilters } = useSelectedFilters();
    if (!selectedFilters) return <></>;

    const { user } = useUser();
    const [languageData, setLanguageData] = useState<{ label: string, value: string }[]>([]);
    const [languageId, setLanguageId] = useState<string | null>("");

    const [repositoryData, setRepositoryData] = useState<{ label: string, value: string }[]>([]);
    const [repositoryId, setRepositoryId] = useState<string | null>("");

    const [technologyData, setTechnologyData] = useState<{ label: string, value: string }[]>([]);
    const [technologyId, setTechnologyId] = useState<string | null>("");

    const [providerData, setProviderData] = useState<{ label: string, value: string }[]>([]);
    const [providerId, setProviderId] = useState<string | null>("");

    const [name, setName] = useState(promptRequest ? promptRequest.title : "");
    const [description, setDescription] = useState(promptRequest ? promptRequest.description : "");
    const [content, setContent] = useState(promptRequest ? promptRequest.content : "");
    const { setSelectedDatabaseType } = useSelectedDatabaseType();

    const createMutation = useCreateModifierMutation();

    const filtersQuery = useFiltersQuery(user.id);

    const save = async () => {
        const modifiersIds = promptRequest ? promptRequest.metadata.modifiers.map(m => m.id) : [];
        const templatesIds = promptRequest ? promptRequest.metadata.templates.map(t => t.id) : [];
        const chatHistory = promptRequest ? promptRequest.metadata.history : [];
        const contentValue = promptRequest && promptRequest.chatReply !== "" ? promptRequest.chatReply : content;

        if (!languageId || !repositoryId || !technologyId) return false;
        
        const newFormData = new FormData();
        newFormData.append("userId", user.id);
        newFormData.append("language_id", languageId.toString());
        newFormData.append("repository_id", repositoryId.toString());
        newFormData.append("technology_id", technologyId.toString());
        if (providerId) {
            newFormData.append("provider_id", providerId.toString());
        }
        newFormData.append("title", name);
        newFormData.append("description", description);
        newFormData.append("content", contentValue);
        newFormData.append("modifiers_ids", JSON.stringify(modifiersIds));
        newFormData.append("templates_ids", JSON.stringify(templatesIds));
        newFormData.append("chat_history", JSON.stringify(chatHistory));

        createMutation.mutate(newFormData);

        const newType = new SelectedDatabaseType();
        newType.type = Type.PROMPT;
        newType.label = Label.Prompt;
        newType.labelPlural = LabelPlural.Prompts
        setSelectedDatabaseType(newType);
    }

    useEffect(() => {
        if (filtersQuery.data) {
            const languages = filtersQuery.data.languages.map((l: Language) => {
                return {
                    label: l.name,
                    value: l.id.toString()
                }
            });
            setLanguageId(languages[0].value)
            setLanguageData(languages);

            const repositories = filtersQuery.data.repositories.map((r: Repository) => {
                return {
                    label: r.name,
                    value: r.id.toString()
                }
            });
            setRepositoryId(repositories[0].value)
            setRepositoryData(repositories);

            const technologies = filtersQuery.data.technologies.map((t: Technology) => {
                return {
                    label: t.name,
                    value: t.id.toString()
                }
            });
            if (promptRequest) {
                setTechnologyId(promptRequest.technology.id.toString())
            } else {
                setTechnologyId(technologies[0].value)
            }
            setTechnologyData(technologies);

            updateProviderData(parseInt(technologies[0].value));
        }
    }, []);

    const updateProviderData = async (technologyId: number) => {
        const providers = await getProviders(technologyId);
        const providerData = providers.map((p: Provider) => {
            return {
                label: p.model_name,
                value: p.id.toString()
            }
        });

        setProviderData(providerData);
        if (promptRequest) {
            setProviderId(promptRequest.provider.id.toString())
        }
    }

    const onChangeTechnology = (technologyId: string | null) => {
        if (technologyId) {
            setTechnologyId(technologyId);
            updateProviderData(parseInt(technologyId))
        }
    }

    return (
        <Stack my={"xs"}>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <Select
                    label="Language"
                    required
                    data={languageData}
                    value={languageId}
                    allowDeselect={false}
                    onChange={setLanguageId}
                />
                <Select
                    label="Repository"
                    required
                    data={repositoryData}
                    value={repositoryId}
                    allowDeselect={false}
                    onChange={setRepositoryId}
                />
                <Select
                    label="Technology"
                    required
                    data={technologyData}
                    value={technologyId}
                    allowDeselect={false}
                    onChange={onChangeTechnology}
                    />
                <Select
                    label="Provider"
                    data={providerData}
                    value={providerId}
                    onChange={setProviderId}
                />
            </SimpleGrid>
            <TextInput
                label="Name"
                onChange={(e: any) => setName(e.target.value)}
                value={name}
                required
                placeholder="Name of the Modifier"
            />
            <Textarea
                label="Description"
                autosize
                required
                minRows={3}
                onChange={e => setDescription(e.target.value)}
                value={description}
                placeholder="Write a brief description"
            />
            <Textarea
                label="Content"
                autosize
                required
                minRows={3}
                onChange={(e: any) => setContent(e.target.value)}
                value={content}
            />
            <Group justify="flex-end">
                <Button
                    variant="transparent"
                    color="gray"
                    size="xs"
                    onClick={save}
                    leftSection={<IconCheck size={14} />}
                >
                    Save
                </Button>
            </Group>
        </Stack>
    )
}