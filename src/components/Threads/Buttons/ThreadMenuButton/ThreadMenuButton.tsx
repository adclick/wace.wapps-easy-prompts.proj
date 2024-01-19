import { ActionIcon, Menu } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";

export function ThreadMenuButton() {
    return (
        <Menu>
            <Menu.Target>
                <ActionIcon color="gray.6" variant="subtle">
                    <IconDotsVertical size={14} stroke={3} />
                </ActionIcon>
            </Menu.Target>
        </Menu>
    )
}