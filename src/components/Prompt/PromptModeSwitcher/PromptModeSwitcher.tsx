import { Badge, Button, Divider, Group, Indicator, Popover, Stack, Text } from "@mantine/core";
import { PromptOptionsProvidersField } from "../PromptOptionsProvidersField/PromptOptionsProvidersField";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { PromptOptionsTechnologiesField } from "../PromptOptionsTechnologiesField/PromptOptionsTechnologiesField";
import classes from './PromptModeSwitcher.module.css';
import { iconChevronUp } from "../../../utils/iconsUtils";
import { useSelectedTemplates } from "../../../context/SelectedTemplatesContext";
import { IconTemplate, IconTemplateOff } from "@tabler/icons-react";

export function PromptModeSwitcher() {
    const { userPromptRequest } = useUserPromptRequest();
    const { selectedTemplates } = useSelectedTemplates();

    return (
        <Stack>
            <Group justify="center" >
                <Popover position="top" keepMounted>
                    <Popover.Target>
                        <Indicator size={16} label="2 Templates">
                            <Badge style={{ cursor: "pointer" }} size="md" variant="dot">
                                <Group gap={"xs"} justify="space-between" wrap="nowrap">
                                    <Text size="xs">{userPromptRequest.technology.name}</Text>
                                    <Divider orientation="vertical" />
                                    <Text size="xs">{userPromptRequest.provider.model_name}</Text>
                                </Group>
                            </Badge>
                        </Indicator>
                    </Popover.Target>
                    <Popover.Dropdown className={classes.optionsContainer}>
                        <Stack gap={"md"}>
                            <PromptOptionsTechnologiesField
                            />
                            <PromptOptionsProvidersField
                            />
                        </Stack>
                    </Popover.Dropdown>
                </Popover>
            </Group>
        </Stack>
    )
}