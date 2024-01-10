import { Stack } from "@mantine/core";
import { usePromptsRequests } from "../../../context/PromptsRequestsContext";
import { PromptRequest } from "../../../model/PromptRequest";
import { ThreadItem } from "../ThreadItem/ThreadItem";

export function ThreadList() {
    const { promptsRequests } = usePromptsRequests();

    return (
        <Stack gap={"xl"} my={"xs"}>
            {
                promptsRequests.map((promptRequest: PromptRequest) => <ThreadItem key={promptRequest.key} promptRequest={promptRequest} />)
            }
        </Stack>
    )
}