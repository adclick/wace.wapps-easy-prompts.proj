import { ActionIcon, Badge, Divider, Group, Popover, Stack, Text, Title, Tooltip } from "@mantine/core";
import { PromptOptionsProvidersField } from "../PromptOptionsProvidersField/PromptOptionsProvidersField";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { PromptOptionsTechnologiesField } from "../PromptOptionsTechnologiesField/PromptOptionsTechnologiesField";
import classes from './PromptModeSwitcher.module.css';
import { iconClose } from "../../../utils/iconsUtils";
import { useSelectedTemplates } from "../../../context/SelectedTemplatesContext";
import { useSelectedModifiers } from "../../../context/SelectedModifiersContext";
import { Modifier } from "../../../model/Modifier";
import { Template } from "../../../model/Template";
import { ProviderLabel } from "../../Common/ProviderLabel/ProviderLabel";

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
                <Popover position="top" keepMounted>
                    <Popover.Target>
                        <Badge style={{ cursor: "pointer" }} size={"sm"} variant="dot" h={"auto"}>
                            <ProviderLabel
                                technology={userPromptRequest.technology}
                                provider={userPromptRequest.provider}
                                templates={selectedTemplates}
                                modifiers={selectedModifiers}
                                size="md"
                            />
                        </Badge>
                    </Popover.Target>
                    <Popover.Dropdown className={classes.optionsContainer}>
                        <Stack my={"xs"}>
                            <Title order={5}>Options</Title>
                            <Stack gap={"md"} my={"xs"} maw={300}>
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
                                                    <Group key={template.id} justify="space-between" wrap="nowrap" align="baseline">
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
                                                    <Group key={modifier.id} justify="space-between" wrap="nowrap" align="baseline">
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
                        </Stack>
                    </Popover.Dropdown>
                </Popover>
            </Group>
        </Stack>
    )
}