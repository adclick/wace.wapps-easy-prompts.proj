import { RepositoryItem } from "../../../../model/RepositoryItem";
import { Button, Select, Group, Input, Modal, Stack, TextInput, Textarea, rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconDeviceFloppy, IconSend } from "@tabler/icons-react";
import { useState } from "react";
import { Request } from "../../../../model/Request";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelectedFilters } from "../../../../context/SelectedFiltersContext";

interface RepositoryNewPromptModal {
    opened: boolean
    handle: any
    request: Request,
}

export function RepositoryNewPromptModal({
    opened,
    handle,
    request,
}: RepositoryNewPromptModal) {
    const [name, setName] = useState('');
    const [repository, setRepository] = useState('');
    const { user } = useAuth0();
    const { selectedFilters } = useSelectedFilters();

    const savePrompt = async () => {
        const modifierId = request.repositoryItems.length > 0 ? request.repositoryItems[0].id : 0;

        handle.close();

        notifications.show({
            title: 'Prompt Saved',
            message: 'Your settings were saved',
            color: RepositoryItem.getColor("prompt")
        });
    }

    // const repositories = filters.repositories.map(r => {
    //     return {
    //         label: r.name,
    //         value: r.slug
    //     }
    // });

    // const updateRepository = (value: string | null) => {
    //     if (value) {
    //         setRepository(value);
    //     }
    // }

    return (
        <Modal opened={opened} onClose={handle.close} title={`New Prompt`}>
            <Stack>
                {/* <Select
                    placeholder="Repository"
                    defaultValue={repository}
                    data={repositories}
                    value={repository}
                    allowDeselect={false}
                    onChange={updateRepository}
                /> */}
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