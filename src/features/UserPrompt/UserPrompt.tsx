import { FC, KeyboardEvent } from "react";
import { PromptRequest } from "../../models/PromptRequest";
import { usePromptsRequests } from "../../context/PromptsRequestsContext";
import { useUserPromptRequest } from "../../context/UserPromptRequestContext";
import { Textarea } from "../../components/UI/Inputs/Textarea";
import { IconButton } from "../../components/UI/Buttons/IconButton";
import { Size, Variant } from "../../utils/uiUtils";
import { useSelectedModifiers } from "../../context/SelectedModifiersContext";
import { useSelectedTemplates } from "../../context/SelectedTemplatesContext";
import { IconPlay } from "../../icons";
import classes from "./UserPrompt.module.css";
import { Row } from "../../components/UI";

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
        setUserPromptRequest(newUserRequest);
    }

    const play = () => {
        userPromptRequest.metadata.modifiers = selectedModifiers;
        userPromptRequest.metadata.templates = selectedTemplates;

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
        <Row>
            <Textarea
                placeholder="Create a new prompt"
                autofocus={true}
                size={Size.lg}
                radius={Size.xl}
                value={userPromptRequest.content}
                onChange={e => updateUserRequestText(e.target.value)}
                onKeyDown={e => onKeyDown(e)}
                className={classes.textarea}
            />
            <IconButton
                variant={Variant.filled}
                size={Size.lg}
                onClick={play}
                icon={<IconPlay size={16} stroke={1.5} />}
                className={classes.playButton}
            />
        </Row>
    )
}

export default UserPrompt;