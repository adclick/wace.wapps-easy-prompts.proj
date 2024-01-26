import { Card, Center, Divider, Group, Loader, Modal, SimpleGrid, Stack, Text, Title } from "@mantine/core"
import { IconBulb, IconDatabase, IconLanguage, IconWorld } from "@tabler/icons-react"
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
    if (itemQuery.data && itemQuery.data.metadata && "modifiers" in itemQuery.data.metadata) {
        modifiers = itemQuery.data.metadata['modifiers'];
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
                        <SimpleGrid cols={2}>
                            <Stack>
                                <Group>
                                    <IconLanguage size={12} />
                                    <Text size="xs">Language</Text>
                                    <Text size="xs">{item.language.name}</Text>
                                </Group>
                                <Group>
                                    <IconDatabase size={12} />
                                    <Text size="xs">Repository</Text>
                                    <Text size="xs">{item.repository.name}</Text>
                                </Group>
                            </Stack>
                            <Stack>
                                <Group>
                                    <IconBulb size={12} />
                                    <Text size="xs">Technology</Text>
                                    <Text size="xs">{item.technology.name}</Text>
                                </Group>
                                {
                                    item.provider &&
                                    <Group>
                                        <IconWorld size={12} />
                                        <Text size="xs">Provider</Text>
                                        <Text size="xs">{item.provider.name}</Text>
                                    </Group>
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
                    hasModifiers && user.username === item.user.username && itemQuery.data && itemQuery.data.metadata && "modifiers" in itemQuery.data.metadata &&
                    <Card>
                        <Stack gap={4}>
                            <Title order={6}>Modifiers</Title>
                            {
                                itemQuery.data.modifiers.map((modifier: Modifier) => {
                                    return (
                                        <Stack key={modifier.id}>
                                            <Text size="xs">{modifier.title}</Text>
                                            <Text size="xs">{modifier.content}</Text>
                                        </Stack>
                                    )
                                })
                            }
                        </Stack>
                    </Card>
                }
                {
                    hasTemplates && user.username === item.user.username && itemQuery.data && itemQuery.data.metadata && "templates" in itemQuery.data.metadata &&
                    <Card>
                        <Stack gap={4}>
                            <Title order={6}>Templates</Title>
                            {
                                itemQuery.data.templates.map((template: Template) => {
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