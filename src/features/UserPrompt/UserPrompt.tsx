import { FC, KeyboardEvent } from "react";
import { PromptRequest } from "../../models/PromptRequest";
import { Textarea } from "../../components/UI/Inputs/Textarea";
import { IconButton } from "../../components/UI/Buttons/IconButton";
import { IconPlay } from "../../icons";
import classes from "./UserPrompt.module.css";
import { FlexRow } from "../../components/UI/Layout";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../stores/store";
import { Size, Variant } from "../../enums";

const UserPrompt: FC = () => {
    const [
        promptsRequests,
        selectedModifiers,
        selectedTemplates,
        userPromptRequest,
        setPromptsRequests,
        setUserPromptRequest
    ] = useStore(useShallow(state => [
        state.promptsRequests,
        state.selectedModifiers,
        state.selectedTemplates,
        state.userPromptRequest,
        state.setPromptsRequests,
        state.setUserPromptRequest
    ]));


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
        <FlexRow>
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
        </FlexRow>
    )
}

export default UserPrompt;