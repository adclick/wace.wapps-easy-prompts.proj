import { ActionIcon, Avatar, Card, CopyButton, Group, Stack, Text, Tooltip, rem } from "@mantine/core"
import { IconCheck, IconCopy, IconThumbDown, IconThumbUp } from "@tabler/icons-react"

interface RequestParams {
    prompt: string,
    result: string
}

export interface Request {
    id: number
    prompt: string,
    result: string
}

export function Request({ prompt, result }: RequestParams) {
    return (
        <Stack my={"xl"} gap={0}>
            <Card withBorder shadow="sm" radius="0">
                <Stack>
                    <Group justify="flex-end">
                        <Text>You</Text>
                        <Avatar src={null} alt="no image here" />
                    </Group>
                    <Text mt="sm" c="dimmed" size="sm">
                        {prompt}
                    </Text>
                </Stack>
            </Card>
            <Card withBorder shadow="sm" radius="0">
                <Stack>
                    <Group>
                        <Avatar variant="" src={null} alt="no image here" />
                        <Text>AI Assistant</Text>
                    </Group>
                    <Text mt="sm" c="dimmed" size="sm">
                        {result}
                    </Text>
                </Stack>

                <Card.Section withBorder inheritPadding py={"xs"} mt={"md"}>
                    <Group justify='space-between'>
                        <CopyButton value="https://mantine.dev" timeout={2000}>
                            {({ copied, copy }) => (
                                <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                                    <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                                        {copied ? (
                                            <IconCheck style={{ width: rem(16) }} />
                                        ) : (
                                            <IconCopy style={{ width: rem(16) }} />
                                        )}
                                    </ActionIcon>
                                </Tooltip>
                            )}
                        </CopyButton>
                        <Group justify='flex-end'>
                            <ActionIcon color='red' variant='subtle'>
                                <IconThumbDown size={"18"} />
                            </ActionIcon>
                            <ActionIcon variant='subtle'>
                                <IconThumbUp size={"18"} />
                            </ActionIcon>
                        </Group>
                    </Group>
                </Card.Section>
            </Card>
        </Stack>
    )
}