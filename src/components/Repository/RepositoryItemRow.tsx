import { Card, Accordion, AccordionControl, AccordionItem, ActionIcon, Badge, Box, Button, Group, Menu, Rating, Stack, Text, Tooltip, rem } from "@mantine/core";
import { IconArrowRight, IconDotsVertical, IconInfoCircle, IconPlayerPlayFilled, IconPrompt, IconShare, IconSparkles, IconTemplate, IconTrash } from "@tabler/icons-react";
import { RepositoryItem } from "../../model/RepositoryItem";
import { useDisclosure } from "@mantine/hooks";
import { RepositoryItemDetailsModal } from "./RepositoryItemDetailsModal";
import { AIMediatorClient } from "../../clients/AIMediatorClient";
import { Filters } from "../../model/Filters";
import { Thread } from "../../model/Thread";
import { UserPromptOptions } from "../../model/UserPromptOptions";


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

    const use = () => {
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
    }

    const deleteItem = async () => {
        await aiMediatorClient.deleteRepositoryItem(repositoryItem);

        refreshRepository(filters);
    }

    return (
        <Card>
            <Stack>
                <Group justify="space-between" wrap="nowrap" align="flex-start">
                    <Stack gap={0}>
                        <Badge size="xs" variant="transparent" color="gray.9" px={0}>Productivity</Badge>
                        <Text size="sm" fw={500} lineClamp={20}>
                            {repositoryItem.name}
                        </Text>
                    </Stack>
                    <Menu>
                        <Menu.Target>
                            <ActionIcon variant="subtle" color="gray">
                                <IconDotsVertical style={{ width: rem(16), height: rem(16) }} />
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item onClick={() => openRepositoryItemDetailsSelected(repositoryItem)} leftSection={<IconInfoCircle style={{ width: rem(14), height: rem(14) }} />}>
                                Details
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
                        <ActionIcon color={repositoryItem.color} variant="filled" size={"md"} onClick={use}>
                            <IconPlayerPlayFilled style={{ width: '50%', height: '50%' }} stroke={1.5} />
                        </ActionIcon>
                    </Group>
                </Group>
            </Stack>
        </Card>
    )
}