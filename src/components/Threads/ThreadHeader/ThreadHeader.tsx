import { ActionIcon, Divider, Group, Text, Title, UnstyledButton } from "@mantine/core"
import { PromptRequest } from "../../../model/PromptRequest"
import { IconChevronDown, IconChevronUp, IconX } from "@tabler/icons-react"
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext"
import { getTechnologyIcon } from "../../../utils/iconsUtils"

interface ThreadHeader {
    deleteThread: any,
    minimized: boolean,
    minimizeHandle: any,
    promptRequest: PromptRequest
}

export function ThreadHeader({ deleteThread, minimized, minimizeHandle, promptRequest }: ThreadHeader) {
    return (
        <Group justify="space-between" wrap="nowrap" gap={0}>
            <UnstyledButton w={"100%"} onClick={minimizeHandle.toggle}>
                <Group wrap="nowrap">
                    {getTechnologyIcon(promptRequest.technology.slug, 18)}
                    {/* <Text maw={"90%"} lineClamp={1}>{promptRequest.provider.model_name}</Text> */}
                    {/* <Divider orientation="vertical" /> */}
                    <Text fw={700} maw={"90%"} lineClamp={1}>{promptRequest.title}</Text>
                </Group>
            </UnstyledButton>
            <Group wrap="nowrap">
                <ActionIcon variant="subtle" onClick={minimizeHandle.toggle}>
                    {
                        minimized
                            ? <IconChevronUp size={18} stroke={2} />
                            : <IconChevronDown size={18} stroke={2} />
                    }
                </ActionIcon>
                <ActionIcon variant="subtle" onClick={() => deleteThread(promptRequest)}>
                    <IconX size={18} stroke={2} />
                </ActionIcon>
            </Group>
        </Group>
    )
}