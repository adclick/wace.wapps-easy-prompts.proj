import { ActionIcon } from "@mantine/core";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { usePromptsRequests } from "../../../context/PromptsRequestsContext";
import { usePromptMode } from "../../../context/PromptModeContext";
import { getPromptModeColor } from "../../../model/PromptMode";
import { PromptRequest } from "../../../model/PromptRequest";

export function PromptPlayButton() {
    const { promptsRequests, setPromptsRequests } = usePromptsRequests();
    const { userPromptRequest, setUserPromptRequest } = useUserPromptRequest();
    const { promptMode } = usePromptMode();

    const play = () => {
        setPromptsRequests([...promptsRequests, userPromptRequest]);
        
        const newUserRequest = PromptRequest.clone(userPromptRequest);
        newUserRequest.content = "";
        setUserPromptRequest(newUserRequest);
    }

    return (
        <ActionIcon
            variant="filled"
            color={getPromptModeColor(promptMode)}
            size="md"
            pos={"absolute"}
            right={"23px"}
            onClick={play}
        >
            <IconPlayerPlayFilled size={16} stroke={1.5} />
        </ActionIcon>
    )
}