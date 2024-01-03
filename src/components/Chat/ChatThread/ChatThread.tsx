import { Avatar, Card, Group, Loader, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { Thread } from "../../../model/Thread";
import { useUser } from "../../../context/UserContext";

interface ChatThread {
    thread: Thread,
}

export function ChatThread({
    thread,
}: ChatThread) {
    if (thread.requests.length === 0) return <></>;
    // We only support 1 request per thread for now
    const request = thread.requests[0];
    const { user } = useUser();

    const [result, setResult] = useState(<Loader size={"sm"} type="dots" />);

    return (
        <Card p={"md"} shadow="sm">
            <Stack gap={0}>
                <Stack py={"xs"}>
                    <Avatar src={user.picture} size={"sm"} />
                    <Text size="md" style={{ whiteSpace: "pre-line" }}>
                        {request.text}
                    </Text>
                </Stack>
                <Group py={"xl"} px={0} justify="space-between" wrap="wrap" align="flex-start" gap={"xl"}>
                    <Stack align="flex-start">
                        <Avatar variant="white" size={"sm"} src={null} alt="no image here" />
                        {request.response}
                    </Stack>
                </Group>
            </Stack>
        </Card>
    )
}