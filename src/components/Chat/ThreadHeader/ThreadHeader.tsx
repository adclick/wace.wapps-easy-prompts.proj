import { ActionIcon, Group, Text } from "@mantine/core"
import { PromptRequest } from "../../../model/PromptRequest"
import { IconX } from "@tabler/icons-react"

interface ThreadHeader {
    promptRequest: PromptRequest,
    deleteThread: any
}

export function ThreadHeader({ promptRequest, deleteThread }: ThreadHeader) {
    return (
        <Group justify="space-between">
            <Text fw={700}>
                {promptRequest.technology.name} | {promptRequest.provider.name} | "{promptRequest.content}"
            </Text>
            <ActionIcon variant="subtle" onClick={() => deleteThread(promptRequest)}>
                <IconX size={18} />
            </ActionIcon>
        </Group>
    )
}