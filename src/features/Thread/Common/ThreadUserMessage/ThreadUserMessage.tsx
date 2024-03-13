import { ActionIcon, Avatar, Group, Popover, Stack, Text, Tooltip } from "@mantine/core";
import { FC } from "react";
import { Modifier } from "../../../../models/Modifier";
import { IconSparkles, IconTemplate } from "@tabler/icons-react";
import { Template } from "../../../../models/Template";

interface ThreadUserMessageProps {
    username: string
    userPicture: string
    message: any,
    templates: Template[],
    modifiers: Modifier[]
}

const ThreadUserMessage: FC<ThreadUserMessageProps> = ({
    username,
    userPicture,
    message,
    templates,
    modifiers
}: ThreadUserMessageProps) => {
    return (
        <Group align="flex-start" wrap="nowrap">
            <Avatar src={userPicture} size={"sm"} />
            <Stack gap={"xs"}>
                <Group gap={"xs"}>
                    <Text size="sm" fw={700}>{username}</Text>
                    {
                        templates.length > 0 &&
                        <Popover>
                            <Popover.Target>
                                <Tooltip label={`${templates.length} template(s)`}>
                                    <ActionIcon color="orange" size={"sm"} variant="subtle">
                                        <IconTemplate size={12} />
                                    </ActionIcon>
                                </Tooltip>
                            </Popover.Target>
                            <Popover.Dropdown>
                                <Stack>
                                    {
                                        templates.map(m => <Text key={m.uuid} size="xs">{m.title}</Text>)
                                    }
                                </Stack>
                            </Popover.Dropdown>
                        </Popover>
                    }
                    {
                        modifiers.length > 0 &&
                        <Popover>
                            <Popover.Target>
                                <Tooltip label={`${modifiers.length} modifier(s)`}>
                                    <ActionIcon color="teal" size={"sm"} variant="subtle">
                                        <IconSparkles size={12} />
                                    </ActionIcon>
                                </Tooltip>
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