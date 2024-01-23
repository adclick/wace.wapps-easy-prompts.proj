import { Card, Divider, Group, Modal, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { IconClock, IconDatabase, IconLanguage, IconPlayerPlayFilled, IconStarFilled } from "@tabler/icons-react";
import { Modifier } from "../../../../model/Modifier";
import { IconUser } from "@tabler/icons-react";
import { CardDetailsAuthor } from "../../../Common/CardDetailsAuthor/CardDetailsAuthor";
import { useUser } from "../../../../context/UserContext";

interface ModifierCardDetails {
    opened: boolean,
    handle: any,
    modifier: Modifier
}

export function ModifierCardDetails({
    opened,
    handle,
    modifier
}: ModifierCardDetails) {
    const { user } = useUser();

    return (
        <Modal opened={opened} onClose={handle.close} title={modifier.title} size={"lg"}>
            <Stack my={"md"}>
                <Card>
                    <Stack>
                        <Stack gap={4}>
                            <Title order={6}>Description</Title>
                            <Text size="xs">{modifier.description}</Text>
                        </Stack>
                        <Divider />
                        <SimpleGrid cols={2}>

                            <Stack>
                                <Title order={6}>Specifications</Title>
                                <Group>
                                    <IconLanguage size={12} />
                                    <Text size="xs">Language</Text>
                                    <Text size="xs">{modifier.language.name}</Text>
                                </Group>
                                <Group>
                                    <IconDatabase size={12} />
                                    <Text size="xs">Repository</Text>
                                    <Text size="xs">{modifier.repository.name}</Text>
                                </Group>
                            </Stack>
                            <Stack>
                                <Title order={6}>Statistics</Title>
                                <Group>
                                    <IconPlayerPlayFilled size={12} />
                                    <Text size="xs">Plays</Text>
                                    <Text size="xs">{modifier.plays}</Text>
                                </Group>
                                <Group>
                                    <IconStarFilled size={12} />
                                    <Text size="xs">Stars</Text>
                                    <Text size="xs">{modifier.stars}</Text>
                                </Group>
                            </Stack>
                        </SimpleGrid>
                        <Divider />
                        <CardDetailsAuthor item={modifier} />
                    </Stack>
                </Card>
                {
                    user.username === modifier.user.username &&
                    <Card>
                        <Stack>
                            <Stack gap={4}>
                                <Title order={6}>Content</Title>
                                <Text size="xs">{modifier.content}</Text>
                            </Stack>
                        </Stack>
                    </Card>
                }
            </Stack>
        </Modal>
    )
}