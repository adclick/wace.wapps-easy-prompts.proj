import { AIMediatorClient } from "@/clients/AIMediatorClient";
import { RepositoryItem } from "../../model/RepositoryItem";
import { Button, Group, Input, Modal, Stack, Textarea, rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconDeviceFloppy, IconSend } from "@tabler/icons-react";
import { useState } from "react";

interface RepositoryNewPromptModal {
    opened: boolean,
    close: any,
    prompt: string,
    technology: string,
    provider: string,
    aiMediatorClient: AIMediatorClient,
    userId: string,
    repository: string,
    language: string,
    refreshPromptOptions: any
}

export function RepositoryNewPromptModal({
    opened,
    close,
    prompt,
    technology,
    provider,
    aiMediatorClient,
    userId,
    repository,
    language,
    refreshPromptOptions
}: RepositoryNewPromptModal) {
    const [name, setName] = useState('');

    const savePrompt = async () => {
        await aiMediatorClient.savePrompt(name, prompt, technology, provider, userId, repository, language);

        close();
        refreshPromptOptions();

        notifications.show({
            title: 'Prompt Saved',
            message: 'Your settings were saved',
            color: RepositoryItem.getColor("prompt")
        });
    }

    return (
        <Modal opened={opened} onClose={close} title={`New Prompt`}>
            <Stack>
                <Input value={name} onChange={e => setName(e.target.value)} />
                <Group>
                    <Button
                        size="compact-md"
                        variant="transparent"
                        leftSection={<IconDeviceFloppy style={{ width: rem(14), height: rem(14) }} />}
                        onClick={savePrompt}
                    >
                        Save
                    </Button>
                </Group>
            </Stack>
        </Modal>
    )
}