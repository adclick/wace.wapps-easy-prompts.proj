import { Accordion, ActionIcon, Badge, Button, Group, Stack, Text, Center, Paper } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import { Prompt } from "../../../../model/Prompt";
import { IconClock } from "@tabler/icons-react";
import dateUtils from "../../../../utils/dateUtils";
import { useDisclosure } from "@mantine/hooks";
import { PromptCardDetails } from "../PromptCardDetails/PromptCardDetails";
import { usePromptsRequests } from "../../../../context/PromptsRequestsContext";
import { PromptRequest, PromptRequestType } from "../../../../model/PromptRequest";
import { iconPlay } from "../../../../utils/iconsUtils";
import { getPromptModeByTechnology, getPromptModeColor } from "../../../../model/PromptMode";
import { CardMenu } from "../../../Common/CardMenu/CardMenu";
import { useDeletePromptMutation } from "../../../../api/promptsApi";
import { ProviderLabel } from "../../../Common/ProviderLabel/ProviderLabel";
import { getDefaultProvider } from "../../../../api/providersApi";
import { DatabaseCardContent } from "../../Common/DatabaseCardContent/DatabaseCardContent";

interface PromptCard {
    prompt: Prompt,
    navbarMobileHandle: any,
    itemRef: any
}

export function PromptCard({ prompt, navbarMobileHandle, itemRef }: PromptCard) {
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

        navbarMobileHandle.close();

        setPromptsRequests([
            ...promptsRequests,
            newPromptRequest
        ]);
    }

    return (
        <>
            <PromptCardDetails
                opened={detailsOpened}
                handle={detailsHandle}
                prompt={prompt}
                deleteMutation={deleteMutation}
            />
            <Accordion.Item ref={itemRef}  value={`${prompt.type}-${prompt.id}`}>
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
                            <ProviderLabel size="xs" technology={prompt.technology} provider={prompt.provider} />
                            <ActionIcon component="a" variant="filled" size={"md"} onClick={(e: any) => play(e)}>
                                {iconPlay(14)}
                            </ActionIcon>
                        </Group>
                    </Stack>
                </Accordion.Control >
                <Accordion.Panel>
                    <DatabaseCardContent item={prompt} detailsHandle={detailsHandle} />
                </Accordion.Panel>
            </Accordion.Item >
        </>
    )
}