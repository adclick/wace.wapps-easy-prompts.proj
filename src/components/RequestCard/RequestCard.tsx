import { ActionIcon, Avatar, Card, Group, Menu, Text, rem } from "@mantine/core";
import { IconCopy, IconDeviceFloppy, IconDots, IconShare, IconThumbDown, IconThumbUp, IconTrash } from "@tabler/icons-react";

export function RequestCard() {
    return (
        <Card withBorder shadow="sm" radius="0" my={"xl"}>
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="flex-end">
                    <Avatar src={null} alt="no image here" color="teal" />
                </Group>
            </Card.Section>
            <Text mt="sm" c="dimmed" size="sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat, risus ac efficitur pretium, sapien ipsum volutpat massa, a laoreet leo neque sed nibh. Integer finibus, justo eget tincidunt interdum, metus mauris aliquet diam, non rutrum justo nulla eget urna. Fusce in commodo purus. Nam quis augue varius, tempor tellus at, tempor nisl. Ut aliquet, ex sed fermentum finibus, lorem tortor commodo ex, ac auctor ante urna cursus mauris. Nullam ligula nunc, placerat a iaculis non, volutpat id ipsum. Nullam pretium turpis nisl, cursus pharetra turpis tempor eget.
            </Text>
        </Card>
    )
}