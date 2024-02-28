import { ActionIcon, Badge, Divider, Group, Popover, Stack, Text, Tooltip } from "@mantine/core";
import { iconClose } from "../../../utils/iconsUtils";
import { Modifier } from "../../../models/Modifier";
import { Template } from "../../../models/Template";
import { ProviderLabel } from "../../../components/Common/ProviderLabel/ProviderLabel";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../../stores/store";
import { FC } from "react";
import classes from './UserPromptOptionsSwitcher.module.css';
import UserPromptOptionTechnologiesField from "../UserPromptOptionTechnologiesField/UserPromptOptionTechnologiesField";
import UserPromptOptionProvidersField from "../UserPromptOptionProvidersField/UserPromptOptionProvidersField";

const UserPromptOptionsSwitcher:FC = () => {
    const [
        selectedModifiers,
        selectedTemplates,
        nextThread,
        setSelectedTemplates,
        setSelectedModifiers,
    ] = useStore(useShallow(state => [
        state.selectedModifiers,
        state.selectedTemplates,
        state.nextThread,
        state.setSelectedTemplates,
        state.setSelectedModifiers,
    ]));


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
                                technology={nextThread.technology}
                                provider={nextThread.provider}
                                templates={selectedTemplates}
                                modifiers={selectedModifiers}
                                size="md"
                            />
                        </Badge>
                    </Popover.Target>
                    <Popover.Dropdown className={classes.optionsContainer}>
                        <Stack my={"xs"}>
                            <Stack gap={"md"} my={"xs"} maw={300}>
                                <UserPromptOptionTechnologiesField />
                                <UserPromptOptionProvidersField />
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

export default UserPromptOptionsSwitcher;