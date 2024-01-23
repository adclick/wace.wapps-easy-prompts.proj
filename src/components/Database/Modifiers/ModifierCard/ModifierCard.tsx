import { Accordion, Badge, Button, Group, Stack, Text, Center, Checkbox, UnstyledButton } from "@mantine/core";
import { IconPlayerPlayFilled, IconStarFilled, IconUser } from "@tabler/icons-react";
import { IconClock } from "@tabler/icons-react";
import dateUtils from "../../../../utils/dateUtils";
import { Modifier } from "../../../../model/Modifier";
import { useDisclosure } from "@mantine/hooks";
import { ModifierCardDetails } from "../ModifierCardDetails/ModifierCardDetails";
import classes from './ModifierCard.module.css';
import { CardMenu } from "../../../Common/CardMenu/CardMenu";
import { useDeleteModifierMutation } from "../../../../api/modifiersApi";

interface ModifierCard {
    modifier: Modifier,
}

export function ModifierCard({ modifier }: ModifierCard) {
    const [modifierDetailsOpened, modifierDetailsHandle] = useDisclosure(false);
    const deleteMutation = useDeleteModifierMutation();

    return (
        <>
            <ModifierCardDetails opened={modifierDetailsOpened} handle={modifierDetailsHandle} modifier={modifier} />
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
                            <CardMenu
                                detailsHandle={modifierDetailsHandle}
                                deleteMutation={deleteMutation}
                                itemId={modifier.id}
                            />
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
                            <Checkbox
                                classNames={{
                                    input: classes.inputCheckbox
                                }} 
                                value={modifier.id.toString()}
                                size="sm"
                                onClick={e => e.stopPropagation()}
                            />
                        </Group>
                    </Stack>
                </Accordion.Control >
                <Accordion.Panel>

                    <Stack>
                        <Text size="xs">{modifier.description}</Text>
                        <Center>
                            <Button onClick={modifierDetailsHandle.open} variant="transparent" size="xs">
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