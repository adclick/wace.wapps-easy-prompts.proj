import { Divider, Accordion, ActionIcon, Badge, Button, Group, Stack, Text, Center, Checkbox } from "@mantine/core";
import { IconPlayerPlayFilled, IconStarFilled, IconUser } from "@tabler/icons-react";
import { IconClock } from "@tabler/icons-react";
import dateUtils from "../../../utils/dateUtils";
import { useDisclosure } from "@mantine/hooks";
import { useRequests } from "../../../context/RequestsContext";
import { Request } from "../../../model/Request";
import { Modifier } from "../../../model/Modifier";

interface ModifierCard {
    modifier: Modifier,
    modifiers: Modifier[],
    setModifiers: any
}

export function ModifierCard({
    modifier,
    modifiers,
    setModifiers
}: ModifierCard) {
    const [craftDetailsOpened, craftDetailsHandle] = useDisclosure(false);
    const { requests, setRequests } = useRequests();

    return (
        <>
            {/* <PromptCardDetails
                opened={craftDetailsOpened}
                handle={craftDetailsHandle}
                prompt={prompt}
            /> */}
            <Accordion.Item value={modifier.id.toString()}>
                <Accordion.Control>
                    <Stack>
                        <Group justify="space-between" wrap="nowrap" align="flex-start">
                            <Stack gap={0}>
                                <Badge size="xs" variant="transparent" px={0} color="gray.9">
                                    {modifier.repository.name}
                                </Badge>
                                <Text size="sm" fw={500} lineClamp={20}>
                                    {modifier.title}
                                </Text>
                            </Stack>
                        </Group>

                        <Group justify="space-between">
                            <Group>
                                <Group gap={4}>
                                    <IconPlayerPlayFilled size={12} />
                                    <Text size="xs">{modifier.plays}</Text>
                                </Group>
                                <Group gap={4}>
                                    <IconStarFilled size={12} />
                                    <Text size="xs">{modifier.stars}</Text>
                                </Group>
                            </Group>
                                <Checkbox value={modifier.id.toString()} size="md" onClick={e => e.stopPropagation()} />
                        </Group>
                    </Stack>
                </Accordion.Control >
                <Accordion.Panel>

                    <Stack>
                        <Text size="xs">{modifier.description}</Text>
                        <Center>
                            <Button variant="transparent" size="xs" onClick={craftDetailsHandle.open}>
                                Read more
                            </Button>
                        </Center>
                        <Group justify="space-between">
                            <Group gap={"xs"}>
                                <IconUser size={12} />
                                <Text size="xs">{modifier.user.username}</Text>
                            </Group>
                            <Group gap={"xs"}>
                                <IconClock size={12} />
                                <Text size="xs">{dateUtils.timeAgo(new Date(modifier.created_at))}</Text>
                            </Group>
                        </Group>
                    </Stack>
                </Accordion.Panel>
            </Accordion.Item >
        </>
    )
}