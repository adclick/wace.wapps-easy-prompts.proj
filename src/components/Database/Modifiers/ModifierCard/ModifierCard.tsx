import { Accordion, Badge, Group, Stack, Text, Checkbox, Modal, Menu, ActionIcon } from "@mantine/core";
import { Modifier } from "../../../../models/Modifier";
import { useClipboard, useDisclosure } from "@mantine/hooks";
import { ModifierCardDetails } from "../ModifierCardDetails/ModifierCardDetails";
import classes from './ModifierCard.module.css';
import { useDeleteModifierMutation } from "../../../../api/modifiersApi";
import { ProviderLabel } from "../../../Common/ProviderLabel/ProviderLabel";
import { DatabaseCardContent } from "../../Common/DatabaseCardContent/DatabaseCardContent";
import { UpdateModifierForm } from "../../../../forms/UpdateModifierForm/UpdateModifierForm";
import { IconCopy, IconDotsVertical, IconEdit, IconFileDescription, IconTrash } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { MouseEvent } from "react";
import { useStore } from "../../../../stores/store";
import { useShallow } from "zustand/react/shallow";

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
            onConfirm: () => deleteMutation.mutate(modifier.id),
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

    return (
        <>
            <ModifierCardDetails
                opened={modifierDetailsOpened}
                handle={modifierDetailsHandle}
                modifier={modifier}
                deleteMutation={deleteMutation}
            />
            <Modal opened={editOpened} onClose={editHandle.close} title="Edit Modifier" size={"lg"}>
                <UpdateModifierForm modifier={modifier} handle={editHandle} />
            </Modal>
            <Accordion.Item ref={itemRef} value={modifier.id.toString()}>
                <Accordion.Control>
                    <Stack>
                        <Group justify="space-between" wrap="nowrap" align="flex-start">
                            <Stack gap={0}>
                                <Badge size="xs" variant="transparent" px={0} color="gray.9">
                                    {modifier.repository.name}
                                </Badge>
                                <Text size="sm" fw={500} lineClamp={20}>
                                    {modifier.title}
                                </Text>
                            </Stack>
                            <Menu>
                                <Menu.Target>
                                    <ActionIcon variant="transparent" color="--mantine-color-text" component="a" onClick={e => e.stopPropagation()}>
                                        <IconDotsVertical size={16} />
                                    </ActionIcon>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item onClick={openDetails} leftSection={<IconFileDescription size={14} />}>
                                        <Text size="xs">Details</Text>
                                    </Menu.Item>
                                    <Menu.Item onClick={e => copyPublicURL(e)} leftSection={<IconCopy size={14} />}>
                                        {
                                            clipboard.copied
                                                ? <Text size="xs">Copied</Text>
                                                : <Text size="xs">Copy URL</Text>
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
                                            <Text size="xs">Delete</Text>
                                        </Menu.Item>
                                    }
                                </Menu.Dropdown>
                            </Menu>
                        </Group>

                        <Group justify="space-between" wrap="nowrap">
                            <Badge size={"xs"} variant="dot" h={"auto"}>
                                <ProviderLabel
                                    size="xs"
                                    technology={modifier.technology}
                                    provider={modifier.provider}
                                    templates={[]}
                                    modifiers={[]}
                                />
                            </Badge>
                            <Checkbox
                                classNames={{
                                    input: classes.inputCheckbox
                                }}
                                value={modifier.id.toString()}
                                size="md"
                                onClick={e => e.stopPropagation()}
                            />
                        </Group>
                    </Stack>
                </Accordion.Control >
                <Accordion.Panel>
                    <DatabaseCardContent item={modifier} detailsHandle={modifierDetailsHandle} />
                </Accordion.Panel>
            </Accordion.Item >
        </>
    )
}