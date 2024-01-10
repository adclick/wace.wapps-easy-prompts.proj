import { Group, Image, Stack, Text } from "@mantine/core";
import { useUser } from "../../../context/UserContext";
import { PromptRequest } from "../../../model/PromptRequest";
import { imageGeneration } from "../../../api/aiApi";
import { useEffect, useState } from "react";
import { usePromptsRequests } from "../../../context/PromptsRequestsContext";
import { ThreadRequest } from "../ThreadRequest/ThreadRequest";
import { ThreadResponse } from "../ThreadResponse/ThreadResponse";
import { ThreadFooter } from "../ThreadFooter/ThreadFooter";

interface ImageGenerationThread {
    promptRequest: PromptRequest,
}

export function ImageGenerationThread({ promptRequest }: ImageGenerationThread) {
    const { user } = useUser();
    const { promptsRequests, setPromptsRequests } = usePromptsRequests();
    const [response, setResponse] = useState<any>(false);

    useEffect(() => {
        if (response) return;
        fetch();
    });

    const fetch = async () => {
        const response = await imageGeneration(promptRequest);

        if (typeof response === "string") {
            setResponse(response)
        } else {
            setResponse(<Group>{response.map(image => <Image key={image} src={image} />)}</Group>)
        }

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