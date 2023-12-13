import { AIMediatorClient } from "@/clients/AIMediatorClient";
import { RepositoryItem } from "../../model/RepositoryItem";
import { Button, Select, Group, Input, Modal, Stack, TextInput, Textarea, rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconDeviceFloppy, IconSend } from "@tabler/icons-react";
import { useState } from "react";
import { Request } from "../../model/Request";
import { useAuth0 } from "@auth0/auth0-react";
import { useFilters } from "../../context/FiltersContext";
import { useSelectedFilters } from "../../context/SelectedFiltersContext";

interface RepositoryNewPromptModal {
    opened: boolean
    handle: any
    refreshRepository: any,
    request: Request,
    aIMediatorClient: any
}

export function RepositoryNewPromptModal({
    opened,
    handle,
    refreshRepository,
    request,
    aIMediatorClient
}: RepositoryNewPromptModal) {
    const [name, setName] = useState('');
    const [repository, setRepository] = useState('');
    const { user } = useAuth0();
    const { filters } = useFilters();
    const { selectedFilters } = useSelectedFilters();

    const savePrompt = async () => {
        const modifierId = request.repositoryItems.length > 0 ? request.repositoryItems[0].id : 0;

        await aIMediatorClient.savePrompt(
            name,
            request.text,
            request.userPromptOptions.technology.slug,
            request.userPromptOptions.provider.slug,
            modifierId,
            user?.sub,
            [filters.repositories.find(r => r.slug === repository)?.id],
            filters.language
        );

        notifications.show({
            title: 'Prompt Saved',
            message: 'Your settings were saved',
            color: RepositoryItem.getColor("prompt")
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
        <Modal opened={opened} onClose={handle.close} title={`New Prompt`}>
            <Stack>
                <Select
                    placeholder="Repository"
                    defaultValue={repository}
                    data={repositories}
                    value={repository}
                    allowDeselect={false}
                    onChange={updateRepository}
                />
                <TextInput
                    label="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <Group>
                    <Button
                        size="compact-md"
                        variant="subtle"
                        onClick={savePrompt}
                    >
                        Save
                    </Button>
                </Group>
            </Stack>
        </Modal>
    )
}