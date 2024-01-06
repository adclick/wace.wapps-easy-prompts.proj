import { Textarea } from "@mantine/core";
import { useRequests } from "../../../context/RequestsContext";
import { usePromptsRequests } from "../../../context/PromptsRequestsContext";
import { PromptRequest } from "../../../model/PromptRequest";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";

export function ChatPromptTextInput() {
    const { requests, setRequests } = useRequests();
    const { userPromptRequest, setUserPromptRequest } = useUserPromptRequest();
    const {promptsRequests, setPromptsRequests} = usePromptsRequests();

    const updateUserRequestText = (value: string) => {
        const newUserRequest = PromptRequest.clone(userPromptRequest);
        newUserRequest.key = promptsRequests.length;
        newUserRequest.title = value;
        newUserRequest.content = value;
        setUserPromptRequest(newUserRequest);
    }

    const play = async (e: any) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            setPromptsRequests([
                ...promptsRequests,
                userPromptRequest
            ])
            updateUserRequestText("");
            e.preventDefault();
        }
    }

    return (
        <Textarea
            placeholder={"write_a_message"}
            autosize
            autoFocus
            minRows={1}
            maxRows={6}
            w={"100%"}
            size={'lg'}
            styles={{
                input: {
                    paddingLeft: "100px",
                    paddingRight: "50px",
                },

            }}
            radius={'xl'}
            value={userPromptRequest.content}
            onChange={e => updateUserRequestText(e.target.value)}
            onKeyDown={play}
        />
    )
}