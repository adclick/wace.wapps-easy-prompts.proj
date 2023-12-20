import { SimpleGrid, Popover, Card, Divider, Accordion, AccordionControl, AccordionItem, ActionIcon, Badge, Box, Button, Group, Menu, Rating, Stack, Text, Tooltip, rem, Collapse, Chip, Paper } from "@mantine/core";
import { IconArrowRight, IconDotsVertical, IconInfoCircle, IconLock, IconPencil, IconPlayerPlayFilled, IconPrompt, IconShare, IconSparkles, IconTemplate, IconTrash, IconUser, IconUsers, IconUsersGroup } from "@tabler/icons-react";
import { RepositoryItem } from "../../../model/RepositoryItem";
import { AIMediatorClient } from "../../../clients/AIMediatorClient";
import { Thread } from "../../../model/Thread";
import { UserPromptOptions } from "../../../model/UserPromptOptions";
import { useFilters } from "../../../context/FiltersContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelectedFilters } from "../../../context/SelectedFiltersContext";
import { Technology } from "../../../model/Technology";
import { Repository } from "../../../model/Repository";
import { notifications } from "@mantine/notifications";
import { Language } from "../../../model/Language";

interface Craft {
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

export function Craft({
    navbarToggle,
    repositoryItem,
    setRepositorySelectedItems,
    aiMediatorClient,
    refreshRepository,
    threads,
    setThreads
}: Craft) {
    const { selectedFilters } = useSelectedFilters();
    const { user } = useAuth0();

    const modifiers = repositoryItem.crafted_by;

    const use = (e: any) => {
        switch (repositoryItem.type) {
            case "prompt":
                const options = new UserPromptOptions();
                options.technology.name = repositoryItem.technology_name;
                options.technology.slug = repositoryItem.technology_slug;
                options.provider.name = repositoryItem.provider_name;
                options.provider.slug = repositoryItem.provider_slug;
                options.language = new Language();
                options.language.code = selectedFilters.language;

                const thread = new Thread();
                thread.request.setText(repositoryItem.content);
                thread.request.userPromptOptions = options;
                if (modifiers.length > 0) {
                    thread.request.repositoryItems = [RepositoryItem.buildFromModifier(modifiers[0])];
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

    const deleteItem = async (e: any) => {
        e.stopPropagation();

        await aiMediatorClient.deleteRepositoryItem(repositoryItem);

        notifications.show({
            title: `Deleted`,
            message: `This ${repositoryItem.type} has been deleted`,
            color: RepositoryItem.getColor(repositoryItem.type)
        });

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
                            {
                                repositoryItem.repository_slug === 'wace'
                                    ? <Tooltip label={repositoryItem.repository_name}>
                                        <IconUsersGroup color={Repository.getColor(repositoryItem.slug)} size={14} />
                                    </Tooltip>
                                    :
                                    <Tooltip label={repositoryItem.repository_name}>
                                        <IconLock color={Repository.getColor("private")} size={14} />
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
                        <Group>
                            {/* <Rating size="xs" readOnly  value={repositoryItem.score * 5 / 100} /> */}
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
                                <Card>
                                    <Stack gap={"xs"}>
                                        <Text size="xs" fw={500}>Description</Text>
                                        <Text size="xs">{repositoryItem.description}</Text>
                                    </Stack>
                                </Card>
                                {
                                    userOwnsItem &&
                                    <Card>
                                        <Stack gap={"xs"}>
                                            <Text size="xs" fw={500}>Modifier</Text>
                                            <Text size="xs">{repositoryItem.content}</Text>

                                        </Stack>
                                    </Card>
                                }
                            </Stack>
                            :
                            <Card>
                                <Stack gap={"xs"}>
                                    <Text size="xs" fw={500}>Prompt</Text>
                                    <Text size="xs">{repositoryItem.content}</Text>
                                </Stack>
                            </Card>
                    }
                    {
                        repositoryItem.modifiers.length > 0
                        && <Card>
                            <Stack gap={"xs"}>
                                <Text size="xs" fw={500}>Modifiers</Text>
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
                        </Card>
                    }
                    <Card>
                        <Stack gap={"xs"}>
                            <Text size="xs" fw={500}>Details</Text>
                            <SimpleGrid cols={2} verticalSpacing={"xs"}>
                                <Text size="xs">Type</Text>
                                <Text size="xs" fw={500}>{repositoryItem.type.toUpperCase()}</Text>
                                <Text size="xs">Language</Text>
                                <Text size="xs" fw={500}>{repositoryItem.language_name}</Text>
                                <Text size="xs">Repository</Text>
                                <Text size="xs" fw={500}>{repositoryItem.repository_name}</Text>
                                <Text size="xs">Technology</Text>
                                <Text size="xs" fw={500}>{repositoryItem.technology_name}</Text>
                                {
                                    repositoryItem.provider_name &&
                                    <Text size="xs">Provider</Text>
                                }
                                {
                                    repositoryItem.provider_name &&
                                    <Text size="xs" fw={500}>{repositoryItem.provider_name}</Text>
                                }
                            </SimpleGrid>
                        </Stack>
                    </Card>
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