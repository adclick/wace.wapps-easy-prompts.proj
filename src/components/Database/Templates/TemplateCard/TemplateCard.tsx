import { Accordion, Badge, Button, Group, Stack, Text, Center, Checkbox } from "@mantine/core";
import { IconPlayerPlayFilled, IconStarFilled, IconUser } from "@tabler/icons-react";
import { IconClock } from "@tabler/icons-react";
import dateUtils from "../../../../utils/dateUtils";
import { Template } from "../../../../model/Template";
import { useDisclosure } from "@mantine/hooks";
import { TemplateCardDetails } from "../TemplateCardDetails/TemplateCardDetails";
import classes from './TemplateCard.module.css';
import { CardMenu } from "../../../Common/CardMenu/CardMenu";
import { useDeleteTemplateMutation } from "../../../../api/templatesApi";
import { ProviderLabel } from "../../../Common/ProviderLabel/ProviderLabel";
import { DatabaseCardContent } from "../../Common/DatabaseCardContent/DatabaseCardContent";

interface TemplateCard {
    template: Template,
    itemRef: any
}

export function TemplateCard({ template, itemRef }: TemplateCard) {
    const [templateDetailsOpened, templateDetailsHandle] = useDisclosure(false);
    const deleteMutation = useDeleteTemplateMutation();

    return (
        <>
            <TemplateCardDetails
                opened={templateDetailsOpened}
                handle={templateDetailsHandle}
                template={template}
                deleteMutation={deleteMutation}
            />
            <Accordion.Item ref={itemRef} value={template.id.toString()}>
                <Accordion.Control>
                    <Stack>
                        <Group justify="space-between" wrap="nowrap" align="flex-start">
                            <Stack gap={0}>
                                <Badge size="xs" variant="transparent" px={0} color="gray.9">
                                    {template.repository.name}
                                </Badge>
                                <Text size="sm" fw={500} lineClamp={20}>
                                    {template.title}
                                </Text>
                            </Stack>
                            <CardMenu
                                detailsHandle={templateDetailsHandle}
                                deleteMutation={deleteMutation}
                                itemId={template.id}
                                itemUser={template.user}
                                hasPublicURL={false}
                            />
                        </Group>

                        <Group justify="space-between" wrap="nowrap">
                            <Badge size={"xs"} variant="dot" h={"auto"}>
                                <ProviderLabel
                                    size="xs"
                                    technology={template.technology}
                                    provider={template.provider}
                                    templates={[]}
                                    modifiers={template.templates_modifiers.map(m => m.modifier)}
                                />
                            </Badge>
                            <Checkbox
                                classNames={{
                                    input: classes.inputCheckbox
                                }} value={template.id.toString()}
                                size="md"
                                onClick={e => e.stopPropagation()}
                            />
                        </Group>
                    </Stack>
                </Accordion.Control >
                <Accordion.Panel>
                    <DatabaseCardContent item={template} detailsHandle={templateDetailsHandle} />
                </Accordion.Panel>
            </Accordion.Item >
        </>
    )
}