import { SimpleGrid, Popover, Card, Divider, Accordion, AccordionControl, AccordionItem, ActionIcon, Badge, Box, Button, Group, Menu, Rating, Stack, Text, Tooltip, rem, Collapse, Chip, Paper, Center } from "@mantine/core";
import { IconArrowRight, IconDotsVertical, IconInfoCircle, IconLock, IconPencil, IconPlayerPlayFilled, IconPrompt, IconShare, IconSparkles, IconStarFilled, IconTemplate, IconTrash, IconUser, IconUsers, IconUsersGroup } from "@tabler/icons-react";
import { Craft } from "../../../model/Craft";
import { Technology } from "../../../model/Technology";
import { IconClock } from "@tabler/icons-react";
import { useAuth0 } from "@auth0/auth0-react";
import dateUtils from "../../../utils/dateUtils";

interface CraftCard {
    craft: Craft,
}

export function CraftCard({
    craft,
}: CraftCard) {
    const use = (e: any) => {
        e.stopPropagation();
    }

    return (
        <Accordion.Item value={`${craft.type}-${craft.id}`}>
            <Accordion.Control>
                <Stack>
                    <Group justify="space-between" wrap="nowrap" align="flex-start">
                        <Stack gap={0}>
                            <Badge size="xs" variant="transparent" px={0} color="gray.9">
                                {craft.repositories.name}
                            </Badge>
                            <Text size="sm" fw={500} lineClamp={20}>
                                {craft.name}
                            </Text>
                        </Stack>
                        <ActionIcon variant="transparent" color="gray.9">
                            {
                                Technology.getIcon(craft.technologies.slug, 16)
                            }
                        </ActionIcon>
                    </Group>

                    <Group justify="space-between">
                        <Group>
                            <Group gap={4}>
                                <IconPlayerPlayFilled size={12} />
                                <Text size="xs">{craft.plays}</Text>
                            </Group>
                            <Group gap={4}>
                                <IconStarFilled size={12} />
                                <Text size="xs">{craft.stars}</Text>
                            </Group>
                        </Group>
                        <ActionIcon component="a" variant="filled" size={"md"} onClick={(e: any) => use(e)}>
                            <IconPlayerPlayFilled style={{ width: '50%', height: '50%' }} stroke={1.5} />
                        </ActionIcon>
                    </Group>
                </Stack>
            </Accordion.Control >
            <Accordion.Panel>
                <Stack>
                    <Divider />
                    <Text size="xs">{craft.description}</Text>
                    <Stack gap={"xs"}>
                        <Text size="xs" fw={500}>{craft.type.toUpperCase()}</Text>
                        <Text size="xs" fw={500}>{craft.technologies.name}</Text>
                    </Stack>
                    <Center>
                        <Button variant="transparent" size="xs">
                            Read more
                        </Button>
                    </Center>
                    <Group justify="space-between">
                        <Group gap={"xs"}>
                            <IconUser size={12} />
                            <Text size="xs">{craft.users.username}</Text>
                        </Group>
                        <Group gap={"xs"}>
                            <IconClock size={12} />
                            <Text size="xs" c="gray.9">{dateUtils.timeAgo(new Date(craft.created_at))}</Text>
                        </Group>
                    </Group>
                </Stack>
            </Accordion.Panel>
        </Accordion.Item >
    )
}