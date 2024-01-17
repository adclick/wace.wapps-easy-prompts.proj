import { Button, Group, Menu, Stack, Text, UnstyledButton } from "@mantine/core";
import { IconChevronDown, IconPlus } from "@tabler/icons-react";
import { usePromptsRequests } from "../../../context/PromptsRequestsContext";

export function ThreadsMenu() {
    const { setPromptsRequests } = usePromptsRequests();

    return (
        <Menu shadow="md" position='bottom-start'>
            <Menu.Target>
                <UnstyledButton px={0}>
                    <Group align='center' gap={"xs"} wrap="nowrap">
                        <Text size="xl" fw={700}>
                            Menu
                        </Text>
                        <IconChevronDown size={16} stroke={3} />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item onClick={() => setPromptsRequests([])} leftSection={<IconPlus size={14} />}>
                    New Private Window
                </Menu.Item>
                <Menu.Divider />
                <Menu.Label>Repositories</Menu.Label>
                <Menu.Item disabled>
                    New Reposity
                </Menu.Item>
                <Menu.Item disabled>
                    Browse
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}