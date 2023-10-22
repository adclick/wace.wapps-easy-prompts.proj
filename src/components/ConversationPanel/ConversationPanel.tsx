import { Stack } from "@mantine/core";
import { Thread } from "../Threads/Thread";

interface ConversationPanelParams {
    threads: Thread[]
}

export function ConversionPanel({ threads }: ConversationPanelParams) {
    return (
        threads.map(thread => {
            return (
                <Stack>
                    {thread}
                </Stack>
            )
        })
    )
}