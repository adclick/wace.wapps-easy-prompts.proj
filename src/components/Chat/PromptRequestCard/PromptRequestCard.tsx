import { Avatar, Card, Group, Stack, Text } from "@mantine/core";
import { useUser } from "../../../context/UserContext";
import favicon from "../../../favicon.svg";
import { PromptRequestCardResponse } from "../PromptRequestCardResponse/PromptRequestCardResponse";
import { PromptRequest } from "../../../model/PromptRequest";

interface PromptRequestCard {
    promptRequest: PromptRequest,
}

export function PromptRequestCard({ promptRequest }: PromptRequestCard) {
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
                    <PromptRequestCardResponse promptRequest={promptRequest} />
                </Stack>
            </Stack>
        </Card>
    )
}