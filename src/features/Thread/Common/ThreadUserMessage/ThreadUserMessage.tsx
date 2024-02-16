import { Avatar, Group, Stack, Text } from "@mantine/core";
import { FC } from "react";

interface ThreadUserMessageProps {
    userPicture: string
    message: any
}

const ThreadUserMessage: FC<ThreadUserMessageProps> = ({
    userPicture,
    message
}: ThreadUserMessageProps) => {
    return (
        <Group align="flex-start" wrap="nowrap">
            <Avatar src={userPicture} size={"sm"} />
            <Stack gap={"xs"}>
                <Text size="sm" fw={700}>User</Text>
                <Text size="sm" style={{ whiteSpace: "pre-line" }}>
                    {message}
                </Text>
            </Stack>
        </Group>
    )
}

export default ThreadUserMessage;