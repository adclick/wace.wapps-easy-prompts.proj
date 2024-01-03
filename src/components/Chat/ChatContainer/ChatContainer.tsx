import { Box, Stack } from "@mantine/core";
import { ChatRequest } from "../ChatRequest/ChatRequest";
import { useRequests } from "../../../context/RequestsContext";
import { Request } from "../../../model/Request";

export function ChatContainer() {
    const { requests } = useRequests();

    return (
        <Stack gap={"md"} my={"xs"}>
            {
                requests.map((request: Request, index: number) => {
                    return (
                        <Box key={request.timestamp}>
                            <ChatRequest request={request} />
                        </Box>
                    )
                })
            }
        </Stack>
    )
}