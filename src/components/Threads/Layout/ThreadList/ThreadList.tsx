import { Box, Stack } from "@mantine/core";
import { usePromptsRequests } from "../../../../context/PromptsRequestsContext";
import { PromptRequest, PromptRequestType } from "../../../../model/PromptRequest";
import { ThreadItem } from "../ThreadItem/ThreadItem";
import { useScrollIntoView } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { usePromptQuery } from "../../../../api/promptsApi";
import { Prompt } from "../../../../model/Prompt";

export function ThreadList() {
    const { promptsRequests, setPromptsRequests } = usePromptsRequests();
    const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();
    
    const [urlPromptId, setUrlPromptId] = useState(0);
    const {data: urlPrompt} = usePromptQuery(urlPromptId);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const promptId = params.get('prompt_id');

        if (promptId && !isNaN(parseInt(promptId))) {
            setUrlPromptId(parseInt(promptId));

            if (urlPrompt) {
                const newPromptRequest = Prompt.clone(urlPrompt) as PromptRequest;
                newPromptRequest.key = Date.now();
                newPromptRequest.isPlayable = true;
                newPromptRequest.type = PromptRequestType.Prompt;
        
                setPromptsRequests([
                    ...promptsRequests,
                    newPromptRequest
                ]);
            }
          }
    }, [urlPrompt])

    return (
        <Stack gap={"xl"} my={"xs"}>
            {
                promptsRequests.map((promptRequest: PromptRequest) => <ThreadItem
                    key={promptRequest.key}
                    promptRequest={promptRequest}
                    scrollIntoView={scrollIntoView}
                />)
            }
            <Box ref={targetRef}>
                {/* <ThreadsScrollToBottom /> */}
            </Box>
        </Stack>
    )
}