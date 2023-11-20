import { UsedPrompt } from "../../model/UsedPrompt";
import { Accordion, AccordionControl, AccordionItem, ActionIcon, Box, Button, Chip, Collapse, Divider, Group, Paper, Rating, Spoiler, Stack, Text, Tooltip, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowLeft, IconArrowRight, IconCheck, IconPlayerPlayFilled } from "@tabler/icons-react";

interface Suggestion {
    usedPrompt: UsedPrompt,
    setUserPrompt: any,
    navbarToggle: any
}

export function Suggestion({
    usedPrompt,
    setUserPrompt,
    navbarToggle
}: Suggestion) {
    const [opened, { toggle }] = useDisclosure(false);

    const use = () => {
        setUserPrompt(usedPrompt.prompt)
        navbarToggle();
    }
    return (
        <AccordionItem value={usedPrompt.prompt} py={"xs"}>
            <AccordionControl px={0}>
                <Group justify="space-between">
                    <Text size="xs">{usedPrompt.prompt}</Text>
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

                    <Group px={0} py={"xs"} justify="space-between" align="baseline">
                        <Tooltip label={`${usedPrompt.score}/100`}>
                            <Rating size="xs" readOnly color="blue" value={usedPrompt.score * 5 / 100} />
                        </Tooltip>
                        <Tooltip label={"Run this prompt"}>
                            <ActionIcon variant="subtle" size={"md"} onClick={use} mx={"md"}>
                                <IconPlayerPlayFilled style={{ width: "70%", height: "70%" }} />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </Stack>
            </Accordion.Panel>
        </AccordionItem>
    )
}