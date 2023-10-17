import { ActionIcon, Avatar, Card, Group, Menu, Stack, Text, rem } from "@mantine/core";
import { IconCopy, IconDeviceFloppy, IconDots, IconShare, IconThumbDown, IconThumbUp, IconTrash } from "@tabler/icons-react";

export interface RequestCard {
    prompt: string
}

export function RequestCard({ prompt }: RequestCard) {
    return (
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
    )
}