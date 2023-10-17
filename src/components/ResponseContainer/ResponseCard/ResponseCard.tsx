import { ActionIcon, Avatar, Card, CopyButton, Group, Menu, Stack, Text, Tooltip, rem, useMantineTheme } from "@mantine/core";
import { IconCheck, IconCopy, IconDeviceFloppy, IconDots, IconShare, IconThumbDown, IconThumbUp, IconTrash } from "@tabler/icons-react";

interface Params {
    result: string;
}

export function ResponseCard({ result }: Params) {
    const theme = useMantineTheme();

    return (
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
    )
}