import { AIMediatorClient } from "@/clients/AIMediatorClient";
import { Filters } from "../../model/Filters";
import { Modal, Stack, TextInput, Textarea, Group, Button, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { RepositoryItem } from "../../model/RepositoryItem";


interface RepositoryNewModifierModal {
    opened: boolean,
    handle: any,
    filters: Filters,
    aiMediatorClient: AIMediatorClient,
    refreshRepository: any
}

export function RepositoryNewModifierModal({
    opened,
    handle,
    filters,
    aiMediatorClient,
    refreshRepository

}: RepositoryNewModifierModal) {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    const save = async () => {
        handle.close();

        await aiMediatorClient.saveModifier(
            name,
            content,
            filters.technology,
            filters.userId,
            filters.repository,
            filters.language
        )

        notifications.show({
            title: 'Modifier Saved',
            message: 'Your settings were saved',
            color: RepositoryItem.getColor("modifier")
        });

        refreshRepository(filters);
    }


    return (
        <Modal opened={opened} onClose={handle.close} title="New Modifier">
            <Stack>
                <TextInput onChange={(e: any) => setName(e.target.value)} value={name} label="Name" placeholder="Name" size="xs" />
                <Textarea
                    autosize
                    minRows={3}
                    onChange={(e: any) => setContent(e.target.value)}
                    value={content}
                    label="Content"
                    placeholder=""
                    size="xs"
                    mt="xs"
                    description="Use %PROMPT% placeholder"
                />
                <Group>
                    <Button variant="transparent" size="compact-xs" onClick={save}>Save</Button>
                </Group>
            </Stack>
        </Modal>
    )
}