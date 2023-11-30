import { Accordion, AccordionControl, AccordionItem, ActionIcon, Badge, Box, Button, Group, Menu, Rating, Stack, Text, Tooltip, rem } from "@mantine/core";
import { IconArrowRight, IconDotsVertical, IconInfoCircle, IconPlayerPlayFilled, IconPrompt, IconShare, IconSparkles, IconTemplate, IconTrash } from "@tabler/icons-react";
import { RepositoryItem } from "../../model/RepositoryItem";
import { useDisclosure } from "@mantine/hooks";
import { RepositoryItemDetailsModal } from "./RepositoryItemDetailsModal";


interface RepositoryItemRow {
    setUserPrompt: any,
    navbarToggle: any,
    repositoryItem: RepositoryItem,
    repositorySelectedItems: RepositoryItem[],
    setRepositorySelectedItems: any
}

export function RepositoryItemRow({
    setUserPrompt,
    navbarToggle,
    repositoryItem,
    repositorySelectedItems,
    setRepositorySelectedItems
}: RepositoryItemRow) {
    const [detailsModalOpened, detailsModalHandle] = useDisclosure(false);

    const use = () => {
        switch (repositoryItem.type) {
            case "prompt":
                setUserPrompt(repositoryItem.content)
                setRepositorySelectedItems([repositoryItem]);
                navbarToggle();
                break;
            case "template":
            case "modifier":
                setRepositorySelectedItems([repositoryItem])
                break;
        }
    }

    return (
        <AccordionItem value={repositoryItem.name} py={"md"}>
            <AccordionControl px={0}>
                <Stack>
                    <Text size="sm" fw={500} lineClamp={20}>
                        {repositoryItem.name}
                    </Text>
                    <Group justify="space-between">
                        <ActionIcon radius={"sm"} size={"xs"} color={repositoryItem.color}>
                            {
                                repositoryItem.type === "prompt" && <IconPrompt style={{width: rem(14), height: rem(14)}} />
                            }
                            {
                                repositoryItem.type === "template" && <IconTemplate style={{width: rem(14), height: rem(14)}} />
                            }
                            {
                                repositoryItem.type === "modifier" && <IconSparkles style={{width: rem(14), height: rem(14)}} />
                            }
                        </ActionIcon>
                        {/* <Badge size="xs" variant="dot" color={repositoryItem.color}>
                            {repositoryItem.type}
                        </Badge> */}
                        <Tooltip label={`${repositoryItem.score}/100`}>
                            {/* <Rating px={"xs"} size="xs" readOnly color="blue" value={4} /> */}
                            <Rating px={"xs"} size="xs" readOnly color={"blue"} value={repositoryItem.score * 5 / 100} />
                        </Tooltip>
                    </Group>
                </Stack>
            </AccordionControl>
            <Accordion.Panel px={0}>
                <Stack>
                    <RepositoryItemDetailsModal
                        opened={detailsModalOpened}
                        close={detailsModalHandle.close}
                    />
                    <Group px={0} py={"xs"} justify="space-between" align="center">
                        {/* <SelectedOptionsWidget
                            technology={new Technology("Text Generation")}
                            provider={new Provider("Openai")}
                            parameters={[]}
                            modifiers={[]}
                        /> */}
                        <Button color={repositoryItem.color} onClick={detailsModalHandle.open} radius={"md"} size="xs" variant="light" leftSection={<IconInfoCircle style={{ width: rem(16), height: rem(16) }} />}>
                            {repositoryItem.type.toUpperCase()}
                        </Button>
                        <Group gap={"xs"} mx={"lg"}>
                            <Menu withinPortal position="top" shadow="sm">
                                <Menu.Target>
                                    <ActionIcon variant="subtle" color="gray">
                                        <IconDotsVertical style={{ width: rem(16), height: rem(16) }} />
                                    </ActionIcon>
                                </Menu.Target>

                                <Menu.Dropdown>
                                    <Menu.Item disabled leftSection={<IconArrowRight style={{ width: rem(14), height: rem(14) }} />}>
                                        Copy to Repository
                                    </Menu.Item>
                                    <Menu.Item
                                        disabled
                                        leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                                        color="red"
                                    >
                                        Delete
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                            <ActionIcon color={repositoryItem.color} variant="filled" size={"md"} onClick={use}>
                                <IconPlayerPlayFilled style={{ width: "60%", height: "60%" }} />
                            </ActionIcon>
                        </Group>
                    </Group>
                </Stack>
            </Accordion.Panel>
        </AccordionItem>
    )
}