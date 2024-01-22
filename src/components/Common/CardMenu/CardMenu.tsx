import { ActionIcon, Menu, Text } from "@mantine/core";
import { IconDetails, IconDotsVertical, IconFileDescription, IconTrash } from "@tabler/icons-react";

interface CardMenu {
    detailsHandle: any
}

export function CardMenu({detailsHandle}: CardMenu) {
    const openDetails = (e: any) => {
        e.stopPropagation();
        detailsHandle.open()
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
                <Menu.Item leftSection={<IconTrash size={14} />} color="red">
                    <Text size="xs">Delete</Text>
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}