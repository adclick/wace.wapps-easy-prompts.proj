import { ActionIcon, Popover } from "@mantine/core";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { Technology } from "../../../model/Technology";
import { PromptOptionsContainer } from "../PromptOptionsContainer/PromptOptionsContainer";

export function PromptOptionsMenu() {
    const { userPromptRequest } = useUserPromptRequest();

    return (
        <Popover position="top-start" keepMounted>
            <Popover.Target>
                <ActionIcon variant="subtle" size="lg" pos={"absolute"} left={"30px"}>
                    {
                        Technology.getIcon(userPromptRequest.technology.slug, 22)
                    }
                </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
                <PromptOptionsContainer />
            </Popover.Dropdown>
        </Popover>
    )
}