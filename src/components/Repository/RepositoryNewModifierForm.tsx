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
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    const save = async () => {
        handle.close();

        await aiMediatorClient.saveModifier(
            name,
            content,
            filters.technology,
            filters.userId,
            repository,
            filters.language
        );

        setName("");
        setContent("");

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

    const updateRepository = (value: string | null) => {
        if (value) {
            setRepository(value);
        }
    }

    return (
        <Stack my={"xs"}>
            <Select
                placeholder="Repository"
                defaultValue={repository}
                data={repositories}
                value={repository}
                allowDeselect={false}
                onChange={updateRepository}
            />
            <TextInput
                onChange={(e: any) => setName(e.target.value)}
                value={name}
                required
                placeholder="Name of the Modifier"
            />
            <Textarea
                autosize
                required
                minRows={3}
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