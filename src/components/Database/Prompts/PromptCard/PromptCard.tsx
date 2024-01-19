import { Accordion, ActionIcon, Badge, Button, Group, Stack, Text, Center } from "@mantine/core";
import { IconPlayerPlayFilled, IconStarFilled, IconUser } from "@tabler/icons-react";
import { Prompt } from "../../../../model/Prompt";
import { IconClock } from "@tabler/icons-react";
import dateUtils from "../../../../utils/dateUtils";
import { useDisclosure } from "@mantine/hooks";
import { PromptCardDetails } from "../PromptsList/PromptCardDetails/PromptCardDetails";
import { usePromptsRequests } from "../../../../context/PromptsRequestsContext";
import { PromptRequest } from "../../../../model/PromptRequest";
import { PromptCardMenu } from "../PromptCardMenu/PromptCardMenu";
import { iconPlay } from "../../../../utils/iconsUtils";
import { usePromptMode } from "../../../../context/PromptModeContext";
import { getPromptModeByTechnology, getPromptModeColor } from "../../../../model/PromptMode";

interface PromptCard {
    prompt: Prompt,
}

export function PromptCard({ prompt }: PromptCard) {
    const [detailsOpened, detailsHandle] = useDisclosure(false);
    const { promptsRequests, setPromptsRequests } = usePromptsRequests();
    const { promptMode } = usePromptMode();

    const play = (e: any) => {
        e.stopPropagation();

        const newPromptRequest = Prompt.clone(prompt) as PromptRequest;
        newPromptRequest.key = Date.now();
        newPromptRequest.isPlayable = true;

        setPromptsRequests([
            ...promptsRequests,
            newPromptRequest
        ]);
    }

    const color = getPromptModeColor(getPromptModeByTechnology(prompt.technology));

    return (
        <>
            <PromptCardDetails
                opened={detailsOpened}
                handle={detailsHandle}
                prompt={prompt}
                play={play}
            />
            <Accordion.Item value={`${prompt.type}-${prompt.id}`}>
                <Accordion.Control>
                    <Stack>
                        <Group justify="space-between" wrap="nowrap" align="flex-start">
                            <Stack gap={0}>
                                <Badge size="xs" variant="transparent" px={0} color="gray.9">
                                    {prompt.repository.name}
                                </Badge>
                                <Text size="sm" fw={500} lineClamp={20}>
                                    {prompt.title}
                                </Text>
                            </Stack>
                            <PromptCardMenu detailsHandle={detailsHandle} />
                        </Group>

                        <Group justify="space-between">
                            <Group>
                                <Group gap={6}>
                                    <IconPlayerPlayFilled size={12} />
                                    <Text size="xs">{prompt.plays}</Text>
                                </Group>
                                <Group gap={6}>
                                    <IconStarFilled size={12} />
                                    <Text size="xs">{prompt.stars}</Text>
                                </Group>
                            </Group>
                            <ActionIcon color={color} component="a" variant="filled" size={"sm"} onClick={(e: any) => play(e)}>
                                {iconPlay(13)}
                            </ActionIcon>
                        </Group>
                    </Stack>
                </Accordion.Control >
                <Accordion.Panel>
                    <Stack>
                        <Text size="xs">{prompt.description}</Text>
                        <Center>
                            <Button color={color} variant="transparent" size="xs" onClick={detailsHandle.open}>
                                Read more
                            </Button>
                        </Center>
                        <Group justify="space-between">
                            <Group gap={"xs"}>
                                <IconUser size={12} />
                                <Text size="xs">{prompt.user.username}</Text>
                            </Group>
                            <Group gap={"xs"}>
                                <IconClock size={12} />
                                <Text size="xs">{dateUtils.timeAgo(new Date(prompt.created_at))}</Text>
                            </Group>
                        </Group>
                    </Stack>
                </Accordion.Panel>
            </Accordion.Item >
        </>
    )
}