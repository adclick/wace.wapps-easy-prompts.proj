import { Box, Center, Stack } from "@mantine/core";
import { usePromptsRequests } from "../../../context/PromptsRequestsContext";
import { PromptRequest } from "../../../model/PromptRequest";
import { ThreadItem } from "../ThreadItem/ThreadItem";
import { useScrollIntoView } from "@mantine/hooks";
import { ThreadsScrollToTop } from "../ThreadsScrollToTop/ThreadsScrollToTop";
import { ThreadsScrollToBottom } from "../ThreadsScrollToBottom/ThreadsScrollToBottom";

export function ThreadList() {
    const { promptsRequests } = usePromptsRequests();
    const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({ offset: 100 });

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
                <ThreadsScrollToTop />
            </Box>
        </Stack>
    )
}