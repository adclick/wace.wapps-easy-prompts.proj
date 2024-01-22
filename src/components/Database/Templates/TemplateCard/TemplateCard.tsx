import { Accordion, Badge, Button, Group, Stack, Text, Center, Textarea, ActionIcon, Radio } from "@mantine/core";
import { IconPlayerPlayFilled, IconStarFilled, IconUser } from "@tabler/icons-react";
import { IconClock } from "@tabler/icons-react";
import dateUtils from "../../../../utils/dateUtils";
import { Template } from "../../../../model/Template";
import { useDisclosure } from "@mantine/hooks";
import { TemplateCardDetails } from "../TemplateCardDetails/TemplateCardDetails";
import { useRef, useState } from "react";
import { usePromptsRequests } from "../../../../context/PromptsRequestsContext";
import { PromptRequest, PromptRequestType } from "../../../../model/PromptRequest";
import { Prompt } from "../../../../model/Prompt";
import { iconPlay } from "../../../../utils/iconsUtils";
import classes from './TemplateCard.module.css'
import { CardMenu } from "../../../Common/CardMenu/CardMenu";
import { useDeleteTemplateMutation } from "../../../../api/templatesApi";

interface TemplateCard {
    template: Template,
    cardValue: string | null
}

export function TemplateCard({ template, cardValue }: TemplateCard) {
    const [templateDetailsOpened, templateDetailsHandle] = useDisclosure(false);
    const { promptsRequests, setPromptsRequests } = usePromptsRequests();
    const [text, setText] = useState('');
    const deleteMutation = useDeleteTemplateMutation();

    const play = (e: any) => {
        e.stopPropagation();

        const newPromptRequest = Prompt.buildFromTemplate(template) as PromptRequest;
        newPromptRequest.key = Date.now();
        newPromptRequest.isPlayable = true;
        newPromptRequest.type = PromptRequestType.Template;
        newPromptRequest.content = text;

        setPromptsRequests([
            ...promptsRequests,
            newPromptRequest
        ]);
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
                            <CardMenu
                                detailsHandle={templateDetailsHandle}
                                deleteMutation={deleteMutation}
                                itemId={template.id}
                            />
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
                            <Radio
                                classNames={{ radio: classes.inputRadio }}
                                value={template.id.toString()}
                                size="sm"
                                readOnly
                                checked={template.id.toString() === cardValue}
                            />
                        </Group>
                    </Stack>
                </Accordion.Control >
                <Accordion.Panel>

                    <Stack gap={"xl"}>
                        <Text size="xs">
                            {template.description}
                        </Text>
                        <Group wrap="nowrap">
                            <Textarea
                                placeholder="Reply here"
                                autosize
                                autoFocus
                                minRows={1}
                                maxRows={6}
                                size="xs"
                                w={"100%"}
                                styles={{
                                    input: {
                                        paddingRight: "50px",
                                    },

                                }}
                                value={text}
                                onChange={e => setText(e.target.value)}
                            />
                            <ActionIcon
                                color="gray"
                                variant="transparent"
                                size="xs"
                                pos={"absolute"}
                                right={"25px"}
                                onClick={play}
                            >
                                {iconPlay(12)}
                            </ActionIcon>
                        </Group>
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