import { Card, Divider, Group, Modal, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { IconDatabase, IconLanguage, IconPlayerPlayFilled, IconStarFilled } from "@tabler/icons-react";
import { Modifier } from "../../../../model/Modifier";

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
                    </Stack>
                </Card>
            </Stack>
        </Modal>
    )
}