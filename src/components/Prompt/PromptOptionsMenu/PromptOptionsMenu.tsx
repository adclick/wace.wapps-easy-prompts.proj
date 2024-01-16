import { ActionIcon, Popover, Tooltip } from "@mantine/core";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { PromptOptionsContainer } from "../PromptOptionsContainer/PromptOptionsContainer";
import iconsUtils from "../../../utils/iconsUtils";
import { IconAdjustmentsHorizontal, IconArrowUp, IconChevronUp, IconDots, IconDotsCircleHorizontal } from "@tabler/icons-react";

export function PromptOptionsMenu() {
    const { userPromptRequest } = useUserPromptRequest();

    return (
        <Popover position="top" keepMounted>
            <Popover.Target>
                <Tooltip label="More Options">
                    <ActionIcon
                        variant="subtle"
                        size="sm"
                    >
                        <IconDots size={18} />
                    </ActionIcon>
                </Tooltip>
            </Popover.Target>
            <Popover.Dropdown>
                <PromptOptionsContainer />
            </Popover.Dropdown>
        </Popover>
    )
}