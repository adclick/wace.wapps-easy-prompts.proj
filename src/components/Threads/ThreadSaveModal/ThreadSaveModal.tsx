import { Button, Group, Modal, Select, Stack, TextInput, Textarea } from "@mantine/core";
import { useState } from "react";
import { useCreatePromptMutation, usePromptsFiltersQuery } from "../../../api/promptsApi";
import { useUser } from "../../../context/UserContext";
import { PromptRequest } from "../../../model/PromptRequest";
import { IconCheck } from "@tabler/icons-react";
import { usePromptsSelectedFilters } from "../../../context/ModifiersSelectedFiltersContext";

interface ThreadSaveModal {
    opened: boolean
    handle: any
    request: PromptRequest,
}

export function ThreadSaveModal({
    opened,
    handle,
    request,
}: ThreadSaveModal) {
    const { promptsSelectedFilters } = usePromptsSelectedFilters();
    const { user } = useUser();
    const [languageId, setLanguageId] = useState(promptsSelectedFilters.languages_ids[0].toString());
    const [repositoryId, setRepositoryId] = useState(promptsSelectedFilters.repositories_ids[0].toString());
    const [name, setName] = useState(request.title);
    const [description, setDescription] = useState(request.description);

    const mutation = useCreatePromptMutation();

    const promptsFiltersQuery = usePromptsFiltersQuery(user.id);

    const save = async () => {
        const newFormData = new FormData();
        newFormData.append("userId", user.id);
        newFormData.append("language_id", languageId.toString());
        newFormData.append("repository_id", repositoryId.toString());
        newFormData.append("technology_id", request.technology.id.toString());
        newFormData.append("provider_id", request.provider.id.toString());
        newFormData.append("name", name);
        newFormData.append("description", description);
        newFormData.append("content", request.content);

        mutation.mutate(newFormData);
    }

    let languages = [];
    let repositories = [];

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
    }

    const updateLanguage = (value: string | null) => {
        if (value) {
            setLanguageId(value);
        }
    }


    const updateRepository = (value: string | null) => {
        if (value) {
            setRepositoryId(value);
        }
    }

    return (
        <Modal opened={opened} onClose={handle.close} title={`Create New Prompt`} size={"lg"}>
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
                <Group justify="flex-end">
                    <Button
                        variant="filled"
                        size="xs"
                        onClick={save}
                        leftSection={<IconCheck size={14} />}
                    >
                        Save
                    </Button>
                </Group>
            </Stack>
        </Modal>
    )
}