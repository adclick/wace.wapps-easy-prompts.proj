import { Accordion, ActionIcon, Badge, Button, Group, Stack, Text, Center } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import { Prompt } from "../../../../model/Prompt";
import { IconClock } from "@tabler/icons-react";
import dateUtils from "../../../../utils/dateUtils";
import { useDisclosure } from "@mantine/hooks";
import { PromptCardDetails } from "../PromptsList/PromptCardDetails/PromptCardDetails";
import { usePromptsRequests } from "../../../../context/PromptsRequestsContext";
import { PromptRequest, PromptRequestType } from "../../../../model/PromptRequest";
import { iconPlay } from "../../../../utils/iconsUtils";
import { getPromptModeByTechnology, getPromptModeColor } from "../../../../model/PromptMode";
import { CardMenu } from "../../../Common/CardMenu/CardMenu";
import { useDeletePromptMutation } from "../../../../api/promptsApi";
import { ProviderLabel } from "../../../Common/ProviderLabel/ProviderLabel";
import { getDefaultProvider } from "../../../../api/providersApi";

interface PromptCard {
    prompt: Prompt,
}

export function PromptCard({ prompt }: PromptCard) {
    const [detailsOpened, detailsHandle] = useDisclosure(false);
    const { promptsRequests, setPromptsRequests } = usePromptsRequests();

    const deleteMutation = useDeletePromptMutation();

    const play = async (e: any) => {
        e.stopPropagation();

        const newPromptRequest = Prompt.clone(prompt) as PromptRequest;
        newPromptRequest.key = Date.now();
        newPromptRequest.isPlayable = true;
        newPromptRequest.type = PromptRequestType.Prompt;

        // If there is no provider, get the default one
        if (!newPromptRequest.provider) {
            newPromptRequest.provider = await getDefaultProvider(newPromptRequest.technology.id);
        }

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
                            <CardMenu
                                detailsHandle={detailsHandle}
                                deleteMutation={deleteMutation}
                                itemId={prompt.id}
                                itemUser={prompt.user}
                            />
                        </Group>

                        <Group justify="space-between">
                            <ProviderLabel technology={prompt.technology} provider={prompt.provider} />
                            <ActionIcon component="a" variant="filled" size={"sm"} onClick={(e: any) => play(e)}>
                                {iconPlay(13)}
                            </ActionIcon>
                        </Group>
                    </Stack>
                </Accordion.Control >
                <Accordion.Panel>
                    <Stack>
                        <Text size="xs">{prompt.description}</Text>
                        <Center>
                            <Button variant="transparent" color="gray" size="xs" onClick={detailsHandle.open}>
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