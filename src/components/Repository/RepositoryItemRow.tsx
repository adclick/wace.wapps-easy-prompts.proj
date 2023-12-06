import { Accordion, AccordionControl, AccordionItem, ActionIcon, Badge, Box, Button, Group, Menu, Rating, Stack, Text, Tooltip, rem } from "@mantine/core";
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
    }

    const deleteItem = async () => {
        await aiMediatorClient.deleteRepositoryItem(repositoryItem);

        refreshRepository(filters);
    }

    return (
        <AccordionItem value={`${repositoryItem.type}-${repositoryItem.id}`} py={"md"}>
            <AccordionControl px={0}>
                <Stack>
                    <Text size="sm" fw={500} lineClamp={20}>
                        {repositoryItem.name}
                    </Text>
                    <Group justify="space-between">
                        <Badge size="xs" variant="filled" color={repositoryItem.color}>
                            {repositoryItem.type}
                        </Badge>
                        <Rating px={"xs"} size="xs" readOnly color={"blue"} value={repositoryItem.score * 5 / 100} />
                    </Group>
                </Stack>
            </AccordionControl>
            <Accordion.Panel px={0}>
                <Stack>

                    <Group px={0} py={"xs"} justify="space-between" align="center">
                        <Button
                            color={repositoryItem.color}
                            radius={"md"}
                            size="xs"
                            variant="light"
                            leftSection={<IconInfoCircle style={{ width: rem(16), height: rem(16) }} />}
                            onClick={() => openRepositoryItemDetailsSelected(repositoryItem)}
                        >
                            Details
                        </Button>
                        <Group gap={"xs"} mx={"lg"}>
                            <Menu withinPortal position="top" shadow="sm">
                                <Menu.Target>
                                    <ActionIcon variant="subtle" color="gray">
                                        <IconDotsVertical style={{ width: rem(16), height: rem(16) }} />
                                    </ActionIcon>
                                </Menu.Target>

                                <Menu.Dropdown>
                                    <Menu.Item disabled leftSection={<IconArrowRight style={{ width: rem(14), height: rem(14) }} />}>
                                        Copy to Repository
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
                            <ActionIcon color={repositoryItem.color} variant="filled" size={"md"} onClick={use}>
                                <IconPlayerPlayFilled style={{ width: "60%", height: "60%" }} />
                            </ActionIcon>
                        </Group>
                    </Group>
                </Stack>
            </Accordion.Panel>
        </AccordionItem>
    )
}