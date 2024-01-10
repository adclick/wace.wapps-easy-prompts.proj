import { ActionIcon, Button, Group, Text, Title, Tooltip, UnstyledButton } from "@mantine/core"
import { PromptRequest } from "../../../model/PromptRequest"
import { IconChevronDown, IconChevronUp, IconX } from "@tabler/icons-react"
import { Technology } from "../../../model/Technology"

interface ThreadHeader {
    promptRequest: PromptRequest,
    deleteThread: any,
    minimized: boolean,
    minimizeHandle: any
}

export function ThreadHeader({ promptRequest, deleteThread, minimized, minimizeHandle }: ThreadHeader) {
    return (
        <Group justify="space-between" wrap="nowrap">
            <UnstyledButton
                onClick={minimizeHandle.toggle}
            >
                <Group>
                    {Technology.getIcon(promptRequest.technology.slug, 18)}
                    <Title order={6}>{promptRequest.title}</Title>
                </Group>

            </UnstyledButton>
            <Group>
                <ActionIcon variant="subtle" onClick={minimizeHandle.toggle}>
                    {
                        minimized
                            ? <IconChevronUp size={18} />
                            : <IconChevronDown size={18} />
                    }
                </ActionIcon>
                <ActionIcon variant="subtle" onClick={() => deleteThread(promptRequest)}>
                    <IconX size={18} />
                </ActionIcon>
            </Group>
        </Group>
    )
}