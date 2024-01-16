import { Accordion, Badge, Button, Group, Stack, Text, Center, Checkbox, UnstyledButton, Radio } from "@mantine/core";
import { IconPlayerPlayFilled, IconStarFilled, IconUser } from "@tabler/icons-react";
import { IconClock } from "@tabler/icons-react";
import dateUtils from "../../../utils/dateUtils";
import { Template } from "../../../model/Template";
import { useDisclosure } from "@mantine/hooks";
import { TemplateCardDetails } from "../TemplateCardDetails/TemplateCardDetails";
import classes from './TemplateCard.module.css';
import { useSelectedTemplate } from "../../../context/SelectedTemplateContext";
import { useRef } from "react";

interface TemplateCard {
    template: Template,
}

export function TemplateCard({ template }: TemplateCard) {
    const [templateDetailsOpened, templateDetailsHandle] = useDisclosure(false);
    const { selectedTemplate, setSelectedTemplate } = useSelectedTemplate();
    const ref = useRef();
    const [checked, checkedHandle] = useDisclosure(false);

    const onRadioClick = (e: any) => {
        e.stopPropagation();

        if (e.target.value === selectedTemplate.id.toString()) {
            setSelectedTemplate(new Template())
        }
    }

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
                        </Group>

                        <Group justify="space-between">
                            <Group>
                                <Group gap={4}>
                                    <IconPlayerPlayFilled size={12} />
                                    <Text size="xs">{template.plays}</Text>
                                </Group>
                                <Group gap={4}>
                                    <IconStarFilled size={12} />
                                    <Text size="xs">{template.stars}</Text>
                                </Group>
                            </Group>
                            <Radio classNames={{radio: classes.inputRadio}} value={template.id.toString()} size="md" onClick={onRadioClick} />
                        </Group>
                    </Stack>
                </Accordion.Control >
                <Accordion.Panel>

                    <Stack>
                        <Text size="xs">{template.description}</Text>
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