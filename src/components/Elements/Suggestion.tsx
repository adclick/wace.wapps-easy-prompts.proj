import { Accordion, AccordionControl, AccordionItem, Box, Button, Collapse, Group, Paper, Rating, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

interface Suggestion {
    name: string
}

export function Suggestion({ name }: Suggestion) {
    return (
        <AccordionItem value={name}>
            <AccordionControl px={0}>
                <Group justify="space-between">
                    <Text>{name}</Text>
                    <Rating size="sm" readOnly color="blue" value={3} />
                </Group>
            </AccordionControl>
            <Accordion.Panel px={0}>
                <Group px={0} py={"xs"} justify="space-between">
                    <Text>help</Text>
                    <Button variant="transparent" size="compact-sm">Apply</Button>
                </Group>
            </Accordion.Panel>
        </AccordionItem>
    )
}