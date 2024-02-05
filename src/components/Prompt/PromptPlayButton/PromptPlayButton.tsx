import { Box } from "@mantine/core";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { usePromptsRequests } from "../../../context/PromptsRequestsContext";
import { PromptRequest } from "../../../models/PromptRequest";
import { ButtonIconUI } from "../../UI/ButtonIcon";
import classes from "./PromptPlayButton.module.css";

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
        <ButtonIconUI
            variant="filled"
            size="lg"
            onClick={play}
            icon={<IconPlayerPlayFilled size={16} stroke={1.5} />}
            className={classes.playButton}
        />
    )
}