import { Button, Card, Divider, Group, Modal, SimpleGrid, Stack, Tabs, Text, Title } from "@mantine/core";
import { Prompt } from "../../../model/Prompt";
import { notifications } from "@mantine/notifications";
import { IconBulb, IconDatabase, IconFileDescription, IconLanguage, IconMessage, IconPlayerPlayFilled, IconStarFilled, IconTrash, IconWorld } from "@tabler/icons-react";
import { useDeletePromptMutation, usePromptQuery } from "../../../api/promptsApi";
import { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";
import { Modifier } from "../../../model/Modifier";

interface PromptCardDetails {
    opened: boolean,
    handle: any,
    prompt: Prompt,
    play: any
}

export function PromptCardDetails({
    opened,
    handle,
    prompt,
    play
}: PromptCardDetails) {
    const deleteMutation = useDeletePromptMutation();
    const { data: promptPrivate } = usePromptQuery(prompt.id);
    const { user } = useUser();

    const onClickPlay = (e: any) => {
        play(e);

        handle.close();
    }

    const deleteItem = async (e: any) => {
        e.stopPropagation();

        deleteMutation.mutate(prompt.id);

        handle.close();
    }

    useEffect(() => {
        if (deleteMutation.isError) {
            notifications.show({
                title: "Error",
                message: deleteMutation.error.message,
                color: "red"
            });

            deleteMutation.reset();
        }

        if (deleteMutation.isSuccess) {
            notifications.show({
                title: "Prompt Deleted",
                message: "Your settings were saved",
                color: "blue"
            });

            deleteMutation.reset();
        }
    }, [deleteMutation])

    let modifiers = [];
    if (promptPrivate && promptPrivate.metadata && "modifiers" in promptPrivate.metadata) {
        modifiers = promptPrivate.metadata['modifiers'];
    }

    return (
        <Modal opened={opened} onClose={handle.close} title={prompt.title} size={"lg"}>
            <Tabs defaultValue={"details"}>
                <Tabs.List grow>
                    <Tabs.Tab leftSection={<IconFileDescription size={14} />} value="details">
                        Details
                    </Tabs.Tab>
                    <Tabs.Tab leftSection={<IconMessage size={14} />} value="reviews">
                        Reviews
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="details">
                    <Stack my={"md"}>
                        <Card>
                            <Stack>
                                <Stack gap={4}>
                                    <Title order={6}>Description</Title>
                                    <Text size="xs">{prompt.description}</Text>
                                </Stack>
                                <Divider />
                                <SimpleGrid cols={2}>

                                    <Stack>
                                        <Title order={6}>Specifications</Title>
                                        <Group>
                                            <IconLanguage size={12} />
                                            <Text size="xs">Language</Text>
                                            <Text size="xs">{prompt.language.name}</Text>
                                        </Group>
                                        <Group>
                                            <IconDatabase size={12} />
                                            <Text size="xs">Repository</Text>
                                            <Text size="xs">{prompt.repository.name}</Text>
                                        </Group>
                                        <Group>
                                            <IconBulb size={12} />
                                            <Text size="xs">Technology</Text>
                                            <Text size="xs">{prompt.technology.name}</Text>
                                        </Group>
                                        <Group>
                                            <IconWorld size={12} />
                                            <Text size="xs">Provider</Text>
                                            <Text size="xs">{prompt.provider.name}</Text>
                                        </Group>
                                    </Stack>
                                    <Stack>
                                        <Title order={6}>Statistics</Title>
                                        <Group>
                                            <IconPlayerPlayFilled size={12} />
                                            <Text size="xs">Plays</Text>
                                            <Text size="xs">{prompt.plays}</Text>
                                        </Group>
                                        <Group>
                                            <IconStarFilled size={12} />
                                            <Text size="xs">Stars</Text>
                                            <Text size="xs">{prompt.stars}</Text>
                                        </Group>
                                    </Stack>
                                </SimpleGrid>
                                <Divider />
                                <Group justify="space-between">
                                    <Text size="xs">{prompt.user.username}</Text>
                                    <Text size="xs">{prompt.created_at.toLocaleString()}</Text>
                                </Group>
                            </Stack>
                        </Card>
                        {
                            user.username === prompt.user.username && promptPrivate &&
                            <Card>
                                <Stack>
                                    <Stack gap={4}>
                                        <Title order={6}>Content</Title>
                                        <Text size="xs">{promptPrivate.content}</Text>
                                    </Stack>
                                    {
                                        promptPrivate.metadata && "modifiers" in promptPrivate.metadata &&
                                        <Stack gap={4}>
                                            <Title order={6}>Modifiers</Title>
                                            {
                                                modifiers.map((modifier: Modifier) => {
                                                    return (
                                                        <Stack key={modifier.id}>
                                                            <Text size="xs">{modifier.title}</Text>
                                                            <Text size="xs">{modifier.content}</Text>
                                                        </Stack>
                                                    )
                                                })
                                            }
                                        </Stack>
                                    }
                                </Stack>
                            </Card>
                        }
                    </Stack>
                </Tabs.Panel>
                <Tabs.Panel value="reviews">
                    Not available yet
                </Tabs.Panel>
            </Tabs>
            <Group justify="space-between">
                <Button
                    size="xs"
                    color="red"
                    variant="subtle"
                    leftSection={<IconTrash size={12} />}
                    onClick={deleteItem}
                >
                    Delete
                </Button>
                <Button
                    size="xs"
                    leftSection={<IconPlayerPlayFilled size={12} />}
                    onClick={onClickPlay}
                >
                    Play
                </Button>
            </Group>
        </Modal>
    )
}