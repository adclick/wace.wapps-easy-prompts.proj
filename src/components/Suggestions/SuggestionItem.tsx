import { Accordion, AccordionControl, AccordionItem, ActionIcon, Badge, Box, Button, Group, Menu, Rating, Stack, Text, Tooltip, rem } from "@mantine/core";
import { IconArrowRight, IconDotsVertical, IconInfoCircle, IconPlayerPlayFilled, IconPrompt, IconShare, IconTemplate, IconTrash } from "@tabler/icons-react";
import { SelectedOptionsWidget } from "../Prompt/SelectedOptionsWidget";
import { Technology } from "../../model/Technology";
import { Provider } from "../../model/Provider";
import { Suggestion } from "../../model/Suggestion";
import { RepositoryItem } from "@/model/RepositoryItem";

interface SuggestionItem {
    setUserPrompt: any,
    navbarToggle: any,
    repositoryItem: RepositoryItem
}

export function SuggestionItem({
    setUserPrompt,
    navbarToggle,
    repositoryItem
}: SuggestionItem) {

    const use = () => {
        setUserPrompt(repositoryItem.name)
        navbarToggle();
    }
    return (
        <AccordionItem value={repositoryItem.name} py={"md"}>
            <AccordionControl px={0}>
                <Stack>
                    <Text size="sm" fw={500} lineClamp={20}>
                        {repositoryItem.name}
                    </Text>
                    <Group justify="space-between">
                        <Badge size="xs" variant="default">
                            Prompt
                        </Badge>
                        <Tooltip label={`${repositoryItem.name}/100`}>
                            <Rating px={"xs"} size="xs" readOnly color="blue" value={4} />
                            {/* <Rating px={"xs"} size="xs" readOnly color="blue" value={usedPrompt.score * 5 / 100} /> */}
                        </Tooltip>
                    </Group>
                </Stack>
            </AccordionControl>
            <Accordion.Panel px={0}>
                <Stack>
                    <Group px={0} py={"xs"} justify="space-between" align="center">
                        {/* <SelectedOptionsWidget
                            technology={new Technology("Text Generation")}
                            provider={new Provider("Openai")}
                            parameters={[]}
                            modifiers={[]}
                        /> */}
                        <Button radius={"md"} size="xs" variant="light" leftSection={<IconInfoCircle style={{ width: rem(16), height: rem(16) }} />}>
                            Details
                        </Button>
                        <Group gap={"xs"}>
                            <Menu withinPortal position="top" shadow="sm">
                                <Menu.Target>
                                    <ActionIcon variant="subtle" color="gray">
                                        <IconDotsVertical style={{ width: rem(16), height: rem(16) }} />
                                    </ActionIcon>
                                </Menu.Target>

                                <Menu.Dropdown>
                                    <Menu.Item leftSection={<IconTemplate style={{ width: rem(14), height: rem(14) }} />}>
                                        Use as Template
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