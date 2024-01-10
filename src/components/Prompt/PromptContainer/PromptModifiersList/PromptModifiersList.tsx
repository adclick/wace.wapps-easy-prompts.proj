import { ActionIcon, Button, Group, Popover, Text } from "@mantine/core"
import { useModifiersSelected } from "../../../../context/ModifiersSelectedContext"
import { IconSparkles, IconX } from "@tabler/icons-react";

export function PromptModifiersList() {
    const { modifiersSelected, setModifiersSelected } = useModifiersSelected();

    const removeModifier = (id: number) => {
        const newMOdifiersSelected = modifiersSelected.filter(m => m.id !== id);
        setModifiersSelected(newMOdifiersSelected);
    }

    return (
        <Popover position="top-start">
            <Popover.Target>
                <Button variant="subtle" size="xs" leftSection={<IconSparkles size={14} />}>
                    Using {modifiersSelected.length} modifiers
                </Button>
            </Popover.Target>
            <Popover.Dropdown>
                {
                    modifiersSelected.map(modifier => {
                        return (
                            <Group justify="space-between">
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
    )
}