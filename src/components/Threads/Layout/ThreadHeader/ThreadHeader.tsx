import { ActionIcon, Badge, Center, Group, SimpleGrid, Text, UnstyledButton } from "@mantine/core"
import { PromptRequest } from "../../../../models/PromptRequest"
import { iconChevronDown, iconChevronUp, iconClose } from "../../../../utils/iconsUtils"
import classes from './ThreadHeader.module.css'
import { ProviderLabel } from "../../../Common/ProviderLabel/ProviderLabel"
import { Template } from "../../../../models/Template"
import { Modifier } from "../../../../models/Modifier"
import { DesktopContainer } from "../../../UI/Layout"

interface ThreadHeader {
    deleteThread: any,
    minimized: boolean,
    minimizeHandle: any,
    promptRequest: PromptRequest
}

export function ThreadHeader({ deleteThread, minimized, minimizeHandle, promptRequest }: ThreadHeader) {
    let templates: Template[] = [];
    let modifiers: Modifier[] = [];

    if ("metadata" in promptRequest && promptRequest.metadata) {
        if ("templates" in promptRequest.metadata) {
            templates = promptRequest.metadata.templates;
        }

        if ("modifiers" in promptRequest.metadata) {
            modifiers = promptRequest.metadata.modifiers;
        }
    }


    return (
        <Group justify="space-between" wrap="nowrap" gap={"xs"}>
            <UnstyledButton w={"100%"} onClick={minimizeHandle.toggle}>
                <Group justify="space-between" wrap="nowrap">
                    {/* <DesktopContainer>
                        <Badge variant="dot">{promptRequest.technology.name} | {promptRequest.provider.model_name}</Badge>
                    </DesktopContainer> */}
                    <Text truncate>
                        {
                            promptRequest.title
                        }
                    </Text>
                    <Group wrap="nowrap" justify="flex-end">
                        {
                            minimized
                                ? iconChevronUp("xs")
                                : iconChevronDown("xs")
                        }
                        <ActionIcon component="div" className={classes.iconClose} variant="transparent" onClick={() => deleteThread(promptRequest)}>
                            {iconClose("xs")}
                        </ActionIcon>
                    </Group>
                </Group>
            </UnstyledButton>
        </Group>
    )
}