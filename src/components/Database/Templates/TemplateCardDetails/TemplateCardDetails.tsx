import { Card, Divider, Group, Modal, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { IconClock, IconDatabase, IconLanguage, IconPlayerPlayFilled, IconStarFilled, IconUser } from "@tabler/icons-react";
import { Template } from "../../../../model/Template";
import { CardDetailsAuthor } from "../../../Common/CardDetailsAuthor/CardDetailsAuthor";

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
    return (
        <Modal opened={opened} onClose={handle.close} title={template.title} size={"lg"}>
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
                        <Divider />
                        <CardDetailsAuthor item={template} />
                    </Stack>
                </Card>
            </Stack>
        </Modal>
    )
}