import { Avatar, Group, Stack, Text } from "@mantine/core"
import { User } from "../../../../models/User"

interface ThreadRequest {
    request: string,
    user: User
}

export function ThreadRequest({ request, user }: ThreadRequest) {
    return (
        <Group align="flex-start" wrap="nowrap">
            <Avatar src={user.picture} size={"sm"} />
            <Stack gap={"xs"}>
                <Text size="sm" fw={700}>{user.username}</Text>
                <Text size="sm" style={{ whiteSpace: "pre-line" }}>
                    {request}
                </Text>
            </Stack>
        </Group>
    )
}