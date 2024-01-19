import { Button, Card, Divider, Group, Modal, SimpleGrid, Stack, Tabs, Text, Title } from "@mantine/core";
import { Prompt } from "../../../../model/Prompt";
import { notifications } from "@mantine/notifications";
import { IconBulb, IconDatabase, IconFileDescription, IconLanguage, IconMessage, IconPlayerPlayFilled, IconStarFilled, IconTrash, IconWorld } from "@tabler/icons-react";
import { useDeletePromptMutation } from "../../../../api/promptsApi";
import { Template } from "../../../../model/Template";
import { useDeleteTemplateMutation } from "../../../../api/templatesApi";

interface TemplateCardDetails {
    opened: boolean,
    handle: any,
    template: Template
}

export function TemplateCardDetails({
    opened,
    handle,
    template
}: TemplateCardDetails) {
    const deleteMutation = useDeleteTemplateMutation();

    const deleteItem = async (e: any) => {
        e.stopPropagation();

        deleteMutation.mutate(template.id);
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
            title: "Template Deleted",
            message: "Your settings were saved",
            color: "blue"
        });

        deleteMutation.reset();
    }

    return (
        <Modal opened={opened} onClose={handle.close} title={template.title} size={"lg"}>
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
                                    <Text size="xs">{template.description}</Text>
                                </Stack>
                                <Divider />
                                <SimpleGrid cols={2}>

                                    <Stack>
                                        <Title order={6}>Specifications</Title>
                                        <Group>
                                            <IconLanguage size={12} />
                                            <Text size="xs">Language</Text>
                                            <Text size="xs">{template.language.name}</Text>
                                        </Group>
                                        <Group>
                                            <IconDatabase size={12} />
                                            <Text size="xs">Repository</Text>
                                            <Text size="xs">{template.repository.name}</Text>
                                        </Group>
                                    </Stack>
                                    <Stack>
                                        <Title order={6}>Statistics</Title>
                                        <Group>
                                            <IconPlayerPlayFilled size={12} />
                                            <Text size="xs">Plays</Text>
                                            <Text size="xs">{template.plays}</Text>
                                        </Group>
                                        <Group>
                                            <IconStarFilled size={12} />
                                            <Text size="xs">Stars</Text>
                                            <Text size="xs">{template.stars}</Text>
                                        </Group>
                                    </Stack>
                                </SimpleGrid>
                            </Stack>
                        </Card>
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
                <Button size="xs" leftSection={<IconPlayerPlayFilled size={12} />}>Play</Button>
            </Group>
        </Modal>
    )
}