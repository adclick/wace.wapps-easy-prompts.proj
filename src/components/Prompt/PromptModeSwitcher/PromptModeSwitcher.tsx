import { Badge, Button, Group, Popover, Stack } from "@mantine/core";
import { PromptOptionsProvidersField } from "../PromptOptionsProvidersField/PromptOptionsProvidersField";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { PromptOptionsTechnologiesField } from "../PromptOptionsTechnologiesField/PromptOptionsTechnologiesField";
import classes from './PromptModeSwitcher.module.css';
import { iconChevronUp } from "../../../utils/iconsUtils";

export function PromptModeSwitcher() {
    const { userPromptRequest } = useUserPromptRequest();

    return (
        <Stack>
            <Group justify="center" >
                <Popover position="top" keepMounted>
                    <Popover.Target>
                        <Button size="compact-xs" variant="transparent" color="gray" rightSection={iconChevronUp(18)}>
                            <Badge style={{ cursor: "pointer" }} size="lg" variant="dot">
                                {userPromptRequest.technology.name} | {userPromptRequest.provider.model_name}
                            </Badge>
                        </Button>
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