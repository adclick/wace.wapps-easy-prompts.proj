import { ActionIcon } from "@mantine/core";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { usePromptsRequests } from "../../../context/PromptsRequestsContext";
import { usePromptMode } from "../../../context/PromptModeContext";
import { getPromptModeColor } from "../../../model/PromptMode";
import { iconPlay } from "../../../utils/iconsUtils";

export function PromptPlayButton() {
    const { promptsRequests, setPromptsRequests } = usePromptsRequests();
    const { userPromptRequest } = useUserPromptRequest();
    const { promptMode } = usePromptMode();

    const play = () => {
        setPromptsRequests([...promptsRequests, userPromptRequest])
    }

    return (
        <ActionIcon
            variant="filled"
            color={getPromptModeColor(promptMode)}
            size="lg"
            pos={"absolute"}
            right={"25px"}
            onClick={play}
        >
            <IconPlayerPlayFilled size={16} stroke={1.5} />
        </ActionIcon>
    )
}