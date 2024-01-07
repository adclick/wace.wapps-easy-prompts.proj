import { useState } from "react";
import { Modal, Select, Collapse, Indicator, ActionIcon, Badge, Box, Burger, Button, Checkbox, Chip, Divider, Group, Loader, Menu, Stack, Text, Textarea, Title, UnstyledButton, rem, Card, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useUser } from "../../../context/UserContext";
import { useCreatePromptMutation, usePromptsFiltersQuery } from "../../../api/promptsApi";

interface NewModifierModal {
    opened: boolean,
    handle: any
}

export function NewModifierModal({
    opened,
    handle,
}: NewModifierModal) {
    const { user } = useUser();
    const { data } = usePromptsFiltersQuery(user.id);

    const [languageId, setLanguageId] = useState('');
    const [repositoryId, setRepositoryId] = useState('');
    const [technologyId, setTechnologyId] = useState('');
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');

    const mutation = useCreatePromptMutation();

    let languages = [];
    let repositories = [];
    let technologies = [];

    if (data) {
        languages = data.languages.map((r: { id: number, name: string, slug: string }) => {
            return {
                label: r.name,
                value: r.id.toString()
            }
        });

        repositories = data.repositories.map((r: { id: number, name: string, slug: string }) => {
            return {
                label: r.name,
                value: r.id.toString()
            }
        });

        technologies = data.technologies.map((t: { id: number, name: string, slug: string }) => {
            return {
                label: t.name,
                value: t.id.toString()
            }
        });
    }

    if (mutation.isError) {
        notifications.show({
            title: "Error",
            message: mutation.error.message,
            color: "red"
        });

        mutation.reset();
    }

    if (mutation.isSuccess) {
        notifications.show({
            title: "Modifier Saved",
            message: "Your settings were saved",
            color: "blue"
        });

        mutation.reset();

        handle.close();
    }

    const save = async () => {
        const newFormData = new FormData();
        newFormData.append("userId", user.id);
        newFormData.append("language_id", languageId.toString());
        newFormData.append("repository_id", repositoryId.toString());
        newFormData.append("technology_id", technologyId.toString());
        newFormData.append("name", name);
        newFormData.append("description", description);
        newFormData.append("content", content);

        mutation.mutate(newFormData);
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
        <Modal opened={opened} onClose={handle.close} title="New Modifier">
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
                    label="Technology"
                    required
                    placeholder="Technology"
                    data={technologies}
                    value={technologyId}
                    allowDeselect={false}
                    onChange={updateTechnology}
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