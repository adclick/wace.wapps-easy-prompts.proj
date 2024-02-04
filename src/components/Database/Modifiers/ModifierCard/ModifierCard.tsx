import { Accordion, Badge, Group, Stack, Text, Checkbox, Modal, Button } from "@mantine/core";
import { Modifier } from "../../../../model/Modifier";
import { useDisclosure } from "@mantine/hooks";
import { ModifierCardDetails } from "../ModifierCardDetails/ModifierCardDetails";
import classes from './ModifierCard.module.css';
import { CardMenu } from "../../../Common/CardMenu/CardMenu";
import { useDeleteModifierMutation } from "../../../../api/modifiersApi";
import { ProviderLabel } from "../../../Common/ProviderLabel/ProviderLabel";
import { DatabaseCardContent } from "../../Common/DatabaseCardContent/DatabaseCardContent";
import { ModifierForm } from "../../../../forms/ModifierForm";

interface ModifierCard {
    modifier: Modifier,
    itemRef: any
}

export function ModifierCard({ modifier, itemRef }: ModifierCard) {
    const [modifierDetailsOpened, modifierDetailsHandle] = useDisclosure(false);
    const deleteMutation = useDeleteModifierMutation();
    const [editOpened, editHandle] = useDisclosure(false);

    return (
        <>
            <ModifierCardDetails
                opened={modifierDetailsOpened}
                handle={modifierDetailsHandle}
                modifier={modifier}
                deleteMutation={deleteMutation}
            />
            <Modal opened={editOpened} onClose={editHandle.close}>
                <ModifierForm modifier={modifier} />
            </Modal>
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
                                hasPublicURL={false}
                                editModalHandle={editHandle}
                            />
                        </Group>

                        <Group justify="space-between" wrap="nowrap">
                            <Badge size={"xs"} variant="dot" h={"auto"}>
                                <ProviderLabel
                                    size="xs"
                                    technology={modifier.technology}
                                    provider={modifier.provider}
                                    templates={[]}
                                    modifiers={[]}
                                />
                            </Badge>
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
                    <Button onClick={editHandle.open}>Edit</Button>
                    <Modal opened={editOpened} onClose={editHandle.close}>
                        <ModifierForm modifier={modifier} />
                    </Modal>
                </Accordion.Panel>
            </Accordion.Item >
        </>
    )
}