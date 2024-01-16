import { ActionIcon, Box, Button, Divider, Group, Indicator, Popover, Stack, Text } from "@mantine/core"
import { IconSparkles, IconX } from "@tabler/icons-react";
import { useSelectedModifiers } from "../../../context/SelectedModifiersContext";

export function PromptModifiersList() {
    const { selectedModifiers, setSelectedModifiers } = useSelectedModifiers();

    const removeModifier = (id: number) => {
        const newSelectedModifiers = selectedModifiers.filter(m => m.id !== id);
        setSelectedModifiers(newSelectedModifiers);
    }

    return (
        selectedModifiers.length > 0 &&
        <Box pos={"absolute"} left={30}>
            <Popover position="top-start">
                <Popover.Target>
                    {
                        selectedModifiers.length > 0
                            ? <Indicator inline label={selectedModifiers.length} size={16}>
                                <ActionIcon variant="subtle" size={"lg"}>
                                    <IconSparkles size={20} />
                                </ActionIcon>
                            </Indicator>
                            : <ActionIcon variant="subtle" size={"lg"}>
                                <IconSparkles size={20} />
                            </ActionIcon>

                    }
                </Popover.Target>
                <Popover.Dropdown>
                    <Stack>
                        <Stack gap={"xs"}>
                            {selectedModifiers.length === 0 && <Text size="xs">No modifiers selected</Text>}
                            {
                                selectedModifiers.map(modifier => {
                                    return (
                                        <Group key={modifier.id} justify="space-between">
                                            <Text size="xs">{modifier.title}</Text>
                                            <ActionIcon variant="subtle" onClick={() => removeModifier(modifier.id)}>
                                                <IconX size={12} />
                                            </ActionIcon>
                                        </Group>
                                    )
                                })
                            }
                        </Stack>
                        {
                            selectedModifiers.length > 0 &&
                            <Box>
                                <Divider />
                                <Button size="compact-xs" variant="subtle" onClick={() => setSelectedModifiers([])}>
                                    Clear
                                </Button>
                            </Box>
                        }
                    </Stack>
                </Popover.Dropdown>
            </Popover>
        </Box>
    )
}