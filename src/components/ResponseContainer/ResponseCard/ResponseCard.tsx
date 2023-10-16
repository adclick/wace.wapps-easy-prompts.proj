import { ActionIcon, Avatar, Card, CopyButton, Group, Menu, Text, Tooltip, rem } from "@mantine/core";
import { IconCheck, IconCopy, IconDeviceFloppy, IconDots, IconShare, IconThumbDown, IconThumbUp, IconTrash } from "@tabler/icons-react";

interface Params {
    result: string;
}

export function ResponseCard({ result }: Params) {
    return (
        <Card withBorder shadow="sm" radius="0" my={"lg"}>
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                    <Avatar src={null} alt="no image here" color="teal" />
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
                            <Menu.Item
                                leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                                color="red"
                            >
                                Delete all
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Card.Section>

            <Text mt="sm" c="dimmed" size="sm">
                {result}
            </Text>

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