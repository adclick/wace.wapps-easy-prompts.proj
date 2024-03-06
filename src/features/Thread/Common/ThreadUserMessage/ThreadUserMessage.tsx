import { ActionIcon, Avatar, Group, Popover, Stack, Text } from "@mantine/core";
import { FC } from "react";
import { Modifier } from "../../../../models/Modifier";
import { IconSparkles } from "@tabler/icons-react";

interface ThreadUserMessageProps {
    username: string
    userPicture: string
    message: any,
    modifiers: Modifier[]
}

const ThreadUserMessage: FC<ThreadUserMessageProps> = ({
    username,
    userPicture,
    message,
    modifiers
}: ThreadUserMessageProps) => {
    return (
        <Group align="flex-start" wrap="nowrap">
            <Avatar src={userPicture} size={"sm"} />
            <Stack gap={"xs"}>
                <Group>
                    <Text size="sm" fw={700}>{username}</Text>
                    {
                        modifiers.length > 0 &&
                        <Popover>
                            <Popover.Target>
                                <ActionIcon color="teal" size={"sm"} variant="transparent">
                                    <IconSparkles size={14} />
                                </ActionIcon>
                            </Popover.Target>
                            <Popover.Dropdown>
                                <Stack>
                                    {
                                        modifiers.map(m => <Text key={m.uuid} size="xs">{m.title}</Text>)
                                    }
                                </Stack>
                            </Popover.Dropdown>
                        </Popover>
                    }
                </Group>
                <Text size="sm" style={{ whiteSpace: "pre-line" }}>
                    {message}
                </Text>
            </Stack>
        </Group>
    )
}

export default ThreadUserMessage;