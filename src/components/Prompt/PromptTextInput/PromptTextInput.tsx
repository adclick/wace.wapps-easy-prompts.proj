import { Textarea } from "@mantine/core";
import { usePromptsRequests } from "../../../context/PromptsRequestsContext";
import { PromptRequest } from "../../../model/PromptRequest";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { KeyboardEvent } from "react";
import { useSelectedModifiers } from "../../../context/SelectedModifiersContext";
import { useSelectedTemplate } from "../../../context/SelectedTemplateContext";
import classes from './PromptTextInput.module.css';

export function PromptTextInput() {
    const { userPromptRequest, setUserPromptRequest } = useUserPromptRequest();
    const { promptsRequests, setPromptsRequests } = usePromptsRequests();
    const { selectedModifiers } = useSelectedModifiers();
    const {selectedTemplate } = useSelectedTemplate();

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

    const paddingLeft = selectedModifiers.length > 0 || selectedTemplate.id > 0
        ? "70px"
        : "var(--_input-padding-left"

    return (
        <Textarea
            placeholder={"Craft a new prompt"}
            autosize
            autoFocus
            minRows={1}
            maxRows={6}
            w={"100%"}
            size={'lg'}
            classNames={{
                input: classes.input
            }}
            styles={{
                input: {
                    paddingLeft: paddingLeft,
                    paddingRight: "50px",
                },

            }}
            radius={'xl'}
            value={userPromptRequest.content}
            onChange={e => updateUserRequestText(e.target.value)}
            onKeyDown={e => play(e)}
        />
    )
}