import { ActionIcon, Menu, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCopy, IconDotsVertical, IconEdit, IconFileDescription, IconTrash } from "@tabler/icons-react";
import { useUser } from "../../../context/UserContext";
import { User } from "../../../models/User";
import { modals } from "@mantine/modals";
import classes from './CardMenu.module.css';
import { useClipboard } from "@mantine/hooks";
import { ModifierEditButton } from "../../Database/Modifiers/ModifierEditButton/ModifierEditButton";
import { Prompt } from "../../../models/Prompt";
import { Template } from "../../../models/Template";
import { Modifier } from "../../../models/Modifier";

interface CardMenu {
    detailsHandle: any,
    deleteMutation: any,
    item: Prompt|Template|Modifier
    itemId: number,
    itemUser: User,
    hasPublicURL: boolean,
}

export function CardMenu({
    detailsHandle,
    deleteMutation,
    item,
    itemId,
    itemUser,
    hasPublicURL,
}: CardMenu) {
    const { user } = useUser();
    const clipboard = useClipboard({ timeout: 500 });

    const isUserItem = user.external_id === itemUser.external_id;

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
            onConfirm: () => deleteMutation.mutate(itemId),
        });
    }

    const copyPublicURL = (e: any) => {
        clipboard.copy(window.location.origin + window.location.pathname + '?prompt_id=' + itemId);

        notifications.show({
            title: "URL Copied",
            message: "",
            color: "blue"
        });
    }

    return (
        <Menu>
            <Menu.Target>
                <ActionIcon className={classes.menuIcon} variant="transparent" color="gray.9" component="a" onClick={e => e.stopPropagation()}>
                    <IconDotsVertical size={16} />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item onClick={openDetails} leftSection={<IconFileDescription size={14} />}>
                    <Text size="xs">Details</Text>
                </Menu.Item>
                {
                    hasPublicURL &&
                    <Menu.Item onClick={e => copyPublicURL(e)} leftSection={<IconCopy size={14} />}>
                        {
                            clipboard.copied
                                ? <Text size="xs">Copied</Text>
                                : <Text size="xs">Copy URL</Text>
                        }
                    </Menu.Item>
                }
                {
                    isUserItem &&
                    <Menu.Item>
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
    )
}