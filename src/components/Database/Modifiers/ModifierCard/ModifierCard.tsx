import { Accordion, Badge, Group, Stack, Text, Checkbox } from "@mantine/core";
import { Modifier } from "../../../../model/Modifier";
import { useDisclosure } from "@mantine/hooks";
import { ModifierCardDetails } from "../ModifierCardDetails/ModifierCardDetails";
import classes from './ModifierCard.module.css';
import { CardMenu } from "../../../Common/CardMenu/CardMenu";
import { useDeleteModifierMutation } from "../../../../api/modifiersApi";
import { ProviderLabel } from "../../../Common/ProviderLabel/ProviderLabel";
import { DatabaseCardContent } from "../../Common/DatabaseCardContent/DatabaseCardContent";

interface ModifierCard {
    modifier: Modifier,
    itemRef: any
}

export function ModifierCard({ modifier, itemRef }: ModifierCard) {
    const [modifierDetailsOpened, modifierDetailsHandle] = useDisclosure(false);
    const deleteMutation = useDeleteModifierMutation();

    return (
        <>
            <ModifierCardDetails opened={modifierDetailsOpened} handle={modifierDetailsHandle} modifier={modifier} />
            <Accordion.Item ref={itemRef} value={modifier.id.toString()}>
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
                                itemUser={modifier.user}
                            />
                        </Group>

                        <Group justify="space-between">
                            <ProviderLabel size="xs" technology={modifier.technology} provider={modifier.provider} />
                            <Checkbox
                                classNames={{
                                    input: classes.inputCheckbox
                                }}
                                value={modifier.id.toString()}
                                size="md"
                                onClick={e => e.stopPropagation()}
                            />
                        </Group>
                    </Stack>
                </Accordion.Control >
                <Accordion.Panel>
                    <DatabaseCardContent item={modifier} detailsHandle={modifierDetailsHandle} />
                </Accordion.Panel>
            </Accordion.Item >
        </>
    )
}