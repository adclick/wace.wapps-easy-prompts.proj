import { FC, KeyboardEvent } from "react";
import { PromptRequest } from "../../models/PromptRequest";
import { usePromptsRequests } from "../../context/PromptsRequestsContext";
import { useUserPromptRequest } from "../../context/UserPromptRequestContext";
import { Textarea } from "../../components/UI/Inputs/Textarea";
import { IconButton } from "../../components/UI/Buttons/IconButton";
import classes from "./UserPrompt.module.css";
import { Size } from "../../utils/uiUtils";
import IconPlay from "../../icons/IconPlay";
import { FlexH } from "../../components/UI/Layout/Flex";
import { useSelectedModifiers } from "../../context/SelectedModifiersContext";
import { useSelectedTemplates } from "../../context/SelectedTemplatesContext";

const UserPrompt: FC = () => {
    const { userPromptRequest, setUserPromptRequest } = useUserPromptRequest();
    const { promptsRequests, setPromptsRequests } = usePromptsRequests();
    const { selectedModifiers } = useSelectedModifiers();
    const { selectedTemplates } = useSelectedTemplates();

    const updateUserRequestText = (value: string) => {
        const newUserRequest = PromptRequest.clone(userPromptRequest);
        newUserRequest.key = Date.now();
        newUserRequest.title = value;
        newUserRequest.content = value;
        newUserRequest.metadata.modifiers = selectedModifiers;
        newUserRequest.metadata.templates = selectedTemplates;
        setUserPromptRequest(newUserRequest);
    }

    const play = () => {
        setPromptsRequests([...promptsRequests, userPromptRequest]);
        updateUserRequestText("");
    }

    const onKeyDown = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            play();
        }
    }

    return (
        <FlexH>
            <Textarea
                placeholder="Start building"
                autofocus={true}
                size={Size.lg}
                radius={Size.xl}
                value={userPromptRequest.content}
                onChange={e => updateUserRequestText(e.target.value)}
                onKeyDown={e => onKeyDown(e)}
                className={classes.textarea}
            />

            <IconButton
                variant="filled"
                size={Size.lg}
                onClick={play}
                icon={<IconPlay size={16} stroke={1.5} />}
                className={classes.playButton}
            />
        </FlexH>
    )
}

export default UserPrompt;