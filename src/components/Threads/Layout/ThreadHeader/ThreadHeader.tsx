import { ActionIcon, Group, Text, UnstyledButton } from "@mantine/core"
import { iconChevronDown, iconChevronUp, iconClose } from "../../../../utils/iconsUtils"
import classes from './ThreadHeader.module.css'
import { Template } from "../../../../models/Template"
import { Modifier } from "../../../../models/Modifier"
import { Technology } from "../../../../models/Technology"
import { Thread } from "../../../../models/Thread"

interface ThreadHeader {
    deleteThread: any,
    minimized: boolean,
    minimizeHandle: any,
    thread: Thread
}

export function ThreadHeader({ deleteThread, minimized, minimizeHandle, thread }: ThreadHeader) {
    let templates: Template[] = [];
    let modifiers: Modifier[] = [];

    if ("metadata" in thread.prompt && thread.prompt.metadata) {
        if ("templates" in thread.prompt.metadata) {
            templates = thread.prompt.metadata.templates;
        }

        if ("modifiers" in thread.prompt.metadata) {
            modifiers = thread.prompt.metadata.modifiers;
        }
    }


    return (
        <Group justify="space-between" wrap="nowrap" gap={"xs"}>
            <UnstyledButton w={"100%"} onClick={minimizeHandle.toggle}>
                <Group justify="space-between" wrap="nowrap">
                    {/* <DesktopContainer>
                        <Badge variant="dot">{promptRequest.technology.name} | {promptRequest.provider.model_name}</Badge>
                    </DesktopContainer> */}
                    <Group>
                        {
                            Technology.getIcon(thread.prompt.technology)
                        }
                        <Text>
                            {
                                thread.title
                            }
                        </Text>
                    </Group>
                    <Group wrap="nowrap" justify="flex-end">
                        {
                            minimized
                                ? iconChevronUp("xs")
                                : iconChevronDown("xs")
                        }
                        <ActionIcon
                            component="div"
                            className={classes.iconClose}
                            variant="transparent"
                            onClick={() => deleteThread(thread)}
                        >
                            {iconClose("xs")}
                        </ActionIcon>
                    </Group>
                </Group>
            </UnstyledButton>
        </Group>
    )
}