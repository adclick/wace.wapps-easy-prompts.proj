import { Button, Group, Menu, Stack, Text, UnstyledButton } from "@mantine/core";
import { IconChevronDown, IconPlus } from "@tabler/icons-react";
import { usePromptsRequests } from "../../../../context/PromptsRequestsContext";
import { iconAdd, iconChevronDown, iconPlay } from "../../../../utils/iconsUtils";

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
                        {iconChevronDown("sm", 3)}
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item onClick={() => setPromptsRequests([])} leftSection={iconAdd(14)}>
                    New Private Window
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}