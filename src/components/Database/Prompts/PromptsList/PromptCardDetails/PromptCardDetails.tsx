import { Card, Divider, Group, Modal, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { Prompt } from "../../../../../model/Prompt";
import { IconBulb, IconClock, IconDatabase, IconLanguage, IconPlayerPlayFilled, IconStarFilled, IconWorld } from "@tabler/icons-react";
import { usePromptQuery } from "../../../../../api/promptsApi";
import { useUser } from "../../../../../context/UserContext";
import { Modifier } from "../../../../../model/Modifier";
import { IconUser } from "@tabler/icons-react";
import { CardDetailsAuthor } from "../../../../Common/CardDetailsAuthor/CardDetailsAuthor";

interface PromptCardDetails {
    opened: boolean,
    handle: any,
    prompt: Prompt,
}

export function PromptCardDetails({
    opened,
    handle,
    prompt,
}: PromptCardDetails) {
    const { user } = useUser();

    const enabled = user.username === prompt.user.username && opened
    const { data: promptPrivate } = usePromptQuery(prompt.id, enabled);

    let modifiers = [];
    if (promptPrivate && promptPrivate.metadata && "modifiers" in promptPrivate.metadata) {
        modifiers = promptPrivate.metadata['modifiers'];
    }

    return (
        <Modal opened={opened} onClose={handle.close} title={prompt.title} size={"lg"}>
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
                        <CardDetailsAuthor item={prompt} />
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
        </Modal>
    )
}