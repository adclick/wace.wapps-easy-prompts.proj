import { useState } from 'react';
import { AIMediatorClient } from "@/clients/AIMediatorClient";
import { Language } from "@/model/Language";
import { Repository } from "@/model/Repository";
import { Technology } from "@/model/Technology";
import { User } from "@/model/User";
import { Button, Group, Modal, Stack, Text, TextInput, Textarea, rem } from "@mantine/core"
import { IconDeviceFloppy, IconSparkles } from "@tabler/icons-react"

interface PromptAddNewModifierModal {
    opened: boolean,
    close: any,
    aiMediatorClient: AIMediatorClient,
    technology: Technology,
    user: User,
    repository: Repository,
    language: Language
}
export function PromptAddNewModifierModal({
    opened,
    close,
    aiMediatorClient,
    technology,
    user,
    repository,
    language
}: PromptAddNewModifierModal) {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    const saveModifier = async () => {
        await aiMediatorClient.saveModifier(name, content, technology.slug, user.id, repository.slug, language.code);
    }

    return (
        <Modal opened={opened} onClose={close} title="New Modifier">
            <Stack>
                <TextInput onChange={(e: any) => setName(e.target.value)} value={name} label="Name" placeholder="Name" size="xs" />
                <Textarea autosize minRows={3} onChange={(e: any) => setContent(e.target.value)} value={content} label="Content" placeholder="" size="xs" mt="xs" />
                <Group>
                    <Button leftSection={<IconDeviceFloppy style={{ width: rem(14), height: rem(14) }} />} variant="transparent" size="compact-xs" onClick={saveModifier}>Save</Button>
                </Group>
            </Stack>
        </Modal>
    )
}