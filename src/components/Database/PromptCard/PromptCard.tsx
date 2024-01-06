import { Divider, Accordion, ActionIcon, Badge, Button, Group, Stack, Text, Center } from "@mantine/core";
import { IconPlayerPlayFilled, IconStarFilled, IconUser } from "@tabler/icons-react";
import { Prompt } from "../../../model/Prompt";
import { Technology } from "../../../model/Technology";
import { IconClock } from "@tabler/icons-react";
import dateUtils from "../../../utils/dateUtils";
import { useDisclosure } from "@mantine/hooks";
import { Type } from "../../../model/SelectedDatabaseType";
import { PromptCardDetails } from "../PromptCardDetails/PromptCardDetails";
import { usePromptsRequests } from "../../../context/PromptsRequestsContext";
import { PromptRequest } from "../../../model/PromptRequest";

interface PromptCard {
    prompt: Prompt,
    prompts: Prompt[],
    setPrompts: any
}

export function PromptCard({ prompt, prompts, setPrompts }: PromptCard) {
    const [craftDetailsOpened, craftDetailsHandle] = useDisclosure(false);
    const { promptsRequests, setPromptsRequests } = usePromptsRequests();

    const play = (e: any) => {
        e.stopPropagation();

        const newPromptRequest = new PromptRequest();
        newPromptRequest.key = promptsRequests.length;
        newPromptRequest.id = prompt.id;
        newPromptRequest.title = prompt.title;
        newPromptRequest.content = prompt.content;
        newPromptRequest.technology = prompt.technology;

        setPromptsRequests([
            ...promptsRequests,
            newPromptRequest
        ]);
    }

    return (
        <>
            <PromptCardDetails
                opened={craftDetailsOpened}
                handle={craftDetailsHandle}
                prompt={prompt}
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
                            <ActionIcon component="a" variant="transparent" color="gray.9">
                                {
                                    Technology.getIcon(prompt.technology.slug, 16)
                                }
                            </ActionIcon>
                        </Group>

                        <Group justify="space-between">
                            <Group>
                                <Group gap={4}>
                                    <IconPlayerPlayFilled size={12} />
                                    <Text size="xs">{prompt.plays}</Text>
                                </Group>
                                <Group gap={4}>
                                    <IconStarFilled size={12} />
                                    <Text size="xs">{prompt.stars}</Text>
                                </Group>
                            </Group>
                            <ActionIcon component="a" variant="filled" size={"md"} onClick={(e: any) => play(e)}>
                                <IconPlayerPlayFilled style={{ width: '50%', height: '50%' }} stroke={1.5} />
                            </ActionIcon>
                        </Group>
                    </Stack>
                </Accordion.Control >
                <Accordion.Panel>

                    <Stack>
                        <Divider />
                        <Text size="xs">{prompt.description}</Text>
                        <Stack gap={"xs"}>
                            <Text size="xs" fw={500}>{Type.PROMPT}</Text>
                            <Text size="xs" fw={500}>{prompt.technology.name}</Text>
                        </Stack>
                        <Center>
                            <Button variant="transparent" size="xs" onClick={craftDetailsHandle.open}>
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