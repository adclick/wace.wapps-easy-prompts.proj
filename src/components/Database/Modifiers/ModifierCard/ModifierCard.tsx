import { Accordion, Badge, Group, Stack, Text, Checkbox, Modal, Menu, ActionIcon, Tooltip, Button } from "@mantine/core";
import { Modifier } from "../../../../models/Modifier";
import { useClipboard, useDisclosure } from "@mantine/hooks";
import { ModifierCardDetails } from "../ModifierCardDetails/ModifierCardDetails";
import classes from './ModifierCard.module.css';
import { useDeleteModifierMutation, useUpdateModifierMutation } from "../../../../api/modifiersApi";
import { IconCopy, IconDots, IconEdit, IconFileDescription, IconTrash } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { MouseEvent } from "react";
import { useStore } from "../../../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { ModifierForm } from "../../../Forms/ModifierForm/ModifierForm";
import { Technology } from "../../../../models/Technology";
import { Color } from "../../../../enums";

interface ModifierCard {
    modifier: Modifier,
    itemRef: any
}

export function ModifierCard({ modifier, itemRef }: ModifierCard) {
    const [modifierDetailsOpened, modifierDetailsHandle] = useDisclosure(false);
    const deleteMutation = useDeleteModifierMutation();
    const clipboard = useClipboard({ timeout: 500 });

    const [editOpened, editHandle] = useDisclosure(false);

    const [user] = useStore(useShallow(state => [state.user]));

    const isUserItem = user.external_id === modifier.user.external_id;

    const openDetails = (e: any) => {
        e.stopPropagation();
        modifierDetailsHandle.open()
    }

    if (deleteMutation.isError) {
        notifications.show({
            title: "Error",
            message: deleteMutation.error.message,
            color: "red"
        });
    }

    if (deleteMutation.isSuccess) {
        notifications.show({
            title: "Item Deleted",
            message: "",
            color: "blue"
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
            onConfirm: () => deleteMutation.mutate(modifier.uuid),
        });
    }

    const copyPublicURL = (e: any) => {
        e.stopPropagation();
        clipboard.copy(window.location.origin + window.location.pathname + '?modifier_id=' + modifier.id);

        notifications.show({
            title: "URL Copied",
            message: "",
            color: "blue"
        });
    }


    const openEditModal = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.stopPropagation();

        editHandle.open();
    }

    const updateMutation = useUpdateModifierMutation(modifier.uuid);

    return (
        <>
            <ModifierCardDetails
                opened={modifierDetailsOpened}
                handle={modifierDetailsHandle}
                modifier={modifier}
                deleteMutation={deleteMutation}
            />
            <Modal opened={editOpened} onClose={editHandle.close} title="Edit Modifier" size={"lg"}>
                <ModifierForm mutation={updateMutation} modifier={modifier} handle={editHandle} />
            </Modal>
            <Accordion.Item className={classes.card} ref={itemRef} value={modifier.id.toString()}>
                <Accordion.Control>
                    <Group justify="space-between" wrap="nowrap" align="center">
                        <Group wrap="nowrap" gap={"xs"}>
                            <Tooltip label={modifier.technology.name}>
                                <ActionIcon component="a" variant="transparent" ml={-4}>
                                    {
                                        Technology.getIcon(modifier.technology, 18, Color.teal)
                                    }
                                </ActionIcon>
                            </Tooltip>
                            <Stack gap={0}>
                                <Badge size="xs" variant="transparent" px={0} color="gray.9">
                                    {modifier.repository.name}
                                </Badge>
                                <Text size="xs" fw={700} lineClamp={1}>
                                    {modifier.title}
                                </Text>
                            </Stack>
                        </Group>
                        <Group gap={"xs"} wrap="nowrap">
                            <Menu>
                                <Menu.Target>
                                    <ActionIcon variant="transparent" color="--mantine-color-text" component="a" onClick={e => e.stopPropagation()}>
                                        <IconDots size={16} />
                                    </ActionIcon>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item onClick={openDetails} leftSection={<IconFileDescription size={14} />}>
                                        Details
                                    </Menu.Item>
                                    <Menu.Item onClick={e => copyPublicURL(e)} leftSection={<IconCopy size={14} />}>
                                        {
                                            clipboard.copied ? 'Copied' : 'Copy URL'
                                        }
                                    </Menu.Item>
                                    {
                                        isUserItem &&
                                        <Menu.Item onClick={e => openEditModal(e)} leftSection={<IconEdit size={14} />}>
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
                            <Checkbox
                                classNames={{
                                    input: classes.inputCheckbox
                                }}
                                value={modifier.id.toString()}
                                size="sm"
                                onClick={e => e.stopPropagation()}
                            />
                        </Group>
                    </Group>
                </Accordion.Control >
                <Accordion.Panel>
                    <Stack gap={"lg"}>
                        <Group wrap="nowrap" justify="space-between" align="flex-start">
                            <Text size="xs" c={"dimmed"} fw={500}>{modifier.description}</Text>
                        </Group>

                        <Group justify="space-between">

                            <Button onClick={openDetails} size="xs" variant="transparent" color="--mantine-text-color" px={0} leftSection={<IconFileDescription size={14} />}>
                                Details
                            </Button>
                            {
                                modifier.provider &&
                                <Badge variant="dot" size="sm">
                                    {modifier.provider.model_name}
                                </Badge>

                            }

                        </Group>
                    </Stack>
                </Accordion.Panel>
            </Accordion.Item >
        </>
    )
}