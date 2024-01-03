import { ActionIcon, Popover, Stack, Tooltip } from "@mantine/core";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { ChatPromptProvidersField } from "../ChatPromptProvidersField/ChatPromptProvidersField";

export function ChatPromptOptionsMenu() {
    return (
        <Popover position="top-start">
            <Popover.Target>
                <ActionIcon variant="subtle" size="lg" pos={"absolute"} left={"70px"}>
                    <Tooltip label="Adjust parameters">
                        <IconAdjustmentsHorizontal size={22} stroke={1.5} />
                    </Tooltip>
                </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown p={0}>
                <Stack>
                    <ChatPromptProvidersField />
                </Stack>
            </Popover.Dropdown>
        </Popover>
    )
}