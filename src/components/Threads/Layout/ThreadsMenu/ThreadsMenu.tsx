import { Group, Menu, Text, UnstyledButton } from "@mantine/core";
import { usePromptsRequests } from "../../../../context/PromptsRequestsContext";
import { iconAdd, iconChevronDown } from "../../../../utils/iconsUtils";
import { IconClearAll } from "@tabler/icons-react";

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
                <Menu.Item onClick={() => setPromptsRequests([])} leftSection={<IconClearAll size={14} />}>
                    Clear Threads
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}