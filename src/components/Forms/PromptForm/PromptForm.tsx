import { Accordion, ActionIcon, Button, Divider, Group, MultiSelect, Select, SimpleGrid, Space, Stack, Text, TextInput, Textarea, Title } from "@mantine/core";
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
import { useSelectedModifiers } from "../../../context/SelectedModifiersContext";
import { iconClose } from "../../../utils/iconsUtils";
import { Modifier } from "../../../model/Modifier";
import { useSelectedTemplates } from "../../../context/SelectedTemplatesContext";
import { Template } from "../../../model/Template";

interface PromptForm {
    promptRequest: PromptRequest | undefined
}

export function PromptForm({ promptRequest }: PromptForm) {
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

    const { selectedModifiers } = useSelectedModifiers();
    const initialModifiers = promptRequest ? promptRequest.metadata.modifiers : selectedModifiers;
    const [modifiers, setModifiers] = useState<Modifier[]>(initialModifiers);


    const { selectedTemplates } = useSelectedTemplates();
    const initialTempaltes = promptRequest ? promptRequest.metadata.templates : selectedTemplates;
    const [templates, setTemplates] = useState<Template[]>(initialTempaltes);


    const { setSelectedDatabaseType } = useSelectedDatabaseType();
    const createPromptMutation = useCreatePromptMutation();
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
        newFormData.append("description", description === "" ? "No description" : description);
        newFormData.append("content", contentValue);
        newFormData.append("modifiers_ids", JSON.stringify(modifiersIds));
        newFormData.append("templates_ids", JSON.stringify(templatesIds));
        newFormData.append("chat_history", JSON.stringify(chatHistory));

        createPromptMutation.mutate(newFormData);

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

            setTechnologyData(technologies);
            
            if (promptRequest) {
                setTechnologyId(promptRequest.technology.id.toString())
                updateProviderData(parseInt(promptRequest.technology.id.toString()));
            } else {
                setTechnologyId(technologies[0].value)
                updateProviderData(parseInt(technologies[0].value));
            }

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

    const removeModifier = (id: number) => {
        const newModifiers = modifiers.filter(m => m.id !== id);
        setModifiers(newModifiers);
    }

    const removeTemplate = (id: number) => {
        const newTemplates = templates.filter(t => t.id !== id);
        setTemplates(newTemplates);
    }

    return (
        <Stack my={"md"}>
            <Accordion variant="separated" defaultValue={'content'}>
                <Accordion.Item value="content">
                    <Accordion.Control>
                        <Text fw={700}>Content</Text>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Stack gap={"md"}>
                            <TextInput
                                label="Name"
                                variant="unstyled"
                                onChange={(e: any) => setName(e.target.value)}
                                value={name}
                                required
                                placeholder="Write a name"
                            />
                            <Textarea
                                label="Description"
                                autosize
                                variant="unstyled"
                                required
                                minRows={1}
                                onChange={e => setDescription(e.target.value)}
                                value={description}
                                placeholder="Write a brief description"
                            />
                            <Textarea
                                label="Content"
                                autosize
                                variant="unstyled"
                                required
                                minRows={1}
                                onChange={(e: any) => setContent(e.target.value)}
                                value={content}
                                placeholder="Prompt's content"
                            />
                        </Stack>
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="specifications">
                    <Accordion.Control>
                        <Text fw={700}>Specifications</Text>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <SimpleGrid cols={{ base: 1, sm: 2 }} verticalSpacing={"xl"}>
                            <Select
                                label="Language"
                                required
                                variant="unstyled"
                                data={languageData}
                                value={languageId}
                                allowDeselect={false}
                                onChange={setLanguageId}
                            />
                            <Select
                                label="Repository"
                                variant="unstyled"
                                required
                                data={repositoryData}
                                value={repositoryId}
                                allowDeselect={false}
                                onChange={setRepositoryId}
                            />
                            <Select
                                label="Technology"
                                variant="unstyled"
                                required
                                data={technologyData}
                                value={technologyId}
                                allowDeselect={false}
                                onChange={onChangeTechnology}
                            />
                            <Select
                                label="Provider"
                                variant="unstyled"
                                data={providerData}
                                value={providerId}
                                onChange={setProviderId}
                            />
                        </SimpleGrid>
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="templates">
                    <Accordion.Control>
                        <Group>
                            <Text fw={700}>Templates</Text>
                            <Text size="xs">{templates.length} selected</Text>
                        </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                        {
                            templates.length > 0 
                            ? templates.map(template => {
                                return (
                                    <Group gap={"xs"}>
                                        <ActionIcon variant="transparent" color="gray" onClick={() => removeTemplate(template.id)}>
                                            {iconClose(14)}
                                        </ActionIcon>
                                        <Text size="xs">{template.title}</Text>
                                    </Group>
                                )
                            })
                            : <Text size="xs">
                                To add templates, please select them from the database list before opening this dialog
                            </Text>
                        }
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="modifiers">
                    <Accordion.Control>
                        <Group>
                            <Text fw={700}>Modifiers</Text>
                            <Text size="xs">{modifiers.length} selected</Text>
                        </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                        {
                            modifiers.length > 0
                                ? modifiers.map(modifier => {
                                    return (
                                        <Group gap={"xs"}>
                                            <ActionIcon variant="transparent" color="gray" onClick={() => removeModifier(modifier.id)}>
                                                {iconClose(14)}
                                            </ActionIcon>
                                            <Text size="xs">{modifier.title}</Text>
                                        </Group>
                                    )
                                })
                                : <Text size="xs">
                                    To add modifiers, please select them from the database list before opening this dialog
                                </Text>
                        }
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
            <Group justify="flex-end">
                <Button
                    variant="transparent"
                    color="gray"
                    size="sm"
                    onClick={save}
                    leftSection={<IconCheck size={14} />}
                >
                    Save
                </Button>
            </Group>
        </Stack>
    )
}