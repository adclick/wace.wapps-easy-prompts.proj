import { Stack } from "@mantine/core";
import { useUser } from "../../../context/UserContext";
import { PromptRequest } from "../../../model/PromptRequest";
import { textGeneration } from "../../../api/aiApi";
import { useEffect, useState } from "react";
import { usePromptsRequests } from "../../../context/PromptsRequestsContext";
import { ThreadRequest } from "../ThreadRequest/ThreadRequest";
import { ThreadResponse } from "../ThreadResponse/ThreadResponse";
import { ThreadFooter } from "../ThreadFooter/ThreadFooter";

interface TextGenerationThread {
    promptRequest: PromptRequest,
}

export function TextGenerationThread({ promptRequest }: TextGenerationThread) {
    const { user } = useUser();
    const { promptsRequests, setPromptsRequests } = usePromptsRequests();
    const [response, setResponse] = useState<any>(false);

    useEffect(() => {
        if (response) return;
        fetch();
    });

    const fetch = async () => {
        const response = await textGeneration(promptRequest);

        setResponse(response.trim())

        // Update request list
        const newRequest = PromptRequest.clone(promptRequest);
        newRequest.response = response;
        promptsRequests[promptRequest.key] = newRequest;
        setPromptsRequests(promptsRequests);
    }

    return (
        <Stack gap={"xl"}>
            {
                !promptRequest.isPlayable && <ThreadRequest request={promptRequest.title} user={user} />
            }
            <ThreadResponse response={response} />
            <ThreadFooter promptRequest={promptRequest} />
        </Stack>
    )
}