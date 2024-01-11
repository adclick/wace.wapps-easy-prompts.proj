import { ActionIcon, Button, Group, Popover, Text } from "@mantine/core"
import { IconSparkles, IconX } from "@tabler/icons-react";
import { useSelectedModifiers } from "../../../../context/SelectedModifiersContext";

export function PromptModifiersList() {
    const {selectedModifiers, setSelectedModifiers} = useSelectedModifiers();

    const removeModifier = (id: number) => {
        const newSelectedModifiers = selectedModifiers.filter(m => m.id !== id);
        setSelectedModifiers(newSelectedModifiers);
    }

    return (
        <Group gap={0}>
            <Popover position="top-start">
                <Popover.Target>
                    <Button variant="subtle" size="xs" leftSection={<IconSparkles size={14} />}>
                        Using {selectedModifiers.length} modifiers
                    </Button>
                </Popover.Target>
                <Popover.Dropdown>
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
                </Popover.Dropdown>
            </Popover>
            <ActionIcon variant="subtle" onClick={() => setSelectedModifiers([])}>
                <IconX size={12} />
            </ActionIcon>
        </Group>
    )
}