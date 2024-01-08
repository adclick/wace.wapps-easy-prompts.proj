import { Button, Group, Menu, Stack, Text, UnstyledButton } from "@mantine/core";
import { IconChevronDown, IconPlus } from "@tabler/icons-react";
import { usePromptsRequests } from "../../../context/PromptsRequestsContext";

export function ChatMenu() {
    const { setPromptsRequests } = usePromptsRequests();

    return (
        <Menu shadow="md" position='bottom-start'>
            <Menu.Target>
                <UnstyledButton px={0}>
                    <Group align='center' gap={"xs"} wrap="nowrap">
                        <Text size="xl" fw={500}>
                            Menu
                        </Text>
                        <IconChevronDown size={16} />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item onClick={() => setPromptsRequests([])} leftSection={<IconPlus size={14} />}>
                    New Chat
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}