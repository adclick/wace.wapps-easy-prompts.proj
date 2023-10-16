import { ActionIcon, Avatar, Card, Group, Menu, Text, rem } from "@mantine/core";
import { IconCopy, IconDeviceFloppy, IconDots, IconShare, IconThumbDown, IconThumbUp, IconTrash } from "@tabler/icons-react";

export interface RequestCard {
    prompt: string
}

export function RequestCard({prompt}: RequestCard) {
    return (
        <Card withBorder shadow="sm" radius="0" my={"xl"}>
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="flex-end">
                    <Avatar src={null} alt="no image here" color="teal" />
                </Group>
            </Card.Section>
            <Text mt="sm" c="dimmed" size="sm">
                {prompt}
            </Text>
        </Card>
    )
}