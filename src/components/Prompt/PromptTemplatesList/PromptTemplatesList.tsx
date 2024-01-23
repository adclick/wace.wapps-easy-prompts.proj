import { ActionIcon, Box, Button, Group, Indicator, Popover, Stack, Text } from "@mantine/core";
import { IconTemplate, IconX } from "@tabler/icons-react";
import { useSelectedTemplates } from "../../../context/SelectedTemplatesContext";
import { usePromptMode } from "../../../context/PromptModeContext";
import { getPromptModeColor } from "../../../model/PromptMode";

export function PromptTemplatesList() {
    const { selectedTemplates, setSelectedTemplates } = useSelectedTemplates();
    const { promptMode } = usePromptMode();

    const removeTemplate = (id: number) => {
        const newSelectedTemplates = selectedTemplates.filter(m => m.id !== id);
        setSelectedTemplates(newSelectedTemplates);
    }

    return (
        selectedTemplates.length > 0 &&
        <Box pos={"absolute"} left={28}>
            <Popover position="top-start">
                <Popover.Target>
                    <Indicator color={getPromptModeColor(promptMode)} inline label={selectedTemplates.length} size={16}>
                        <ActionIcon color={getPromptModeColor(promptMode)} variant="transparent" size={"lg"}>
                            <IconTemplate size={20} />
                        </ActionIcon>
                    </Indicator>

                </Popover.Target>
                <Popover.Dropdown>
                    <Stack>
                        <Stack gap={"xs"}>
                            {selectedTemplates.length === 0 && <Text size="xs">No templates selected</Text>}
                            {
                                selectedTemplates.map(template => {
                                    return (
                                        <Group gap={4} key={template.id} justify="space-between">
                                            <ActionIcon variant="transparent" color="gray" onClick={() => removeTemplate(template.id)}>
                                                <IconX size={12} />
                                            </ActionIcon>
                                            <Text size="sm">{template.title}</Text>
                                        </Group>
                                    )
                                })
                            }
                        </Stack>
                        {
                            selectedTemplates.length > 0 &&
                            <Box>
                                <Button size="compact-xs" variant="transparent" color="gray" onClick={() => setSelectedTemplates([])}>
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