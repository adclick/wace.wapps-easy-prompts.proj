import { Button, Card, Center, Divider, Grid, Group, Loader, Modal, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { IconBulb, IconDatabase, IconLanguage, IconLink, IconPencil, IconSparkles, IconTemplate, IconTrash, IconUser, IconWorld } from "@tabler/icons-react";
import { CardDetailsAuthor } from "../../../Common/CardDetailsAuthor/CardDetailsAuthor";
import { Modifier } from "../../../../models/Modifier";
import { Prompt } from "../../../../models/Prompt";
import { Template } from "../../../../models/Template";
import { Label } from "../../../../models/SelectedDatabaseType";
import { modals } from "@mantine/modals";
import classes from './DatabaseCardDetails.module.css';
import { useStore } from "../../../../stores/store";
import { useShallow } from "zustand/react/shallow";

interface DatabaseCardDetails {
    opened: boolean,
    handle: any,
    item: Prompt | Template | Modifier,
    itemQuery: any,
    hasContent: boolean,
    hasModifiers: boolean,
    hasTemplates: boolean,
    typeLabel: Label,
    deleteMutation: any,
    openEdit: any,
    copyURL: any
}

export function DatabaseCardDetails({
    opened,
    handle,
    item,
    itemQuery,
    hasContent,
    hasModifiers,
    hasTemplates,
    typeLabel,
    deleteMutation,
    openEdit,
    copyURL
}: DatabaseCardDetails) {
    const [user] = useStore(useShallow(state => [state.user]));

    let modifiers = [];
    let templates = [];
    let chatMessages = [];
    if (itemQuery.data) {
        switch (typeLabel) {
            case Label.Prompt:
                modifiers = itemQuery.data.prompts_modifiers.map((m: { modifier: Modifier }) => m.modifier);
                templates = itemQuery.data.prompts_templates.map((t: { template: Template }) => t.template);
                chatMessages = itemQuery.data.prompts_chat_messages;
                break;
            case Label.Tempalate:
                modifiers = itemQuery.data.templates_modifiers.map((m: { modifier: Modifier }) => m.modifier);
                break;
        }
    }

    const title = `${typeLabel}: ${item.title}`;

    const openDeleteModal = (e: any) => {
        modals.openConfirmModal({
            title: 'Delete this item',
            centered: true,
            children: (
                <Text size="sm">
                    Are you sure you want to delete this item? This action is will modify the outcome of other items
                </Text>
            ),
            labels: { confirm: 'Delete', cancel: "Cancel" },
            confirmProps: { color: 'red' },
            onCancel: () => console.log('Cancel'),
            onConfirm: () => deleteMutation.mutate(item.id),
        });
    }

    const date = new Date(item.created_at)
    const formattedDate = `${date.toLocaleDateString('en-GB')} ${date.toLocaleTimeString('en-GB')}`;

    return (
        <Modal opened={opened} onClose={handle.close} title={title} size={"md"} styles={{
        }}>
            <Stack>
                <Card className={classes.card}>
                    <Stack>
                        {
                            item.description &&
                            <>
                                <Stack gap={4}>
                                    <Title order={6}>Description</Title>
                                    <Text size="xs">{item.description}</Text>
                                </Stack>
                                <Divider />
                            </>
                        }
                        <Title order={6}>Specifications</Title>
                        <SimpleGrid cols={{ base: 1, sm: 1 }}>
                            <SimpleGrid cols={2} spacing={"xs"}>
                                <Group gap={"xs"}>
                                    <IconBulb size={12} />
                                    <Text size="xs">Technology</Text>
                                </Group>
                                <Text fw={700} size="xs">{item.technology.name}</Text>
                            </SimpleGrid>
                            {
                                item.provider &&
                                <SimpleGrid cols={2} spacing={"xs"}>
                                    <Group gap={"xs"}>
                                        <IconWorld size={12} />
                                        <Text size="xs">Provider</Text>
                                    </Group>
                                    <Text fw={700} size="xs">{item.provider.model_name}</Text>
                                </SimpleGrid>
                            }
                            <SimpleGrid cols={2} spacing={"xs"}>
                                <Group gap={"xs"}>
                                    <IconLanguage size={12} />
                                    <Text size="xs">Language</Text>
                                </Group>
                                <Text fw={700} size="xs">{item.language.name}</Text>
                            </SimpleGrid>
                            <SimpleGrid cols={2} spacing={"xs"}>
                                <Group gap={"xs"}>
                                    <IconDatabase size={12} />
                                    <Text size="xs">Repository</Text>
                                </Group>
                                <Text fw={700} size="xs">{item.repository.name}</Text>
                            </SimpleGrid>

                            <SimpleGrid cols={2} spacing={"xs"}>
                                <Group gap={"xs"}>
                                    <IconUser size={12} />
                                    <Text size="xs">Author</Text>
                                </Group>
                                <Text fw={700} size="xs">{item.user.username}</Text>
                            </SimpleGrid>
                            <SimpleGrid cols={2} spacing={"xs"}>
                                <Group gap={"xs"}>
                                    <IconUser size={12} />
                                    <Text size="xs">Published</Text>
                                </Group>
                                <Text fw={700} size="xs">{formattedDate}</Text>
                            </SimpleGrid>
                        </SimpleGrid>
                    </Stack>
                </Card>
                {
                    itemQuery.isLoading && <Center><Loader size={"sm"} color="blue" type="dots" /></Center>
                }
                {
                    hasContent && user.username === item.user.username && itemQuery.data &&
                    <Card className={classes.card}>
                        <Stack>
                            <Title order={6}>Content</Title>


                            {
                                chatMessages.length > 0
                                    ? <Stack>
                                        {
                                            chatMessages.map((m: { id: number, role: string, message: string }) => {
                                                return <Grid key={m.id} gutter={2}>
                                                    <Grid.Col span={{ base: 12, sm: 2 }}>
                                                        <Text size="xs" fw={700}>{m.role}</Text>
                                                    </Grid.Col>
                                                    <Grid.Col span={{ base: 12, sm: 10 }}>
                                                        <Text size="xs">{m.message}</Text>
                                                    </Grid.Col>
                                                </Grid>
                                            })

                                        }
                                    </Stack>
                                    : <Text size="xs">{itemQuery.data.content}</Text>
                            }
                        </Stack>
                    </Card>
                }
                {
                    hasModifiers && user.username === item.user.username && itemQuery.data && modifiers.length > 0 &&
                    <Card className={classes.card}>
                        <Stack>
                            <Group gap={"xs"}>
                                <IconSparkles size={14} />
                                <Title order={6}>
                                    Modifiers
                                </Title>
                            </Group>
                            {
                                modifiers.map((modifier: Modifier) => {
                                    return (
                                        <Stack key={modifier.id} gap={"xs"}>
                                            <Text size="xs">{modifier.title}</Text>
                                        </Stack>
                                    )
                                })
                            }
                        </Stack>
                    </Card>
                }
                {
                    hasTemplates && user.username === item.user.username && itemQuery.data && templates.length > 0 &&
                    <Card className={classes.card}>
                        <Stack>
                            <Group gap={"xs"}>
                                <IconTemplate size={14} />
                                <Title order={6}>Templates</Title>
                            </Group>
                            {
                                templates.map((template: Template) => {
                                    return (
                                        <Stack key={template.id}>
                                            <Text size="xs">{template.title}</Text>
                                        </Stack>
                                    )
                                })
                            }
                        </Stack>
                    </Card>
                }
                <Stack>
                    <Button
                        size="xs"
                        color="gray"
                        variant="filled"
                        onClick={copyURL}
                        leftSection={<IconLink size={14} />}
                    >
                        Copy Link
                    </Button>
                    {
                        user.username === item.user.username &&
                        <>
                            <Button
                                size="xs"
                                color="gray"
                                variant="filled"
                                onClick={openEdit}
                                leftSection={<IconPencil size={14} />}
                            >
                                Edit
                            </Button>
                            <Button
                                color="red"
                                size="xs"
                                variant="light"
                                onClick={openDeleteModal}
                                leftSection={<IconTrash size={14} />}
                            >
                                Delete
                            </Button>
                        </>
                    }
                </Stack>
            </Stack>
        </Modal>
    )
}