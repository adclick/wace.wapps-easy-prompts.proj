import { ActionIcon, Menu, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconDotsVertical, IconFileDescription, IconTrash } from "@tabler/icons-react";
import { useUser } from "../../../context/UserContext";
import { User } from "../../../model/User";

interface CardMenu {
    detailsHandle: any,
    deleteMutation: any,
    itemId: number,
    itemUser: User
}

export function CardMenu({ detailsHandle, deleteMutation, itemId, itemUser }: CardMenu) {
    const { user } = useUser();

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

        deleteMutation.reset();
    }

    if (deleteMutation.isSuccess) {
        notifications.show({
            title: "Item Deleted",
            message: "Your settings were saved",
            color: "blue"
        });

        deleteMutation.reset();
    }

    const deleteItem = async (e: any) => {
        e.stopPropagation();

        deleteMutation.mutate(itemId);
    }

    return (
        <Menu>
            <Menu.Target>
                <ActionIcon variant="transparent" color="gray.9" component="a" onClick={e => e.stopPropagation()}>
                    <IconDotsVertical size={16} />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item onClick={openDetails} leftSection={<IconFileDescription size={14} />}>
                    <Text size="xs">Details</Text>
                </Menu.Item>
                {
                    isUserItem &&
                    <Menu.Item onClick={deleteItem} leftSection={<IconTrash size={14} />} color="red">
                        <Text size="xs">Delete</Text>
                    </Menu.Item>
                }
            </Menu.Dropdown>
        </Menu>
    )
}