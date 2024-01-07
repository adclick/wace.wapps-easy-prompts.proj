import { Box, Stack } from "@mantine/core";
import { PromptRequestCard } from "../PromptRequestCard/PromptRequestCard";
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
                            <PromptRequestCard promptRequest={promptRequest} />
                        </Box>
                    )
                })
            }
        </Stack>
    )
}