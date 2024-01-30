import { ActionIcon, Badge, Group, Text, Tooltip, UnstyledButton } from "@mantine/core"
import { PromptRequest } from "../../../../model/PromptRequest"
import { getTechnologyIcon, iconChevronDown, iconChevronUp, iconClose } from "../../../../utils/iconsUtils"
import classes from './ThreadHeader.module.css'
import { ProviderLabel } from "../../../Common/ProviderLabel/ProviderLabel"

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
                    <Badge size={"sm"} variant="dot" h={"auto"}>
                        <ProviderLabel
                            size="sm"
                            technology={promptRequest.technology}
                            provider={promptRequest.provider}
                            templates={promptRequest.metadata.templates}
                            modifiers={promptRequest.metadata.modifiers}
                        />
                    </Badge>
                </Group>
            </UnstyledButton>
            <Group wrap="nowrap">
                <ActionIcon className={classes.iconMinimize} variant="transparent" onClick={minimizeHandle.toggle}>
                    {
                        minimized
                            ? iconChevronUp("xs")
                            : iconChevronDown("xs")
                    }
                </ActionIcon>
                <ActionIcon className={classes.iconClose} variant="transparent" onClick={() => deleteThread(promptRequest)}>
                    {iconClose("xs")}
                </ActionIcon>
            </Group>
        </Group>
    )
}