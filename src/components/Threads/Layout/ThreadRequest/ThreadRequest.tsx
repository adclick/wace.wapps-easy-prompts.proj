import { Avatar, Group, Stack, Text } from "@mantine/core"
import { User } from "../../../../models/User"

interface ThreadRequest {
    request: string,
}

export function ThreadRequest({ request }: ThreadRequest) {
    return (
        <Group align="flex-start" wrap="nowrap">
            <Avatar src={null} size={"sm"} />
            <Stack gap={"xs"}>
                <Text size="sm" fw={700}>User</Text>
                <Text size="sm" style={{ whiteSpace: "pre-line" }}>
                    {request}
                </Text>
            </Stack>
        </Group>
    )
}