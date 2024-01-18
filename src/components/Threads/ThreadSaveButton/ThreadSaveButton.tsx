import { Button, Menu } from "@mantine/core";
import { IconChevronUp, IconMessage, IconPlus, IconTemplate, IconTool, IconTools } from "@tabler/icons-react";

interface ThreadSaveButton {
    onClick: any
}

export function ThreadSaveButton({ onClick }: ThreadSaveButton) {
    return (
        <Menu position="top-start">
            <Menu.Target>
                <Button
                    // onClick={onClick}
                    variant="filled"
                    size="xs"
                    leftSection={<IconChevronUp size={14} stroke={3} />}
                >
                    Actions
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item onClick={onClick} leftSection={<IconMessage size={14} />}>
                    Create Prompt
                </Menu.Item>
                <Menu.Item leftSection={<IconTemplate size={14} />}>
                    Create Template
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}