import { Card, Divider, Accordion, AccordionControl, AccordionItem, ActionIcon, Badge, Box, Button, Group, Menu, Rating, Stack, Text, Tooltip, rem, Collapse } from "@mantine/core";
import { IconArrowRight, IconDotsVertical, IconInfoCircle, IconPencil, IconPlayerPlayFilled, IconPrompt, IconShare, IconSparkles, IconTemplate, IconTrash } from "@tabler/icons-react";
import { RepositoryItem } from "../../model/RepositoryItem";
import { useDisclosure } from "@mantine/hooks";
import { RepositoryItemDetailsModal } from "./RepositoryItemDetailsModal";
import { AIMediatorClient } from "../../clients/AIMediatorClient";
import { Filters } from "../../model/Filters";
import { Thread } from "../../model/Thread";
import { UserPromptOptions } from "../../model/UserPromptOptions";
import classes from "./RepositoryItemRow.module.css"


interface RepositoryItemRow {
    setUserPrompt: any,
    navbarToggle: any,
    repositoryItem: RepositoryItem,
    repositorySelectedItems: RepositoryItem[],
    setRepositorySelectedItems: any,
    aiMediatorClient: AIMediatorClient,
    refreshRepository: any,
    filters: Filters,
    openRepositoryItemDetailsSelected: any,
    threads: Thread[]
    setThreads: any
}

export function RepositoryItemRow({
    setUserPrompt,
    navbarToggle,
    repositoryItem,
    repositorySelectedItems,
    setRepositorySelectedItems,
    aiMediatorClient,
    refreshRepository,
    filters,
    openRepositoryItemDetailsSelected,
    threads,
    setThreads
}: RepositoryItemRow) {
    const use = (e: any) => {
        switch (repositoryItem.type) {
            case "prompt":
                setRepositorySelectedItems([repositoryItem]);

                const options = new UserPromptOptions();
                options.technology.name = repositoryItem.technology_name;
                options.technology.slug = repositoryItem.technology_slug;
                options.provider.name = repositoryItem.provider_name;
                options.provider.slug = repositoryItem.provider_slug;

                const thread = new Thread();
                thread.request.setText(repositoryItem.content);
                thread.request.userPromptOptions = options
                thread.request.repositoryItems = [repositoryItem];
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

        refreshRepository(filters);
    }

    const date = new Date(repositoryItem.created_at);

    const created_at = date.toLocaleString();

    return (
        <Accordion.Item value={`${repositoryItem.type}-${repositoryItem.id}`}>
            <Accordion.Control>
                <Stack>
                    <Group justify="space-between" wrap="nowrap" align="flex-start">
                        <Stack gap={0}>
                            <Badge size="xs" variant="transparent" color="gray.9" px={0}>{repositoryItem.category_name}</Badge>
                            <Text size="sm" fw={500} lineClamp={20}>
                                {repositoryItem.name}
                            </Text>
                        </Stack>
                        <Menu>
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
                                    disabled
                                    leftSection={<IconShare style={{ width: rem(14), height: rem(14) }} />}
                                >
                                    Share
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
                    </Group>

                    <Group justify="space-between">
                        <Badge size="xs" variant="filled" color={repositoryItem.color}>
                            {repositoryItem.type}
                        </Badge>
                        <Group>
                            <Rating px={"xs"} size="xs" readOnly color={"blue"} value={repositoryItem.score * 5 / 100} />
                            <ActionIcon color={repositoryItem.color} variant="filled" size={"md"} onClick={(e: any) => use(e)}>
                                <IconPlayerPlayFilled style={{ width: '50%', height: '50%' }} stroke={1.5} />
                            </ActionIcon>
                        </Group>
                    </Group>
                </Stack>
            </Accordion.Control >

            <Accordion.Panel>
                <Stack>
                    <Text size="xs">{repositoryItem.content}</Text>
                    <Group>
                        <Badge variant="transparent" px={0} size="xs">
                            {repositoryItem.technology_name}
                            {repositoryItem.provider_name !== "" ? ` | ${repositoryItem.provider_name}` : ""}</Badge>
                    </Group>
                    <Group justify="space-between">
                        <Text size="xs" c="gray.6">nuno.saraiva</Text>
                        <Text size="xs" c="gray.6">{created_at}</Text>
                    </Group>
                </Stack>
            </Accordion.Panel>

        </Accordion.Item >
    )
}