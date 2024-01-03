import { Group, Menu, Text, UnstyledButton } from "@mantine/core";
import { IconChevronDown, IconSparkles } from "@tabler/icons-react";
import { NewModifierModal } from "../NewModifierModal/NewModifierModal";
import { useDisclosure } from "@mantine/hooks";

export function CraftsDatabaseMenu() {
    const [newModifierOpened, newModifierHandle] = useDisclosure(false);

    return (
        <>
            <NewModifierModal opened={newModifierOpened} handle={newModifierHandle} />
            <Menu shadow="md" width={200} position='bottom-start'>
                <Menu.Target>
                    <UnstyledButton px={0}>
                        <Group align='center' gap={"xs"} wrap="nowrap">
                            <Text truncate size="xl" fw={500}>
                                Database
                            </Text>
                            <IconChevronDown size={16} />
                        </Group>
                    </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item onClick={newModifierHandle.open} leftSection={<IconSparkles size={14} />}>
                        New Modifier
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
    )
}