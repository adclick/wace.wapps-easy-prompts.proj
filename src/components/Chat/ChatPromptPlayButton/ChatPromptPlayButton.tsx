import { ActionIcon } from "@mantine/core";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { usePromptsRequests } from "../../../context/PromptsRequestsContext";

export function ChatPromptPlayButton() {
    const { promptsRequests, setPromptsRequests } = usePromptsRequests();
    const { userPromptRequest } = useUserPromptRequest();

    const play = () => {
        setPromptsRequests([...promptsRequests, userPromptRequest])
    }

    return (
        <ActionIcon
            variant="filled"
            size="lg"
            pos={"absolute"}
            right={"25px"}
            onClick={play}
        >
            <IconPlayerPlayFilled size={16} stroke={1.5} />
        </ActionIcon>
    )
}