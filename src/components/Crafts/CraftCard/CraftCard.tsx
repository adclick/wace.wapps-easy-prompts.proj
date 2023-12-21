import { SimpleGrid, Popover, Card, Divider, Accordion, AccordionControl, AccordionItem, ActionIcon, Badge, Box, Button, Group, Menu, Rating, Stack, Text, Tooltip, rem, Collapse, Chip, Paper } from "@mantine/core";
import { IconArrowRight, IconDotsVertical, IconInfoCircle, IconLock, IconPencil, IconPlayerPlayFilled, IconPrompt, IconShare, IconSparkles, IconTemplate, IconTrash, IconUser, IconUsers, IconUsersGroup } from "@tabler/icons-react";
import { AIMediatorClient } from "../../../clients/AIMediatorClient";
import { Thread } from "../../../model/Thread";
import { UserPromptOptions } from "../../../model/UserPromptOptions";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelectedFilters } from "../../../context/SelectedFiltersContext";
import { Technology } from "../../../model/Technology";
import { Repository } from "../../../model/Repository";
import { notifications } from "@mantine/notifications";
import { Language } from "../../../model/Language";
import { Craft } from "../../../model/Craft";

interface CraftCard {
    craft: Craft,
}

export function CraftCard({
    craft,
}: CraftCard) {
    const { selectedFilters } = useSelectedFilters();
    const { user } = useAuth0();


    const use = (e: any) => {
        e.stopPropagation();
    }

    const deleteItem = async (e: any) => {
        e.stopPropagation();
    }

    const date = new Date(craft.created_at);

    const created_at = date.toLocaleString();

    return (
        <Accordion.Item value={`${craft.type}-${craft.id}`}>
            <Accordion.Control>
                <Stack>
                    <Group justify="space-between" wrap="nowrap" align="flex-start">
                        <Stack gap={0}>
                            <Badge size="xs" variant="dot" px={0}>
                                {craft.type}
                            </Badge>
                            <Text size="sm" fw={500} lineClamp={20}>
                                {craft.name}
                            </Text>
                        </Stack>
                        {
                            user !== undefined
                            && <Menu>
                                <Menu.Target>
                                    <ActionIcon component="a" onClick={e => e.stopPropagation()} variant="subtle" color="gray">
                                        <IconDotsVertical style={{ width: rem(16), height: rem(16) }} />
                                    </ActionIcon>
                                </Menu.Target>

                                <Menu.Dropdown>
                                    <Menu.Item
                                        disabled
                                        leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />}
                                    >
                                        Edit
                                    </Menu.Item>
                                    <Menu.Item
                                        onClick={e => deleteItem(e)}
                                        leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                                        color="red"
                                    >
                                        Delete
                                    </Menu.Item>

                                </Menu.Dropdown>
                            </Menu>
                        }
                    </Group>

                    <Group justify="space-between">
                        <Group>
                            <IconLock color={Repository.getColor("private")} size={14} />
                            <IconLock color={Repository.getColor("private")} size={14} />
                        </Group>
                        <Group>
                            <ActionIcon component="a" variant="filled" size={"md"} onClick={(e: any) => use(e)}>
                                <IconPlayerPlayFilled style={{ width: '50%', height: '50%' }} stroke={1.5} />
                            </ActionIcon>
                        </Group>
                    </Group>
                </Stack>
            </Accordion.Control >

            <Accordion.Panel>
                <Stack>
                    {
                        craft.type === "modifier"
                            ? <Stack>
                                <Card>
                                    <Stack gap={"xs"}>
                                        <Text size="xs" fw={500}>Description</Text>
                                        <Text size="xs">{craft.description}</Text>
                                    </Stack>
                                </Card>
                                {
                                    <Card>
                                        <Stack gap={"xs"}>
                                            <Text size="xs" fw={500}>Modifier</Text>
                                            <Text size="xs">{craft.content}</Text>

                                        </Stack>
                                    </Card>
                                }
                            </Stack>
                            :
                            <Card>
                                <Stack gap={"xs"}>
                                    <Text size="xs" fw={500}>Prompt</Text>
                                    <Text size="xs">{craft.content}</Text>
                                </Stack>
                            </Card>
                    }
                    <Card>
                        <Stack gap={"xs"}>
                            <Text size="xs" fw={500}>Details</Text>
                            <SimpleGrid cols={2} verticalSpacing={"xs"}>
                                <Text size="xs">Type</Text>
                                <Text size="xs" fw={500}>{craft.type.toUpperCase()}</Text>
                            </SimpleGrid>
                        </Stack>
                    </Card>
                    <Group justify="space-between">
                        <Group gap={"xs"}>
                            <IconUser size={12} />
                        </Group>
                        <Text size="xs" c="gray.6">{created_at}</Text>
                    </Group>
                </Stack>
            </Accordion.Panel>

        </Accordion.Item >
    )
}