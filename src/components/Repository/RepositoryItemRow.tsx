import { SimpleGrid, Popover, Card, Divider, Accordion, AccordionControl, AccordionItem, ActionIcon, Badge, Box, Button, Group, Menu, Rating, Stack, Text, Tooltip, rem, Collapse, Chip, Paper } from "@mantine/core";
import { IconArrowRight, IconDotsVertical, IconInfoCircle, IconPencil, IconPlayerPlayFilled, IconPrompt, IconShare, IconSparkles, IconTemplate, IconTrash, IconUser, IconUsers, IconUsersGroup } from "@tabler/icons-react";
import { RepositoryItem } from "../../model/RepositoryItem";
import { AIMediatorClient } from "../../clients/AIMediatorClient";
import { Thread } from "../../model/Thread";
import { UserPromptOptions } from "../../model/UserPromptOptions";
import { useFilters } from "../../context/FiltersContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelectedFilters } from "../../context/SelectedFiltersContext";
import { Technology } from "../../model/Technology";

interface RepositoryItemRow {
    navbarToggle: any,
    repositoryItem: RepositoryItem,
    repositorySelectedItems: RepositoryItem[],
    setRepositorySelectedItems: any,
    aiMediatorClient: AIMediatorClient,
    refreshRepository: any,
    openRepositoryItemDetailsSelected: any,
    threads: Thread[]
    setThreads: any
}

export function RepositoryItemRow({
    navbarToggle,
    repositoryItem,
    setRepositorySelectedItems,
    aiMediatorClient,
    refreshRepository,
    threads,
    setThreads
}: RepositoryItemRow) {
    const { selectedFilters } = useSelectedFilters();
    const { user } = useAuth0();

    const use = (e: any) => {
        switch (repositoryItem.type) {
            case "prompt":
                const options = new UserPromptOptions();
                options.technology.name = repositoryItem.technology_name;
                options.technology.slug = repositoryItem.technology_slug;
                options.provider.name = repositoryItem.provider_name;
                options.provider.slug = repositoryItem.provider_slug;

                const thread = new Thread();
                thread.request.setText(repositoryItem.content);
                thread.request.userPromptOptions = options;
                if (repositoryItem.modifiers.length > 0) {
                    thread.request.repositoryItems = [RepositoryItem.buildFromModifier(repositoryItem.modifiers[0])];
                }
                setThreads([...threads, thread]);
                break;
            case "template":
            case "modifier":
                setRepositorySelectedItems([repositoryItem]);
                break;
        }

        navbarToggle();
        e.stopPropagation();
    }

    const deleteItem = async () => {
        await aiMediatorClient.deleteRepositoryItem(repositoryItem);

        refreshRepository(selectedFilters);
    }

    const date = new Date(repositoryItem.created_at);

    const created_at = date.toLocaleString();

    const userOwnsItem = user?.sub === repositoryItem.user_id;

    return (
        <Accordion.Item value={`${repositoryItem.type}-${repositoryItem.id}`}>
            <Accordion.Control>
                <Stack>
                    <Group justify="space-between" wrap="nowrap" align="flex-start">
                        <Stack gap={0}>
                            <Badge size="xs" variant="dot" px={0} color={repositoryItem.color}>
                                {repositoryItem.type}
                            </Badge>
                            <Text size="sm" fw={500} lineClamp={20}>
                                {repositoryItem.name}
                            </Text>
                        </Stack>
                        {
                            user !== undefined
                            && user.sub === repositoryItem.user_id
                            && <Menu>
                                <Menu.Target>
                                    <ActionIcon onClick={e => e.stopPropagation()} variant="subtle" color="gray">
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
                                        onClick={deleteItem}
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
                            {
                                repositoryItem.repository_slug === 'wace'
                                    ? <Tooltip label={repositoryItem.repository_name}>
                                        <IconUsersGroup size={14} />
                                    </Tooltip>
                                    :
                                    <Tooltip label={repositoryItem.repository_name}>
                                        <IconUser size={14} />
                                    </Tooltip>
                            }

                            {
                                <Tooltip label={repositoryItem.technology_name}>
                                    {
                                        Technology.getIcon(repositoryItem.technology_slug, 14)
                                    }
                                </Tooltip>
                            }

                        </Group>
                        {/* <Rating size="xs" readOnly color={"blue"} value={repositoryItem.score * 5 / 100} /> */}
                        <Group>
                            {/* <ActionIcon variant="transparent">
                                {
                                    repositoryItem.repository_slug !== "wace"
                                        ? <IconUser size={14} />
                                        : <IconUsersGroup size={14} />
                                }
                            </ActionIcon> */}
                            <ActionIcon component="a" color={repositoryItem.color} variant="filled" size={"md"} onClick={(e: any) => use(e)}>
                                <IconPlayerPlayFilled style={{ width: '50%', height: '50%' }} stroke={1.5} />
                            </ActionIcon>
                        </Group>
                    </Group>
                </Stack>
            </Accordion.Control >

            <Accordion.Panel>
                <Stack>
                    {
                        repositoryItem.type === "modifier"
                            ? <Stack>
                                <Text size="xs">{repositoryItem.description}</Text>
                                {
                                    userOwnsItem &&
                                    <Text size="xs">{repositoryItem.content}</Text>
                                }
                            </Stack>
                            : <Stack>
                                <Text size="xs">{repositoryItem.content}</Text>
                            </Stack>
                    }
                    {
                        repositoryItem.modifiers.length > 0
                        && <Stack>
                            <Text size="xs">Modifiers</Text>
                            {
                                repositoryItem.modifiers.map(m => {
                                    return (
                                        <Chip key={m.id} color={RepositoryItem.getColor('modifier')} variant="light" readOnly checked size="xs">
                                            {m.name}
                                        </Chip>
                                    )
                                })
                            }
                        </Stack>
                    }

                    <Group justify="space-between">
                        <Group gap={"xs"}>
                            <IconUser size={12} />
                            <Text size="xs" c="gray.6">{repositoryItem.username}</Text>
                        </Group>
                        <Text size="xs" c="gray.6">{created_at}</Text>
                    </Group>
                </Stack>
            </Accordion.Panel>

        </Accordion.Item >
    )
}