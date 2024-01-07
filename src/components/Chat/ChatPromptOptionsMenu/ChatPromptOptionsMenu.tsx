import { ActionIcon, Popover, Stack, Tooltip } from "@mantine/core";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { ChatPromptProvidersField } from "../ChatPromptProvidersField/ChatPromptProvidersField";

interface ChatPromptOptionsMenu {
    optionsHandle: any
}

export function ChatPromptOptionsMenu({ optionsHandle }: ChatPromptOptionsMenu) {
    return (
        <ActionIcon onClick={optionsHandle.toggle} variant="subtle" size="lg" pos={"absolute"} left={"30px"}>
            <Tooltip label="Adjust parameters">
                <IconAdjustmentsHorizontal size={22} stroke={1.5} />
            </Tooltip>
        </ActionIcon>
    )
}