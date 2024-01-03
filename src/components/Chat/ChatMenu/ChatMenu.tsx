import { Group, Menu, Title, UnstyledButton, rem } from "@mantine/core";
import { IconChevronDown, IconHistory, IconPlus } from "@tabler/icons-react";

interface ChatMenu {

}

export function ChatMenu({

}: ChatMenu) {
    return (
        <Menu shadow="md" position='bottom-start'>
            <Menu.Target>
                <UnstyledButton px={"md"} >
                    <Group align='center' gap={"xs"}>
                        <Title order={1} size={"h3"} style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        }}>
                            Chat
                        </Title>
                        <IconChevronDown size={18} />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item color='blue' leftSection={<IconPlus size={14} />}>
                    New Chat
                </Menu.Item>
                <Menu.Item disabled leftSection={<IconHistory size={14} />}>
                    History
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}