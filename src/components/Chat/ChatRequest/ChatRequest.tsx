import { Avatar, Card, Group, Stack, Text } from "@mantine/core";
import { Request } from "../../../model/Request";
import { useUser } from "../../../context/UserContext";
import favicon from "../../../favicon.svg";
import { ChatRequestResponse } from "../ChatRequestResponse/ChatRequestResponse";

interface ChatRequest {
    request: Request,
}

export function ChatRequest({ request }: ChatRequest) {
    const { user } = useUser();

    return (
        <Card p={"md"} shadow="sm">
            <Stack gap={"lg"}>
                <Stack py={"xs"}>
                    <Group>
                        <Avatar src={user.picture} size={"sm"} />
                        <Text>{user.username}</Text>
                    </Group>
                    <Text style={{ whiteSpace: "pre-line" }}>
                        {request.title}
                    </Text>
                </Stack>
                <Stack>
                    <Group>
                        <Avatar variant="white" size={"sm"} src={favicon} alt="no image here" />
                        <Text>EasyPrompts</Text>
                    </Group>
                    <ChatRequestResponse request={request} />
                </Stack>
            </Stack>
        </Card>
    )
}