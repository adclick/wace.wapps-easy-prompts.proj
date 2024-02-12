import { Accordion, ActionIcon, Button, Card, Divider, Group, Select, SimpleGrid, Stack, Text, TextInput, Textarea } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { Type } from "../../../models/SelectedDatabaseType";
import { Language } from "../../../models/Language";
import { PromptRequest } from "../../../models/PromptRequest";
import { useEffect, useState } from "react";
import { useFiltersQuery } from "../../../api/filtersApi";
import { getProviders } from "../../../api/providersApi";
import { Repository } from "../../../models/Repository";
import { Technology } from "../../../models/Technology";
import { Provider } from "../../../models/Provider";
import { iconClose } from "../../../utils/iconsUtils";
import { Modifier } from "../../../models/Modifier";
import { Template } from "../../../models/Template";
import { notifications } from "@mantine/notifications";
import { ParametersList } from "../../../models/ParametersList";
import { Parameter } from "../../../models/Parameter";
import { useStore } from "../../../stores/store";
import { useShallow } from "zustand/react/shallow";

interface BaseForm {
    promptRequest: PromptRequest | undefined,
    createMutation: any,
    type: Type,
    hasContent: boolean,
    hasTemplates: boolean,
    hasModifiers: boolean,
    handle: any
}

export function BaseForm({
    promptRequest,
    createMutation,
    type,
    hasContent,
    hasTemplates,
    hasModifiers,
    handle
}: BaseForm) {
    const [
        user,
        selectedModifiers,
        selectedTemplates,
    ] = useStore(useShallow(state => [
        state.user,
        state.selectedModifiers,
        state.selectedTemplates,
    ]));

    const [languageData, setLanguageData] = useState<{ label: string, value: string }[]>([]);
    const [languageId, setLanguageId] = useState<string | null>("");
    const [repositoryData, setRepositoryData] = useState<{ label: string, value: string }[]>([]);
    const [repositoryId, setRepositoryId] = useState<string | null>("");
    const [technologyData, setTechnologyData] = useState<{ label: string, value: string }[]>([]);
    const [technologyId, setTechnologyId] = useState<string | null>("");
    const [providerData, setProviderData] = useState<{ label: string, value: string }[]>([]);
    const [providerId, setProviderId] = useState<string | null>("");
    const [name, setName] = useState(promptRequest ? promptRequest.title : "");
    const [nameError, setNameError] = useState('');
    const [description, setDescription] = useState(promptRequest ? promptRequest.description : "");
    const [content, setContent] = useState(promptRequest ? promptRequest.content : "");
    const [contentError, setContentError] = useState('');

    const initialModifiers = promptRequest ? promptRequest.metadata.modifiers : selectedModifiers;
    const [modifiers, setModifiers] = useState<Modifier[]>(initialModifiers);

    const initialTempaltes = promptRequest ? promptRequest.metadata.templates : selectedTemplates;
    const [templates, setTemplates] = useState<Template[]>(initialTempaltes);


    const filtersQuery = useFiltersQuery(user);

    const save = async () => {
        if (name === "") {
            setNameError("Required field");
            return;
        }

        if (hasContent && content === "") {
            setContentError("Required field");
            return;
        }

        const modifiersIds = modifiers.map(m => m.id);
        const templatesIds = templates.map(t => t.id);
        const chatHistory = promptRequest ? promptRequest.metadata.history : [];
        const chatMessages = promptRequest ? promptRequest.metadata.history : [];

        if (!languageId || !repositoryId || !technologyId) return false;

        const newFormData = new FormData();
        newFormData.append("userId", user.id);
        newFormData.append("language_id", languageId.toString());
        newFormData.append("repository_id", repositoryId.toString());
        newFormData.append("technology_id", technologyId.toString());
        newFormData.append("title", name);
        newFormData.append("description", description === "" ? "No description" : description);
        newFormData.append("chat_history", JSON.stringify(chatHistory));
        newFormData.append("chat_messages", JSON.stringify(chatMessages));
        newFormData.append("modifiers_ids", JSON.stringify(modifiersIds));
        newFormData.append("templates_ids", JSON.stringify(templatesIds));
        newFormData.append("prompt_parameters", JSON.stringify([]));
        newFormData.append("template_parameters", JSON.stringify([]));

        if (promptRequest) {
            if (type === Type.PROMPT) {
                const promptParameters = ParametersList.getActiveParameters(promptRequest.parametersList);
                newFormData.append("prompt_parameters", JSON.stringify(promptParameters.map(pp => Parameter.getIdAndValue(pp))));
            }

            if (type === Type.TEMPLATE) {
                const templateParameters = ParametersList.getActiveParameters(promptRequest.parametersList);
                newFormData.append("template_parameters", JSON.stringify(templateParameters.map(tp => Parameter.getIdAndValue(tp))));
                console.log(templateParameters);
            }
        }

        if (providerId) {
            newFormData.append("provider_id", providerId.toString());
        }

        if (hasContent) {
            const contentValue = promptRequest && promptRequest.chatReply !== "" ? promptRequest.chatReply : content;
            newFormData.append("content", contentValue);
        }

        createMutation.mutate(newFormData);


        notifications.show({
            title: "Saved",
            message: "",
            color: "blue"
        });


        handle.close();
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

    const onChangeName = (name: string) => {
        setName(name);
        setNameError("");
    }

    const onChangeContent = (content: string) => {
        setContent(content);
        setContentError("");
    }

    return (

        <Stack mt={"md"}>
            <Card>
                <Stack>
                    <TextInput
                        label="Name"
                        variant="unstyled"
                        onChange={(e: any) => onChangeName(e.target.value)}
                        value={name}
                        required
                        autoFocus
                        size="md"
                        error={nameError}
                        placeholder="Type a name"
                    />
                    <Textarea
                        label="Description"
                        autosize
                        variant="unstyled"
                        minRows={1}
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        size="md"
                    />
                    {
                        hasContent && !promptRequest &&
                        <Textarea
                            label="Content"
                            autosize
                            required
                            variant="unstyled"
                            minRows={1}
                            onChange={(e: any) => onChangeContent(e.target.value)}
                            value={content}
                            size="md"
                            error={contentError}
                        />
                    }



                </Stack>
            </Card>
            <Accordion variant="filled">
                <Accordion.Item value="specifications">
                    <Accordion.Control>
                        <Text size="sm" fw={700}>Advanced</Text>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Stack gap={"xl"}>
                            <Divider label="Specifications" />
                            <SimpleGrid cols={{ base: 1, sm: 2 }} verticalSpacing={"lg"}>
                                <Select
                                    label="Language"
                                    required
                                    variant="unstyled"
                                    data={languageData}
                                    value={languageId}
                                    allowDeselect={false}
                                    onChange={setLanguageId}
                                    size="md"
                                />
                                <Select
                                    label="Repository"
                                    variant="unstyled"
                                    required
                                    data={repositoryData}
                                    value={repositoryId}
                                    allowDeselect={false}
                                    onChange={setRepositoryId}
                                    size="md"
                                />
                                <Select
                                    label="Technology"
                                    variant="unstyled"
                                    required
                                    data={technologyData}
                                    value={technologyId}
                                    allowDeselect={false}
                                    onChange={onChangeTechnology}
                                    size="md"
                                />
                                <Select
                                    label="Provider"
                                    variant="unstyled"
                                    data={providerData}
                                    value={providerId}
                                    placeholder="Select on provider"
                                    onChange={setProviderId}
                                    size="md"
                                />
                            </SimpleGrid>
                            <Divider label="Templates" />
                            {
                                templates.length > 0
                                    ? <Stack gap={"xs"}>
                                        {
                                            templates.map(template => {
                                                return (
                                                    <Group key={template.id} gap={"xs"}>
                                                        <ActionIcon variant="transparent" color="gray" onClick={() => removeTemplate(template.id)}>
                                                            {iconClose(14)}
                                                        </ActionIcon>
                                                        <Text size="sm">{template.title}</Text>
                                                    </Group>
                                                )
                                            })
                                        }
                                    </Stack>
                                    : <Text size="sm">
                                        To add templates, please select them from the database list before opening this dialog
                                    </Text>
                            }
                                <Divider label="Modifiers" />
                            {
                                modifiers.length > 0
                                    ? <Stack gap={"xs"}>
                                        {
                                            modifiers.map(modifier => {
                                                return (
                                                    <Group key={modifier.id} gap={"xs"}>
                                                        <ActionIcon variant="transparent" color="gray" onClick={() => removeModifier(modifier.id)}>
                                                            {iconClose(14)}
                                                        </ActionIcon>
                                                        <Text size="sm">{modifier.title}</Text>
                                                    </Group>
                                                )
                                            })
                                        }
                                    </Stack>
                                    : <Text size="sm">
                                        To add modifiers, please select them from the database list before opening this dialog
                                    </Text>
                            }
                        </Stack>
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