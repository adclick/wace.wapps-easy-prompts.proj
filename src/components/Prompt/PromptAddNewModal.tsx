import { AIMediatorClient } from "@/clients/AIMediatorClient";
import { Button, Group, Input, Modal, Stack, Textarea, rem } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import { useState } from "react";

interface PromptAddNewModal {
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

export function PromptAddNewModal({
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
}: PromptAddNewModal) {
    const [name, setName] = useState('');

    const savePrompt = async () => {
        await aiMediatorClient.savePrompt(name, prompt, technology, provider, userId, repository, language);

        await refreshPromptOptions();
    }

    return (
        <Modal opened={opened} onClose={close} title={`New Prompt`}>
            <Stack>
                <Input value={name} onChange={e => setName(e.target.value)} />
                <Group>
                    <Button
                        size="compact-md"
                        variant="transparent"
                        leftSection={<IconSend style={{ width: rem(14), height: rem(14) }} />}
                        onClick={savePrompt}
                    >
                        Send
                    </Button>
                </Group>
            </Stack>
        </Modal>
    )
}