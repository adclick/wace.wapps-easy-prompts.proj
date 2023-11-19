import { Accordion, AccordionControl, AccordionItem, Box, Button, Collapse, Divider, Group, Paper, Rating, Stack, Text, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowLeft, IconArrowRight, IconCheck } from "@tabler/icons-react";

interface Suggestion {
    name: string
}

export function Suggestion({ name }: Suggestion) {
    return (
        <AccordionItem value={name}>
            <AccordionControl px={0}>
                <Group justify="space-between">
                    <Text fw={600} size="sm">{name}</Text>
                </Group>
            </AccordionControl>
            <Accordion.Panel px={0}>
                <Stack>
                    <Text size="xs">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but a
                    </Text>
                    <Group px={0} py={"xs"} justify="space-between">
                        <Rating size="xs" readOnly color="blue" value={3} />
                        <Button
                            variant="transparent"
                            size="xs"
                            leftSection={<IconCheck style={{ width: rem(14), height: rem(14) }} />}
                        >
                            USE
                        </Button>
                    </Group>
                </Stack>
            </Accordion.Panel>
        </AccordionItem>
    )
}