import { ActionIcon, Popover } from "@mantine/core";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { PromptOptionsContainer } from "../PromptOptionsContainer/PromptOptionsContainer";
import iconsUtils from "../../../utils/iconsUtils";

export function PromptOptionsMenu() {
    const { userPromptRequest } = useUserPromptRequest();

    return (
        <Popover position="top-start" keepMounted>
            <Popover.Target>
                <ActionIcon variant="subtle" size="lg" pos={"absolute"} left={"30px"}>
                    {
                        iconsUtils.getTechnologyIcon(userPromptRequest.technology.slug, 22)
                    }
                </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
                <PromptOptionsContainer />
            </Popover.Dropdown>
        </Popover>
    )
}