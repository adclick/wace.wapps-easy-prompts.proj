import { Box, Stack } from "@mantine/core";
import { Thread } from "../../../model/Thread";
import { ChatThread } from "../ChatThread/ChatThread";
import { useThreads } from "../../../context/ThreadsContext";

export function ChatContainer() {
    const { threads } = useThreads();

    return (
        <Stack gap={"md"} my={"xs"}>
            {
                threads.map((thread: Thread, index: number) => {
                    return (
                        <Box key={thread.id}>
                            <ChatThread thread={thread} />
                        </Box>
                    )
                })
            }
        </Stack>
    )
}