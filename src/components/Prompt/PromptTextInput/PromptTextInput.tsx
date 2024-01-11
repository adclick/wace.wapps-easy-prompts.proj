import { Textarea } from "@mantine/core";
import { usePromptsRequests } from "../../../context/PromptsRequestsContext";
import { PromptRequest } from "../../../model/PromptRequest";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import { KeyboardEvent } from "react";

export function PromptTextInput() {
    const { userPromptRequest, setUserPromptRequest } = useUserPromptRequest();
    const { promptsRequests, setPromptsRequests } = usePromptsRequests();

    const updateUserRequestText = (value: string) => {
        const newUserRequest = PromptRequest.clone(userPromptRequest);
        newUserRequest.key = Date.now();
        newUserRequest.title = value;
        newUserRequest.content = value;
        setUserPromptRequest(newUserRequest);
    }

    const play = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.code === "Enter" && e.shiftKey === false) {
            setPromptsRequests([...promptsRequests, userPromptRequest])
            updateUserRequestText("");
            e.preventDefault();
        }
    }

    return (
        <Textarea
            placeholder={"Craft a new prompt"}
            autosize
            autoFocus
            minRows={1}
            maxRows={6}
            w={"100%"}
            size={'lg'}
            styles={{
                input: {
                    paddingLeft: "60px",
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