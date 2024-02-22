import { ActionIcon, Button, Group, Modal, Stack, Text, TextInput, Tooltip, UnstyledButton } from "@mantine/core"
import { iconChevronDown, iconChevronUp, iconClose } from "../../../../utils/iconsUtils"
import classes from './ThreadHeader.module.css'
import { Template } from "../../../../models/Template"
import { Modifier } from "../../../../models/Modifier"
import { Technology } from "../../../../models/Technology"
import { Thread } from "../../../../models/Thread"
import { useDisclosure, useHover } from "@mantine/hooks"
import { IconCheck, IconPencil, IconPlus } from "@tabler/icons-react"
import { useState } from "react"

interface ThreadHeader {
    deleteThread: any,
    minimized: boolean,
    minimizeHandle: any,
    thread: Thread,
    updateMutation: any
}

export function ThreadHeader({ deleteThread, minimized, minimizeHandle, thread, updateMutation }: ThreadHeader) {
    let templates: Template[] = [];
    let modifiers: Modifier[] = [];

    if ("metadata" in thread && thread.metadata) {
        if ("templates" in thread.metadata) {
            templates = thread.metadata.templates;
        }

        if ("modifiers" in thread.metadata) {
            modifiers = thread.metadata.modifiers;
        }
    }

    const { hovered, ref } = useHover();

    const [threadTitle, setThreadTitle] = useState(thread.title);
    const [editTitleOpened, editTitleHandle] = useDisclosure(false);

    const openEditTitle = (e: any) => {
        e.stopPropagation();

        editTitleHandle.open();
    }

    const onKeyDownThreadTitle = (e: any) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            saveThreadTitle();
        }
    }

    const saveThreadTitle = () => {
        updateMutation(undefined, undefined, threadTitle);
        editTitleHandle.close();
    }

    return (
        <div ref={ref}>
            <Modal opened={editTitleOpened} onClose={editTitleHandle.close} title="Change Title">
                <Stack>
                    <TextInput
                        value={threadTitle}
                        onChange={e => setThreadTitle(e.target.value)}
                        onKeyDown={e => onKeyDownThreadTitle(e)}
                    />
                    <Group justify="flex-end">
                        <Button
                            size="xs"
                            leftSection={<IconCheck size={14} />}
                            variant="transparent"
                            color="gray"
                            onClick={saveThreadTitle}
                        >
                            Save
                        </Button>
                    </Group>
                </Stack>
            </Modal>
            <Group justify="space-between" wrap="nowrap" gap={"xs"}>
                <UnstyledButton w={"100%"} onClick={minimizeHandle.toggle}>
                    <Group justify="space-between" wrap="nowrap">
                        {/* <DesktopContainer>
                        <Badge variant="dot">{promptRequest.technology.name} | {promptRequest.provider.model_name}</Badge>
                    </DesktopContainer> */}
                        <Group wrap="nowrap">
                            {
                                Technology.getIcon(thread.technology, 18)
                            }
                            <Group gap={4}>
                                <Text lineClamp={1}>
                                    {
                                        thread.title
                                    }
                                </Text>
                                {
                                    hovered &&
                                    <ActionIcon component="a" variant="transparent" color="gray" onClick={e => openEditTitle(e)}>
                                        <IconPencil size={14} />
                                    </ActionIcon>
                                }
                            </Group>
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
        </div>
    )
}