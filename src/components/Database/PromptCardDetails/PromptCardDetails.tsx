import { Card, Divider, Group, Modal, Stack, Tabs, Text, Title } from "@mantine/core";
import { Prompt } from "../../../model/Prompt";
import { useDeleteCraftMutation } from "../../../api/promptsApi";
import { notifications } from "@mantine/notifications";
import { IconFileDescription, IconMessage } from "@tabler/icons-react";

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
                                <Group>
                                    <Stack>
                                        <Title order={6}>Specifications</Title>
                                        
                                    </Stack>
                                </Group>
                            </Stack>
                        </Card>
                    </Stack>
                </Tabs.Panel>
                <Tabs.Panel value="reviews">
                </Tabs.Panel>
            </Tabs>
        </Modal>
    )
}