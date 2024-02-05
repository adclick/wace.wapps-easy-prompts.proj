import { ActionIcon } from "@mantine/core";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { usePromptsRequests } from "../../../context/PromptsRequestsContext";
import { PromptRequest } from "../../../models/PromptRequest";

export function PromptPlayButton() {
    const { promptsRequests, setPromptsRequests } = usePromptsRequests();
    const { userPromptRequest, setUserPromptRequest } = useUserPromptRequest();

    const play = () => {
        setPromptsRequests([...promptsRequests, userPromptRequest]);
        
        const newUserRequest = PromptRequest.clone(userPromptRequest);
        newUserRequest.content = "";
        setUserPromptRequest(newUserRequest);
    }

    return (
        <ActionIcon
            variant="filled"
            size="lg"
            pos={"absolute"}
            right={"23px"}
            onClick={play}
        >
            <IconPlayerPlayFilled size={16} stroke={1.5} />
        </ActionIcon>
    )
}