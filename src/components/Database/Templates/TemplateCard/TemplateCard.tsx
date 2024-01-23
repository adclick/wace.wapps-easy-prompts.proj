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

interface TemplateCard {
    template: Template,
    cardValue: string | null
}

export function TemplateCard({ template, cardValue }: TemplateCard) {
    const [templateDetailsOpened, templateDetailsHandle] = useDisclosure(false);
    const deleteMutation = useDeleteTemplateMutation();

    return (
        <>
            <TemplateCardDetails opened={templateDetailsOpened} handle={templateDetailsHandle} template={template} />
            <Accordion.Item value={template.id.toString()}>
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
                            />
                        </Group>

                        <Group justify="space-between">
                            <ProviderLabel technology={template.technology} provider={template.provider} />
                            <Checkbox
                                classNames={{
                                    input: classes.inputCheckbox
                                }} value={template.id.toString()}
                                size="sm"
                                onClick={e => e.stopPropagation()}
                            />
                        </Group>
                    </Stack>
                </Accordion.Control >
                <Accordion.Panel>

                    <Stack gap={"xl"}>
                        <Text size="xs">
                            {template.description}
                        </Text>
                        <Center>
                            <Button onClick={templateDetailsHandle.open} variant="transparent" size="xs">
                                Read more
                            </Button>
                        </Center>
                        <Group justify="space-between">
                            <Group gap={"xs"}>
                                <IconUser size={12} />
                                <Text size="xs">{template.user.username}</Text>
                            </Group>
                            <Group gap={"xs"}>
                                <IconClock size={12} />
                                <Text size="xs">{dateUtils.timeAgo(new Date(template.created_at))}</Text>
                            </Group>
                        </Group>
                    </Stack>
                </Accordion.Panel>
            </Accordion.Item >
        </>
    )
}