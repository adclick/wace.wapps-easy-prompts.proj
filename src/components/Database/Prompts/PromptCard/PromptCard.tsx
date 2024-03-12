import { Accordion, ActionIcon, Badge, Group, Stack, Text, Menu, Modal, Button, Tooltip } from "@mantine/core";
import { IconEdit, IconFileDescription, IconTrash, IconWorld } from "@tabler/icons-react";
import { Prompt } from "../../../../models/Prompt";
import { useClipboard, useDisclosure, useHover } from "@mantine/hooks";
import { PromptCardDetails } from "../PromptCardDetails/PromptCardDetails";
import { iconPlay } from "../../../../utils/iconsUtils";
import { useDeletePromptMutation, useUpdatePromptMutation } from "../../../../api/promptsApi";
import { getDefaultProvider } from "../../../../api/providersApi";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { useStore } from "../../../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { PromptForm } from "../../../Forms/PromptForm/PromptForm";
import classes from './PromptCard.module.css';
import { Thread } from "../../../../models/Thread";
import { IconDots } from "@tabler/icons-react";
import { Technology } from "../../../../models/Technology";

interface PromptCard {
    prompt: Prompt,
    navbarMobileHandle: any,
    itemRef: any
}

export function PromptCard({ prompt, navbarMobileHandle, itemRef }: PromptCard) {
    const [
        user,
        threads,
        setThreads,
    ] = useStore(useShallow(state => [
        state.user,
        state.threads,
        state.setThreads,
    ]));

    const [detailsOpened, detailsHandle] = useDisclosure(false);
    const [editOpened, editHandle] = useDisclosure(false);
    const clipboard = useClipboard({ timeout: 500 });

    const deleteMutation = useDeletePromptMutation();

    const play = async (e: any) => {
        e.stopPropagation();

        const newThread = Thread.buildFromPrompt(prompt);
        // newThread.threads_chat_messages.pop();
        newThread.key = Date.now();

        // If there is no provider, get the default one
        if (newThread.provider.uuid === "") {
            newThread.provider = await getDefaultProvider(newThread.technology);
        }

        // navbarMobileHandle.close();

        setThreads([
            ...threads,
            newThread
        ]);
    }

    const isUserItem = user.external_id === prompt.user.external_id;

    const openDetails = (e: any) => {
        e.stopPropagation();
        detailsHandle.open()
    }

    if (deleteMutation.isError) {
        notifications.show({
            title: "Error",
            message: deleteMutation.error.message,
            color: "red"
        });
    }

    const openDeleteModal = (e: any) => {
        e.stopPropagation();

        modals.openConfirmModal({
            title: 'Delete this item',
            centered: true,
            children: (
                <Text size="sm">
                    Are you sure you want to delete this item? This action is will modify the outcome of other items
                </Text>
            ),
            labels: { confirm: 'Delete', cancel: "Cancel" },
            confirmProps: { color: 'red' },
            onCancel: () => console.log('Cancel'),
            onConfirm: () => deleteMutation.mutate(prompt.uuid),
        });
    }

    const copyPublicURL = (e: any) => {
        e.stopPropagation();
        console.log(prompt);
        clipboard.copy(window.location.origin + window.location.pathname + '?prompt_id=' + prompt.uuid);

        notifications.show({
            title: "URL Copied",
            message: "",
            color: "blue"
        });
    }

    const openEdit = (e: any) => {
        e.stopPropagation();

        editHandle.open();
    }

    const hoverCard = useHover();
    const hoverMenu = useHover();

    const updateMutation = useUpdatePromptMutation(prompt.uuid);

    return (
        <>
            <PromptCardDetails
                opened={detailsOpened}
                handle={detailsHandle}
                prompt={prompt}
                deleteMutation={deleteMutation}
            />
            <Modal opened={editOpened} onClose={editHandle.close} title="Update Prompt" size={"lg"}>
                <PromptForm mutation={updateMutation} prompt={prompt} handle={editHandle} />
            </Modal>
            <Accordion.Item className={classes.card} ref={hoverCard.ref} value={prompt.uuid}>
                <Accordion.Control>
                    <Stack>
                        <Group justify="space-between" wrap="nowrap" align="center">
                            <Group wrap="nowrap" gap={"xs"}>
                                <Tooltip label={prompt.technology.name}>
                                    <ActionIcon component="a" variant="transparent" ml={-4}>
                                        {
                                            Technology.getIcon(prompt.technology, 18)
                                        }
                                    </ActionIcon>
                                </Tooltip>
                                <Stack gap={0}>
                                    <Badge size="xs" variant="transparent" px={0} color="gray.9">
                                        {prompt.repository.name}
                                    </Badge>
                                    <Tooltip label={prompt.title}>
                                        <Text size="xs" fw={700} lineClamp={1}>
                                            {prompt.title}
                                        </Text>
                                    </Tooltip>
                                </Stack>
                            </Group>
                            <Group wrap="nowrap" gap={"xs"}>
                                <Menu classNames={{ dropdown: classes.menuDropdown }}>
                                    <Menu.Target>
                                        <ActionIcon className={classes.menuTarget} variant="transparent" color="--mantine-color-text" component="a" onClick={e => e.stopPropagation()}>
                                            <IconDots size={16} />
                                        </ActionIcon>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Item onClick={openDetails} leftSection={<IconFileDescription size={14} />}>
                                            Details
                                        </Menu.Item>
                                        <Menu.Item onClick={e => copyPublicURL(e)} leftSection={<IconWorld size={14} />}>
                                            {
                                                clipboard.copied ? <>Copied</> : <>Copy URL</>
                                            }
                                        </Menu.Item>
                                        {
                                            isUserItem &&
                                            <Menu.Item onClick={e => openEdit(e)} leftSection={<IconEdit size={14} />}>
                                                Edit
                                            </Menu.Item>
                                        }
                                        {
                                            isUserItem &&
                                            <Menu.Item onClick={e => openDeleteModal(e)} leftSection={<IconTrash size={14} />} color="red">
                                                Delete
                                            </Menu.Item>
                                        }
                                    </Menu.Dropdown>
                                </Menu>

                                <ActionIcon component="a" variant="filled" size={"sm"} onClick={(e: any) => play(e)}>
                                    {iconPlay(12)}
                                </ActionIcon>
                            </Group>
                        </Group>

                    </Stack>
                </Accordion.Control >
                <Accordion.Panel>
                    <Stack gap={"lg"}>

                        <Group justify="flex-end">
                            <ActionIcon color="red" variant="subtle">
                                <IconTrash size={14} />
                            </ActionIcon>
                        </Group>

                        {
                            prompt.description &&
                            <Group wrap="nowrap" justify="space-between" align="flex-start">
                                <Text size="xs" c={"dimmed"} fw={500}>{prompt.description}</Text>
                            </Group>
                        }

                        <Group justify="space-between">

                            <Button onClick={openDetails} size="xs" variant="transparent" color="--mantine-text-color" px={0} leftSection={<IconFileDescription size={14} />}>
                                Details
                            </Button>
                            {
                                prompt.provider &&
                                <Badge variant="dot" size="sm">
                                    {prompt.provider.model_name}
                                </Badge>
                            }

                        </Group>

                        <Button radius={"md"} variant="light"

                        >
                            Edit
                        </Button>
                    </Stack>
                </Accordion.Panel>
            </Accordion.Item >
        </>
    )
}