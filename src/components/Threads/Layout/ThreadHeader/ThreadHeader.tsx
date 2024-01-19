import { ActionIcon, Group, Text, Tooltip, UnstyledButton } from "@mantine/core"
import { PromptRequest } from "../../../../model/PromptRequest"
import { getTechnologyIcon, iconChevronDown, iconChevronUp, iconClose } from "../../../../utils/iconsUtils"
import classes from './ThreadHeader.module.css'

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
                    <Tooltip label={promptRequest.technology.name}>
                        {getTechnologyIcon(promptRequest.technology.slug, 18)}
                    </Tooltip>
                        <Text fw={700} maw={"90%"} lineClamp={1}>{promptRequest.title}</Text>
                </Group>
            </UnstyledButton>
            <Group wrap="nowrap">
                <ActionIcon className={classes.iconMinimize} variant="transparent" onClick={minimizeHandle.toggle}>
                    {
                        minimized
                            ? iconChevronUp("sm")
                            : iconChevronDown("sm")
                    }
                </ActionIcon>
                <ActionIcon className={classes.iconClose} variant="transparent" onClick={() => deleteThread(promptRequest)}>
                    {iconClose("sm")}
                </ActionIcon>
            </Group>
        </Group>
    )
}