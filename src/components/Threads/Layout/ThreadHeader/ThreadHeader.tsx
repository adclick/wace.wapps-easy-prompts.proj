import { ActionIcon, Button, Group, Modal, Stack, Text, TextInput, Tooltip, UnstyledButton } from "@mantine/core"
import { iconChevronDown, iconChevronUp, iconClose } from "../../../../utils/iconsUtils"
import classes from './ThreadHeader.module.css'
import { Technology } from "../../../../models/Technology"
import { Thread } from "../../../../models/Thread"
import { useDisclosure, useHover } from "@mantine/hooks"
import { IconCheck, IconPencil } from "@tabler/icons-react"
import { useState } from "react"

interface ThreadHeader {
    deleteThread: any,
    collapsed: boolean,
    setCollapsed: any,
    thread: Thread,
    updateMutation: any
}

export function ThreadHeader({ deleteThread, collapsed, setCollapsed, thread, updateMutation }: ThreadHeader) {
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

    const updateCollapsed = () => {
        setCollapsed(!collapsed);
        updateMutation(undefined, undefined, undefined, !collapsed);
    }

    return (
        <div ref={ref}>
            <Modal opened={editTitleOpened} onClose={editTitleHandle.close} title="Rename">
                <Stack>
                    <TextInput
                        value={threadTitle}
                        onChange={e => setThreadTitle(e.target.value)}
                        onKeyDown={e => onKeyDownThreadTitle(e)}
                        autoFocus
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
                <UnstyledButton w={"100%"} onClick={updateCollapsed}>
                    <Group justify="space-between" wrap="nowrap">
                        {/* <DesktopContainer>
                        <Badge variant="dot">{promptRequest.technology.name} | {promptRequest.provider.model_name}</Badge>
                    </DesktopContainer> */}
                        <Group wrap="nowrap">
                            {
                                Technology.getIcon(thread.technology, 18)
                            }
                            <Group gap={4} wrap="nowrap">
                                <Text lineClamp={1}>
                                    {
                                        thread.title
                                    }
                                </Text>
                                {
                                    hovered &&
                                    <Tooltip label="Rename">
                                        <ActionIcon component="a" variant="transparent" color="gray" onClick={e => openEditTitle(e)}>
                                            <IconPencil size={14} />
                                        </ActionIcon>
                                    </Tooltip>
                                }
                            </Group>
                        </Group>
                        <Group wrap="nowrap" justify="flex-end">
                            {
                                thread.collapsed ? iconChevronUp("xs") : iconChevronDown("xs")
                            }
                            <ActionIcon
                                component="div"
                                className={classes.iconClose}
                                variant="transparent"
                                onClick={e => deleteThread(e, thread)}
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