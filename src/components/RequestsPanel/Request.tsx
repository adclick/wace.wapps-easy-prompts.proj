import { PromptOptions } from "@/model/PromptOptions"
import { UserPromptOptions } from "@/model/UserPromptOptions"
import { useAuth0 } from "@auth0/auth0-react"
import { ActionIcon, Avatar, Card, Chip, CopyButton, Group, Menu, Stack, Text, Tooltip, rem } from "@mantine/core"
import { IconCheck, IconCopy, IconDeviceFloppy, IconDots, IconMoodSad, IconMoodSmile, IconShare, IconThumbDown, IconThumbUp } from "@tabler/icons-react"

interface RequestParams {
    userPrompt: string,
    userPrmptOptions: UserPromptOptions,
    result: string
}

export interface Request {
    id: number
    userPrompt: string,
    userPromptOptions: UserPromptOptions
    result: any
}

export function Request({ userPrompt, userPrmptOptions, result }: RequestParams) {
    const { user } = useAuth0();

    return (
        <Stack my={"xl"}>
            <Card radius={"0"} shadow="sm">
                <Group>
                    <Avatar src={user?.picture} size={"sm"} />
                    <Text c="dimmed" size="sm">
                        {userPrompt}
                    </Text>
                </Group>
                <Card.Section withBorder inheritPadding py={"xs"} mt={"md"}>
                    <Group>
                        <Text size="xs">
                            {userPrmptOptions.responseType} by {userPrmptOptions.provider}
                        </Text>
                    </Group>
                </Card.Section>
            </Card>
            <Card shadow="sm" radius="0">
                <Group justify="space-between">
                    <Group>
                        <Avatar variant="white" size={"sm"} src={null} alt="no image here" />
                        <Text c="dimmed" size="sm">
                            {result}
                        </Text>
                    </Group>
                    <Menu withinPortal position="bottom-end" shadow="sm">
                        <Menu.Target>
                            <ActionIcon variant="subtle" color="gray">
                                <IconDots style={{ width: rem(16), height: rem(16) }} />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item leftSection={<IconDeviceFloppy style={{ width: rem(14), height: rem(14) }} />}>
                                Save
                            </Menu.Item>
                            <Menu.Item leftSection={<IconShare style={{ width: rem(14), height: rem(14) }} />}>
                                Share
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>

                <Card.Section withBorder inheritPadding py={"xs"} mt={"md"}>
                    <Group justify='flex-end'>
                        <ActionIcon color='red' variant='subtle'>
                            <IconMoodSad size={"18"} />
                        </ActionIcon>
                        <ActionIcon variant='subtle'>
                            <IconMoodSmile size={"18"} />
                        </ActionIcon>
                        <CopyButton value={result} timeout={2000}>
                            {({ copied, copy }) => (
                                <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                                    <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                                        {copied ? (
                                            <IconCheck size={18} />
                                        ) : (
                                            <IconCopy size={18} />
                                        )}
                                    </ActionIcon>
                                </Tooltip>
                            )}
                        </CopyButton>
                    </Group>
                </Card.Section>
            </Card>
        </Stack>
    )
}