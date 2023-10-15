import { ActionIcon, Avatar, Card, Group, Menu, Text, rem } from "@mantine/core";
import { IconCopy, IconDeviceFloppy, IconDots, IconShare, IconThumbDown, IconThumbUp, IconTrash } from "@tabler/icons-react";

export function ResponseCard() {
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat, risus ac efficitur pretium, sapien ipsum volutpat massa, a laoreet leo neque sed nibh. Integer finibus, justo eget tincidunt interdum, metus mauris aliquet diam, non rutrum justo nulla eget urna. Fusce in commodo purus. Nam quis augue varius, tempor tellus at, tempor nisl. Ut aliquet, ex sed fermentum finibus, lorem tortor commodo ex, ac auctor ante urna cursus mauris. Nullam ligula nunc, placerat a iaculis non, volutpat id ipsum. Nullam pretium turpis nisl, cursus pharetra turpis tempor eget.

                Quisque eu suscipit turpis, quis rhoncus dolor. Mauris ac efficitur dui. Morbi non posuere mi. Sed ut nunc vitae nisl sagittis maximus molestie vel sem. Cras luctus aliquet placerat. Aliquam dictum molestie luctus. Aliquam pretium sapien vel odio lobortis, in posuere tortor ultrices.

                Mauris ornare erat nisi. Aliquam erat volutpat. Mauris sed molestie lacus. Etiam sodales pharetra lectus nec accumsan. Nulla quam eros, vestibulum interdum augue ut, feugiat maximus sapien. Vestibulum sodales in justo a euismod. Donec elementum fermentum ante, vel tempus diam mattis ut. Quisque condimentum eu erat sed vulputate. Integer sed tortor posuere odio lobortis congue. Quisque quis porttitor est. Vivamus ac dignissim nulla, sit amet fringilla arcu. Nullam condimentum vitae nunc sit amet aliquet.
            </Text>

            <Card.Section withBorder inheritPadding py={"xs"} mt={"md"}>
                <Group justify='space-between'>
                    <ActionIcon variant='subtle'>
                        <IconCopy size={"18"} />
                    </ActionIcon>
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