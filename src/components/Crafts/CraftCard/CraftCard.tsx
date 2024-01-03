import { Divider, Accordion, ActionIcon, Badge, Button, Group, Stack, Text, Center } from "@mantine/core";
import { IconPlayerPlayFilled, IconStarFilled, IconUser } from "@tabler/icons-react";
import { Craft } from "../../../model/Craft";
import { Technology } from "../../../model/Technology";
import { IconClock } from "@tabler/icons-react";
import dateUtils from "../../../utils/dateUtils";
import { useDisclosure } from "@mantine/hooks";
import { CraftCardDetails } from "../CraftCardDetails/CraftCardDetails";

interface CraftCard {
    craft: Craft,
}

export function CraftCard({
    craft,
}: CraftCard) {
    const [craftDetailsOpened, craftDetailsHandle] = useDisclosure(false);

    const play = (e: any) => {
        e.stopPropagation();


    }

    return (
        <Accordion.Item value={`${craft.type}-${craft.id}`}>
            <Accordion.Control>
                <Stack>
                    <Group justify="space-between" wrap="nowrap" align="flex-start">
                        <Stack gap={0}>
                            <Badge size="xs" variant="transparent" px={0} color="gray.9">
                                {craft.repository.name}
                            </Badge>
                            <Text size="sm" fw={500} lineClamp={20}>
                                {craft.name}
                            </Text>
                        </Stack>
                        <ActionIcon variant="transparent" color="gray.9">
                            {
                                Technology.getIcon(craft.technology.slug, 16)
                            }
                        </ActionIcon>
                    </Group>

                    <Group justify="space-between">
                        <Group>
                            <Group gap={4}>
                                <IconPlayerPlayFilled size={12} />
                                <Text size="xs">{craft.plays}</Text>
                            </Group>
                            <Group gap={4}>
                                <IconStarFilled size={12} />
                                <Text size="xs">{craft.stars}</Text>
                            </Group>
                        </Group>
                        <ActionIcon component="a" variant="filled" size={"md"} onClick={(e: any) => play(e)}>
                            <IconPlayerPlayFilled style={{ width: '50%', height: '50%' }} stroke={1.5} />
                        </ActionIcon>
                    </Group>
                </Stack>
            </Accordion.Control >
            <Accordion.Panel>
                <CraftCardDetails 
                    opened={craftDetailsOpened}
                    handle={craftDetailsHandle}
                    craft={craft}
                />
                <Stack>
                    <Divider />
                    <Text size="xs">{craft.description}</Text>
                    <Stack gap={"xs"}>
                        <Text size="xs" fw={500}>{craft.type.toUpperCase()}</Text>
                        <Text size="xs" fw={500}>{craft.technology.name}</Text>
                    </Stack>
                    <Center>
                        <Button variant="transparent" size="xs" onClick={craftDetailsHandle.open}>
                            Read more
                        </Button>
                    </Center>
                    <Group justify="space-between">
                        <Group gap={"xs"}>
                            <IconUser size={12} />
                            <Text size="xs">{craft.user.username}</Text>
                        </Group>
                        <Group gap={"xs"}>
                            <IconClock size={12} />
                            <Text size="xs">{dateUtils.timeAgo(new Date(craft.created_at))}</Text>
                        </Group>
                    </Group>
                </Stack>
            </Accordion.Panel>
        </Accordion.Item >
    )
}