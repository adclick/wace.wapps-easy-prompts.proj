import { ActionIcon, Badge, Divider, Group, Popover, ScrollArea, Stack, Text, Title, Tooltip } from "@mantine/core";
import { PromptOptionsProvidersField } from "../PromptOptionsProvidersField/PromptOptionsProvidersField";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { PromptOptionsTechnologiesField } from "../PromptOptionsTechnologiesField/PromptOptionsTechnologiesField";
import classes from './PromptModeSwitcher.module.css';
import { iconClose } from "../../../utils/iconsUtils";
import { useSelectedTemplates } from "../../../context/SelectedTemplatesContext";
import { IconSparkles, IconTemplate } from "@tabler/icons-react";
import { useSelectedModifiers } from "../../../context/SelectedModifiersContext";
import { Modifier } from "../../../model/Modifier";
import { Template } from "../../../model/Template";

export function PromptModeSwitcher() {
    const { userPromptRequest } = useUserPromptRequest();
    const { selectedTemplates, setSelectedTemplates } = useSelectedTemplates();
    const { selectedModifiers, setSelectedModifiers } = useSelectedModifiers();

    const removeTemplate = (id: number) => {
        const newSelectedTemplates = selectedTemplates.filter(m => m.id !== id);
        setSelectedTemplates(newSelectedTemplates);
    }

    const removeModifier = (id: number) => {
        const newSelectedModifiers = selectedModifiers.filter(m => m.id !== id);
        setSelectedModifiers(newSelectedModifiers);
    }

    return (
        <Stack>
            <Group justify="center" >
                <Popover position="top" keepMounted closeOnClickOutside={false}>
                    <Popover.Target>
                        <Badge style={{ cursor: "pointer" }} size="md" variant="dot" h={"auto"}>
                            <Group p={5} gap={"xs"} justify="space-between" wrap="wrap" >
                                <Text size="xs">{userPromptRequest.technology.name}</Text>
                                <Divider orientation="vertical" />
                                <Text size="xs">{userPromptRequest.provider.model_name}</Text>
                                {
                                    selectedTemplates.length > 0 &&
                                    <>
                                        <Divider orientation="vertical" />
                                        <Group gap={4}>
                                            <IconTemplate size={16} />
                                            <Text size="sm">{selectedTemplates.length}</Text>
                                        </Group>
                                    </>
                                }
                                {
                                    selectedModifiers.length > 0 &&
                                    <>
                                        <Divider orientation="vertical" />
                                        <Group gap={4}>
                                            <IconSparkles size={16} />
                                            <Text size="sm">{selectedModifiers.length}</Text>
                                        </Group>
                                    </>
                                }
                            </Group>
                        </Badge>
                    </Popover.Target>
                    <Popover.Dropdown className={classes.optionsContainer}>
                        <Stack my={"xs"}>
                            <Title order={5}>Options</Title>
                            <ScrollArea.Autosize mah={500} w={300}>
                                <Stack gap={"md"} my={"xs"}>
                                    <Divider label="Specifications" />
                                    <PromptOptionsTechnologiesField />
                                    <PromptOptionsProvidersField />
                                    {
                                        selectedTemplates.length > 0 &&
                                        <Stack>
                                            <Divider label="Templates" />
                                            {
                                                selectedTemplates.map((template: Template) => {
                                                    return (
                                                        <Group key={template.id} justify="space-between" wrap="nowrap">
                                                            <Tooltip label={template.title}>

                                                                <Text lineClamp={1}>{template.title}</Text>
                                                            </Tooltip>
                                                            <ActionIcon mr={"xs"} onClick={() => removeTemplate(template.id)} variant="transparent" color="gray">
                                                                {iconClose(14)}
                                                            </ActionIcon>
                                                        </Group>
                                                    )
                                                })
                                            }
                                        </Stack>
                                    }
                                    {
                                        selectedModifiers.length > 0 &&
                                        <Stack>
                                            <Divider label="Modifiers" />
                                            {
                                                selectedModifiers.map((modifier: Modifier) => {
                                                    return (
                                                        <Group key={modifier.id} justify="space-between" wrap="nowrap">
                                                            <Tooltip label={modifier.title}>
                                                                <Text lineClamp={1}>{modifier.title}</Text>
                                                            </Tooltip>
                                                            <ActionIcon mr={"xs"} onClick={() => removeModifier(modifier.id)} variant="transparent" color="gray">
                                                                {iconClose(14)}
                                                            </ActionIcon>
                                                        </Group>
                                                    )
                                                })
                                            }
                                        </Stack>
                                    }
                                </Stack>
                            </ScrollArea.Autosize>
                        </Stack>
                    </Popover.Dropdown>
                </Popover>
            </Group>
        </Stack>
    )
}