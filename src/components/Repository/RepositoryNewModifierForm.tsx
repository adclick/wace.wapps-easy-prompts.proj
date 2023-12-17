import { useState } from "react";
import { Select, Collapse, Indicator, ActionIcon, Badge, Box, Burger, Button, Checkbox, Chip, Divider, Group, Loader, Menu, Stack, Text, Textarea, Title, UnstyledButton, rem, Card, TextInput } from "@mantine/core";
import { AIMediatorClient } from "../../clients/AIMediatorClient"
import { useFilters } from "../../context/FiltersContext";
import { notifications } from "@mantine/notifications";
import { RepositoryItem } from "../../model/RepositoryItem";
import { useSelectedFilters } from "../../context/SelectedFiltersContext";

interface RepositoryNewModifierForm {
    handle: any
    aiMediatorClient: AIMediatorClient
    refreshRepository: any
}

export function RepositoryNewModifierForm({
    handle,
    aiMediatorClient,
    refreshRepository
}: RepositoryNewModifierForm) {
    const { filters } = useFilters();
    const { selectedFilters } = useSelectedFilters();
    const [repository, setRepository] = useState('');
    const [technology, setTechnology] = useState('');
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');

    const save = async () => {
        handle.close();

        await aiMediatorClient.saveModifier(
            name,
            content,
            description,
            technology,
            filters.userId,
            repository,
            selectedFilters.language
        );

        setName("");
        setContent("");
        setDescription("");

        notifications.show({
            title: 'Modifier Saved',
            message: 'Your settings were saved',
            color: RepositoryItem.getColor("modifier")
        });

        refreshRepository(selectedFilters);
    }

    const repositories = filters.repositories.map(r => {
        return {
            label: r.name,
            value: r.slug
        }
    });

    const technologies = filters.technologies.map(t => {
        return {
            label: t.name_en,
            value: t.slug
        }
    });

    const updateTechnology = (value: string | null) => {
        if (value) {
            setTechnology(value);
        }
    }

    const updateRepository = (value: string | null) => {
        if (value) {
            setRepository(value);
        }
    }

    return (
        <Stack my={"xs"}>
            <Select
                label="Technology"
                required
                placeholder="Technology"
                defaultValue={technology}
                data={technologies}
                value={technology}
                allowDeselect={false}
                onChange={updateTechnology}
            />
            <Select
                label="Repository"
                required
                placeholder="Repository"
                defaultValue={repository}
                data={repositories}
                value={repository}
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
    )
}