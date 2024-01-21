import { ActionIcon, Box, Button, Divider, Group, Indicator, Popover, Stack, Text } from "@mantine/core"
import { IconSparkles, IconX } from "@tabler/icons-react";
import { useSelectedModifiers } from "../../../context/SelectedModifiersContext";
import { usePromptMode } from "../../../context/PromptModeContext";
import { getPromptModeColor } from "../../../model/PromptMode";

export function PromptModifiersList() {
    const { selectedModifiers, setSelectedModifiers } = useSelectedModifiers();
    const { promptMode } = usePromptMode();

    const removeModifier = (id: number) => {
        const newSelectedModifiers = selectedModifiers.filter(m => m.id !== id);
        setSelectedModifiers(newSelectedModifiers);
    }

    return (
        selectedModifiers.length > 0 &&
        <Box pos={"absolute"} left={12}>
            <Popover position="top-start">
                <Popover.Target>
                    <Indicator color={getPromptModeColor(promptMode)} inline label={selectedModifiers.length} size={16}>
                        <ActionIcon color={getPromptModeColor(promptMode)} variant="transparent" size={"lg"}>
                            <IconSparkles size={20} />
                        </ActionIcon>
                    </Indicator>

                </Popover.Target>
                <Popover.Dropdown>
                    <Stack>
                        <Stack gap={"xs"}>
                            {selectedModifiers.length === 0 && <Text size="xs">No modifiers selected</Text>}
                            {
                                selectedModifiers.map(modifier => {
                                    return (
                                        <Group gap={4} key={modifier.id} justify="space-between">
                                            <ActionIcon variant="transparent" color="gray" onClick={() => removeModifier(modifier.id)}>
                                                <IconX size={12} />
                                            </ActionIcon>
                                            <Text size="sm">{modifier.title}</Text>
                                        </Group>
                                    )
                                })
                            }
                        </Stack>
                        {
                            selectedModifiers.length > 0 &&
                            <Box>
                                <Button size="compact-xs" variant="transparent" color="gray" onClick={() => setSelectedModifiers([])}>
                                    Clear all
                                </Button>
                            </Box>
                        }
                    </Stack>
                </Popover.Dropdown>
            </Popover>
        </Box>
    )
}