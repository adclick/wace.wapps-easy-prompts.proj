import { Card, Center, Divider, Group, Loader, Modal, SimpleGrid, Stack, Text, Title } from "@mantine/core"
import { IconBulb, IconDatabase, IconLanguage, IconSparkles, IconTemplate, IconWorld } from "@tabler/icons-react"
import { CardDetailsAuthor } from "../../../Common/CardDetailsAuthor/CardDetailsAuthor"
import { useUser } from "../../../../context/UserContext";
import { Modifier } from "../../../../model/Modifier";
import { Prompt } from "../../../../model/Prompt";
import { Template } from "../../../../model/Template";
import { Label } from "../../../../model/SelectedDatabaseType";

interface DatabaseCardDetails {
    opened: boolean,
    handle: any,
    item: Prompt | Template | Modifier,
    itemQuery: any,
    hasContent: boolean,
    hasModifiers: boolean,
    hasTemplates: boolean,
    typeLabel: Label
}

export function DatabaseCardDetails({
    opened,
    handle,
    item,
    itemQuery,
    hasContent,
    hasModifiers,
    hasTemplates,
    typeLabel
}: DatabaseCardDetails) {
    const { user } = useUser();

    let modifiers = [];
    if (itemQuery.data) {
        switch (typeLabel) {
            case Label.Prompt:
                modifiers = itemQuery.data.prompts_modifiers.map((m: { modifier: Modifier }) => m.modifier);
                break;
            case Label.Tempalate:
                modifiers = itemQuery.data.templates_modifiers.map((m: { modifier: Modifier }) => m.modifier);
                break;
        }
    }

    let templates = [];
    if (itemQuery.data) {
        switch (typeLabel) {
            case Label.Prompt:
                templates = itemQuery.data.prompts_templates.map((t: { template: Template }) => t.template);
                break;
        }
    }

    const title = `${typeLabel}: ${item.title}`;

    return (
        <Modal opened={opened} onClose={handle.close} title={title} size={"lg"}>
            <Stack my={"md"}>
                <Card>
                    <Stack>
                        <Stack gap={4}>
                            <Title order={6}>Description</Title>
                            <Text size="xs">{item.description}</Text>
                        </Stack>
                        <Divider />
                        <Title order={6}>Specifications</Title>
                        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={"xl"}>
                            <Stack>
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
                            </Stack>
                            <Stack>
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
                                        <Text fw={700} size="xs">{item.provider.name}</Text>
                                    </SimpleGrid>
                                }
                            </Stack>
                        </SimpleGrid>
                        <Divider />
                        <CardDetailsAuthor item={item} />
                    </Stack>
                </Card>
                {
                    itemQuery.isLoading && <Center><Loader size={"sm"} color="blue" type="dots" /></Center>
                }
                {
                    hasContent && user.username === item.user.username && itemQuery.data &&
                    <Card>
                        <Stack gap={4}>
                            <Title order={6}>Content</Title>
                            <Text size="xs">{itemQuery.data.content}</Text>
                        </Stack>
                    </Card>
                }
                {
                    hasModifiers && user.username === item.user.username && itemQuery.data && modifiers.length > 0 &&
                    <Card>
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
                    <Card>
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
            </Stack>
        </Modal>
    )
}