import { ActionIcon, Group, Title, UnstyledButton } from "@mantine/core"
import { PromptRequest } from "../../../model/PromptRequest"
import { IconChevronDown, IconChevronUp, IconX } from "@tabler/icons-react"
import iconsUtils from "../../../utils/iconsUtils"

interface ThreadHeader {
    promptRequest: PromptRequest,
    deleteThread: any,
    minimized: boolean,
    minimizeHandle: any
}

export function ThreadHeader({ promptRequest, deleteThread, minimized, minimizeHandle }: ThreadHeader) {
    return (
        <Group justify="space-between" wrap="nowrap" gap={0}>
            <UnstyledButton w={"100%"} onClick={minimizeHandle.toggle}>
                <Group>
                    {iconsUtils.getTechnologyIcon(promptRequest.technology.slug, 18)}
                    <Title order={6}>{promptRequest.title}</Title>
                </Group>
            </UnstyledButton>
            <Group wrap="nowrap">
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