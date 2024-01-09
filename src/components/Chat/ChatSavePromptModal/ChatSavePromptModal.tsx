import { Button, Group, Modal, Select, Stack, TextInput, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { Request } from "../../../model/Request";
import { useCreatePromptMutation, usePromptsFiltersQuery } from "../../../api/promptsApi";
import { useUser } from "../../../context/UserContext";
import { PromptRequest } from "../../../model/PromptRequest";

interface ChatSavePromptModal {
    opened: boolean
    handle: any
    request: PromptRequest,
}

export function ChatSavePromptModal({
    opened,
    handle,
    request,
}: ChatSavePromptModal) {
    const {user} = useUser();
    const [languageId, setLanguageId] = useState('');
    const [repositoryId, setRepositoryId] = useState('');
    const [technologyId, setTechnologyId] = useState('');
    const [providerId, setProviderId] = useState('');
    const [name, setName] = useState(request.title);
    const [description, setDescription] = useState(request.description);
    const [content, setContent] = useState(request.content);

    const mutation = useCreatePromptMutation();

    const promptsFiltersQuery = usePromptsFiltersQuery(user.id);

    const save = async () => {
        const newFormData = new FormData();
        newFormData.append("userId", user.id);
        newFormData.append("language_id", languageId.toString());
        newFormData.append("repository_id", repositoryId.toString());
        newFormData.append("technology_id", technologyId.toString());
        newFormData.append("provider_id", request.provider.id.toString());
        newFormData.append("name", name);
        newFormData.append("description", description);
        newFormData.append("content", content);

        mutation.mutate(newFormData);
    }

    let languages = [];
    let repositories = [];
    let technologies = [];

    if (promptsFiltersQuery.data) {
        languages = promptsFiltersQuery.data.languages.map((r: { id: number, name: string, slug: string }) => {
            return {
                label: r.name,
                value: r.id.toString()
            }
        });

        repositories = promptsFiltersQuery.data.repositories.map((r: { id: number, name: string, slug: string }) => {
            return {
                label: r.name,
                value: r.id.toString()
            }
        });

        technologies = promptsFiltersQuery.data.technologies.map((t: { id: number, name: string, slug: string }) => {
            return {
                label: t.name,
                value: t.id.toString()
            }
        });

    }

    const updateLanguage = (value: string | null) => {
        if (value) {
            setLanguageId(value);
        }
    }

    const updateTechnology = (value: string | null) => {
        if (value) {
            setTechnologyId(value);
        }
    }


    const updateRepository = (value: string | null) => {
        if (value) {
            setRepositoryId(value);
        }
    }

    return (
        <Modal opened={opened} onClose={handle.close} title={`New Prompt`}>
           <Stack my={"xs"}>
                <Select
                    label="Language"
                    required
                    placeholder="Language"
                    data={languages}
                    value={languageId}
                    allowDeselect={false}
                    onChange={updateLanguage}
                />
                    <Select
                        label="Repository"
                        required
                        placeholder="Repository"
                        data={repositories}
                        value={repositoryId}
                        allowDeselect={false}
                        onChange={updateRepository}
                    />
                <Select
                    label="Technology"
                    required
                    placeholder="Technology"
                    data={technologies}
                    value={technologyId}
                    allowDeselect={false}
                    onChange={updateTechnology}
                />
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
                    onChange={(e: any) => setDescription(e.target.value)}
                    value={description}
                    placeholder="Description"
                />
                <Textarea
                    label="Content"
                    description="Max Characters: 500"
                    autosize
                    required
                    minRows={3}
                    maxLength={500}
                    onChange={(e: any) => setContent(e.target.value)}
                    value={content}
                    placeholder="Modifier Text"
                />
                <Group>
                    <Button
                        variant="subtle"
                        size="compact-sm"
                        onClick={save}
                    >
                        Save
                    </Button>
                </Group>
            </Stack>
        </Modal>
    )
}