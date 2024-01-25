import { Badge, Group, Popover, Stack } from "@mantine/core";
import { PromptOptionsProvidersField } from "../PromptOptionsProvidersField/PromptOptionsProvidersField";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { PromptOptionsTechnologiesField } from "../PromptOptionsTechnologiesField/PromptOptionsTechnologiesField";
import classes from './PromptModeSwitcher.module.css';

export function PromptModeSwitcher() {
    const { userPromptRequest } = useUserPromptRequest();

    return (
        <Stack>
            <Group justify="center" >
                <Popover position="top" keepMounted>
                    <Popover.Target>
                        <Badge style={{ cursor: "pointer" }} size="md" variant="dot">
                            {userPromptRequest.technology.name} | {userPromptRequest.provider.model_name}
                        </Badge>
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