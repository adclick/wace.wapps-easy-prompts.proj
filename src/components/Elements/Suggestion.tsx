import { UsedPrompt } from "../../model/UsedPrompt";
import { Accordion, AccordionControl, AccordionItem, Box, Button, Chip, Collapse, Divider, Group, Paper, Rating, Spoiler, Stack, Text, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowLeft, IconArrowRight, IconCheck } from "@tabler/icons-react";

interface Suggestion {
    usedPrompt: UsedPrompt,
    setUserPrompt: any
}

export function Suggestion({
    usedPrompt,
    setUserPrompt
}: Suggestion) {
    const [opened, { toggle }] = useDisclosure(false);

    const use = () => {
        setUserPrompt(usedPrompt.prompt)
    }
    return (
        <AccordionItem value={usedPrompt.prompt}>
            <AccordionControl px={0}>
                <Group justify="space-between">
                    <Text size="sm">{usedPrompt.prompt}</Text>
                </Group>
            </AccordionControl>
            <Accordion.Panel px={0}>
                <Stack>
                    <Text size="xs" onClick={toggle}>
                        Text Generation by Openai using 2 modifiers
                    </Text>

                    <Collapse in={opened}>
                        <Stack gap={"xs"}>
                            <Chip readOnly checked size="xs" variant="light" value={"teste 1"}>
                                Detailed indo
                            </Chip>
                            <Chip readOnly checked size="xs" variant="light" value={"teste 1"}>
                                Detailed indo
                            </Chip>
                            <Chip readOnly checked size="xs" variant="light" value={"teste 1"}>
                                Detailed indo
                            </Chip>
                            <Chip readOnly checked size="xs" variant="light" value={"teste 1"}>
                                Detailed indo
                            </Chip>
                            <Chip readOnly checked size="xs" variant="light" value={"teste 1"}>
                                Detailed indo
                            </Chip>
                        </Stack>
                    </Collapse>

                    <Group px={0} py={"xs"} justify="space-between">
                        <Rating size="xs" readOnly color="blue" value={3} />
                        <Button
                            variant="subtle"
                            size="xs"
                            leftSection={<IconCheck style={{ width: rem(14), height: rem(14) }} />}
                            onClick={use}
                        >
                            USE
                        </Button>
                    </Group>
                </Stack>
            </Accordion.Panel>
        </AccordionItem>
    )
}