import { Box, Stack } from "@mantine/core";
import { ChatRequest } from "../ChatRequest/ChatRequest";
import { usePromptsRequests } from "../../../context/PromptsRequestsContext";
import { PromptRequest } from "../../../model/PromptRequest";

export function ChatContainer() {
    const { promptsRequests } = usePromptsRequests();

    return (
        <Stack gap={"md"} my={"xs"}>
            {
                promptsRequests.map((promptRequest: PromptRequest, index: number) => {
                    return (
                        <Box key={promptRequest.key}>
                            <ChatRequest promptRequest={promptRequest} />
                        </Box>
                    )
                })
            }
        </Stack>
    )
}