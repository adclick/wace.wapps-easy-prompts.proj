import { Button, Card, Divider, Group, Modal, SimpleGrid, Stack, Tabs, Text, Title } from "@mantine/core";
import { Prompt } from "../../../model/Prompt";
import { useDeleteCraftMutation } from "../../../api/promptsApi";
import { notifications } from "@mantine/notifications";
import { IconBulb, IconDatabase, IconFileDescription, IconLanguage, IconMessage, IconPlayerPlayFilled, IconStarFilled, IconTrash, IconWorld } from "@tabler/icons-react";

interface PromptCardDetails {
    opened: boolean,
    handle: any,
    prompt: Prompt
}

export function PromptCardDetails({
    opened,
    handle,
    prompt
}: PromptCardDetails) {
    const deleteMutation = useDeleteCraftMutation();

    const deleteItem = async (e: any) => {
        e.stopPropagation();

        deleteMutation.mutate(prompt.id);
    }

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
            title: "Modifier Deleted",
            message: "Your settings were saved",
            color: "blue"
        });

        deleteMutation.reset();
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
                            </Stack>
                        </Card>
                    </Stack>
                </Tabs.Panel>
                <Tabs.Panel value="reviews">
                </Tabs.Panel>
            </Tabs>
            <Group justify="space-between">
                <Button size="xs" color="red" variant="subtle" leftSection={<IconTrash size={12} />}>Delete</Button>
                <Button size="xs" leftSection={<IconPlayerPlayFilled size={12} />}>Play</Button>
            </Group>
        </Modal>
    )
}