import { ActionIcon, Box, Button, Divider, Group, Indicator, Popover, Stack, Text } from "@mantine/core"
import { IconSparkles, IconTemplate, IconX } from "@tabler/icons-react";
import { useSelectedTemplate } from "../../../context/SelectedTemplateContext";
import { Template } from "../../../models/Template";

export function PromptTemplateInfo() {
    const { selectedTemplate, setSelectedTemplate } = useSelectedTemplate();

    const removeTemplate = () => {
        setSelectedTemplate(new Template());
    }

    return (
        selectedTemplate.id > 0 &&
        <Box pos={"absolute"} left={30}>
            <Popover position="top-start">
                <Popover.Target>
                    <Indicator inline label="1" size={16}>
                        <ActionIcon variant="subtle" size={"lg"}>
                            <IconTemplate size={20} />
                        </ActionIcon>
                    </Indicator>

                </Popover.Target>
                <Popover.Dropdown>
                    <Stack>
                        <Stack gap={"xs"}>
                            <Group key={selectedTemplate.id} justify="space-between">
                                <Text size="xs">{selectedTemplate.title}</Text>
                                <ActionIcon variant="subtle" onClick={removeTemplate}>
                                    <IconX size={12} />
                                </ActionIcon>
                            </Group>
                        </Stack>
                        <Box>
                            <Divider />
                            <Button size="compact-xs" variant="subtle" onClick={removeTemplate}>
                                Clear
                            </Button>
                        </Box>
                    </Stack>
                </Popover.Dropdown>
            </Popover>
        </Box>
    )
}