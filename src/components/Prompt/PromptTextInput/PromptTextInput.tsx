import { Textarea } from "@mantine/core";
import { usePromptsRequests } from "../../../context/PromptsRequestsContext";
import { PromptRequest } from "../../../model/PromptRequest";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { KeyboardEvent } from "react";
import { useSelectedModifiers } from "../../../context/SelectedModifiersContext";
import classes from './PromptTextInput.module.css';
import { usePromptMode } from "../../../context/PromptModeContext";
import { useSelectedTemplates } from "../../../context/SelectedTemplatesContext";

export function PromptTextInput() {
    const { userPromptRequest, setUserPromptRequest } = useUserPromptRequest();
    const { promptsRequests, setPromptsRequests } = usePromptsRequests();
    const { selectedModifiers } = useSelectedModifiers();
    const { selectedTemplates } = useSelectedTemplates();
    const { promptMode } = usePromptMode()

    const updateUserRequestText = (value: string) => {
        const newUserRequest = PromptRequest.clone(userPromptRequest);
        newUserRequest.key = Date.now();
        newUserRequest.title = value;
        newUserRequest.content = value;
        newUserRequest.metadata.modifiers = selectedModifiers;
        setUserPromptRequest(newUserRequest);
    }

    const play = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            setPromptsRequests([...promptsRequests, userPromptRequest])
            updateUserRequestText("");
            e.preventDefault();
        }
    }

    const paddingLeft = selectedModifiers.length > 0 || selectedTemplates.length > 0
        ? "65px"
        : "var(--_input-padding-left"

    return (
        <Textarea
            placeholder={`Start building`}
            autosize
            autoFocus
            minRows={1}
            color="yellow"
            maxRows={6}
            w={"100%"}
            size={'md'}
            classNames={{
                input: classes.input + " " + classes["mode" + promptMode]
            }}
            styles={{
                input: {
                    paddingLeft: paddingLeft,
                    paddingRight: "60px",
                },

            }}
            radius={'xl'}
            value={userPromptRequest.content}
            onChange={e => updateUserRequestText(e.target.value)}
            onKeyDown={e => play(e)}
        />
    )
}