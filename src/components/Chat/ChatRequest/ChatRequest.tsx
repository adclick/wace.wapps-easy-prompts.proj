import { Avatar, Card, Group, Stack, Text } from "@mantine/core";
import { useUser } from "../../../context/UserContext";
import favicon from "../../../favicon.svg";
import { ChatRequestResponse } from "../ChatRequestResponse/ChatRequestResponse";
import { PromptRequest } from "../../../model/PromptRequest";

interface ChatRequest {
    promptRequest: PromptRequest,
}

export function ChatRequest({ promptRequest }: ChatRequest) {
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
                        {promptRequest.title}
                    </Text>
                </Stack>
                <Stack>
                    <Group>
                        <Avatar variant="white" size={"sm"} src={favicon} alt="no image here" />
                        <Text>EasyPrompts</Text>
                    </Group>
                    <ChatRequestResponse promptRequest={promptRequest} />
                </Stack>
            </Stack>
        </Card>
    )
}