import { ActionIcon, Tooltip } from "@mantine/core";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";

interface PromptOptionsMenu {
    optionsHandle: any
}

export function PromptOptionsMenu({ optionsHandle }: PromptOptionsMenu) {
    return (
        <ActionIcon onClick={optionsHandle.toggle} variant="subtle" size="lg" pos={"absolute"} left={"30px"}>
            <Tooltip label="Adjust parameters">
                <IconAdjustmentsHorizontal size={22} stroke={1.5} />
            </Tooltip>
        </ActionIcon>
    )
}