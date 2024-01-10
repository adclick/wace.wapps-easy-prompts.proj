import { ActionIcon, Group, Text, Tooltip } from "@mantine/core"
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
            <Group>
                <Tooltip label={promptRequest.technology.name}>
                    {Technology.getIcon(promptRequest.technology.slug, 18)}
                </Tooltip>
                <Text size="sm" fw={700}>
                    {promptRequest.provider.name} - "{promptRequest.content}"
                </Text>
            </Group>
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