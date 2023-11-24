import { UsedPrompt } from "../../model/UsedPrompt";
import { Accordion, AccordionControl, AccordionItem, ActionIcon, Box, Group, Menu, Rating, Stack, Text, Tooltip, rem } from "@mantine/core";
import { IconDotsVertical, IconPlayerPlayFilled, IconPrompt, IconShare, IconTemplate, IconTrash } from "@tabler/icons-react";
import { SelectedOptionsWidget } from "../Prompt/SelectedOptionsWidget";
import { Technology } from "../../model/Technology";
import { Provider } from "../../model/Provider";

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

    const use = () => {
        setUserPrompt(usedPrompt.prompt)
        navbarToggle();
    }
    return (
        <AccordionItem value={usedPrompt.prompt} py={"xs"}>
            <AccordionControl px={0}>
                <Group justify="space-between" gap={"xs"} align="center">
                    <Text size="sm" fw={500} lineClamp={20}>
                        {usedPrompt.prompt}
                    </Text>
                </Group>
            </AccordionControl>
            <Accordion.Panel px={0}>
                <Stack>
                    <SelectedOptionsWidget
                        technology={new Technology("Text Generation")}
                        provider={new Provider("Openai")}
                        parameters={[]}
                        modifiers={[]}
                    />

                    <Group px={0} py={"xs"} justify="space-between" align="baseline">
                        <Tooltip label={`${usedPrompt.score}/100`}>
                            <Rating size="xs" readOnly color="blue" value={usedPrompt.score * 5 / 100} />
                        </Tooltip>
                        <Group gap={"xs"}>
                            <Menu withinPortal position="top" shadow="sm">
                                <Menu.Target>
                                    <ActionIcon variant="subtle" color="gray">
                                        <IconDotsVertical style={{ width: rem(16), height: rem(16) }} />
                                    </ActionIcon>
                                </Menu.Target>

                                <Menu.Dropdown>
                                    <Menu.Item leftSection={<IconShare style={{ width: rem(14), height: rem(14) }} />}>
                                        Share
                                    </Menu.Item>
                                    <Menu.Item
                                        leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                                        color="red"
                                    >
                                        Delete
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                            <ActionIcon variant="filled" size={"md"} onClick={use} mx={"md"}>
                                <IconPlayerPlayFilled style={{ width: "60%", height: "60%" }} />
                            </ActionIcon>
                        </Group>
                    </Group>
                </Stack>
            </Accordion.Panel>
        </AccordionItem>
    )
}