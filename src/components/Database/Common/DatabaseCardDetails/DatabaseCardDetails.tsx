import { Card, Divider, Group, Modal, SimpleGrid, Stack, Text, Title } from "@mantine/core"
import { IconBulb, IconDatabase, IconLanguage, IconWorld } from "@tabler/icons-react"
import { CardDetailsAuthor } from "../../../Common/CardDetailsAuthor/CardDetailsAuthor"
import { useUser } from "../../../../context/UserContext";
import { Modifier } from "../../../../model/Modifier";
import { Prompt } from "../../../../model/Prompt";
import { Template } from "../../../../model/Template";

interface DatabaseCardDetails {
    opened: boolean,
    handle: any,
    item: Prompt|Template|Modifier,
    itemQuery: any
}

export function DatabaseCardDetails({
    opened,
    handle,
    item,
    itemQuery
 }: DatabaseCardDetails) {
    const { user } = useUser();

    const { data: itemPrivate } = itemQuery;

    let modifiers = [];
    if (itemPrivate && itemPrivate.metadata && "modifiers" in itemPrivate.metadata) {
        modifiers = itemPrivate.metadata['modifiers'];
    }

    return (
        <Modal opened={opened} onClose={handle.close} title={item.title} size={"lg"}>
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
                    user.username === item.user.username && itemPrivate &&
                    <Card>
                        <Stack>
                            <Stack gap={4}>
                                <Title order={6}>Content</Title>
                                <Text size="xs">{itemPrivate.content}</Text>
                            </Stack>
                            {
                                itemPrivate.metadata && "modifiers" in itemPrivate.metadata &&
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
        </Modal>
    )
}