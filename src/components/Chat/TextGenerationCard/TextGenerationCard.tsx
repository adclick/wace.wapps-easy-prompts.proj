import { ActionIcon, Avatar, Button, Card, Center, Group, Loader, Stack, Text } from "@mantine/core";
import { useUser } from "../../../context/UserContext";
import favicon from "../../../favicon.svg";
import { PromptRequest } from "../../../model/PromptRequest";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { ChatSavePromptModal } from "../ChatSavePromptModal/ChatSavePromptModal";
import { textGeneration } from "../../../api/aiApi";
import { useEffect, useState } from "react";
import { usePromptsRequests } from "../../../context/PromptsRequestsContext";
import { ThreadHeader } from "../ThreadHeader/ThreadHeader";

interface TextGenerationCard {
    promptRequest: PromptRequest,
    deleteThread: any
}

export function TextGenerationCard({ promptRequest, deleteThread }: TextGenerationCard) {
    const { user } = useUser();
    const { promptsRequests, setPromptsRequests } = usePromptsRequests();
    const [response, setResponse] = useState<any>(false);
    const [newPromptModalOpened, newPromptModaHandle] = useDisclosure(false);

    useEffect(() => {
        if (response) return;
        setResponse(<Center><Loader size={"xs"} mt={"lg"} type="bars" /></Center>);
        fetch();
    });

    const fetch = async () => {
        try {
            const response = await textGeneration(promptRequest);

            setResponse(<Text style={{ whiteSpace: "pre-line" }}>{response.trim()}</Text>)

            // Update request list
            const newRequest = PromptRequest.clone(promptRequest);
            newRequest.response = response;
            promptsRequests[promptRequest.key] = newRequest;
            setPromptsRequests(promptsRequests);

        } catch (error) {
            console.error(error);
            setResponse(<Text style={{ whiteSpace: "pre-line" }}>"Something went wrong. Please contact support"</Text>)
        }
    }

    const save = () => {
    }

    return (
        <>
            <ChatSavePromptModal opened={newPromptModalOpened} handle={newPromptModaHandle} request={promptRequest} />
            <Card p={"md"} shadow="sm" mx={"md"}>
                <Stack gap={"xl"}>
                    <ThreadHeader promptRequest={promptRequest} deleteThread={deleteThread} />
                    <Stack gap={"xl"}>
                        <Group justify="space-between" w={"100%"} align="start">
                            <Group align="flex-start" wrap="nowrap">
                                <Avatar src={user.picture} size={"sm"} />
                                <Stack gap={"xs"}>
                                    <Text fw={700}>{user.username}</Text>
                                    <Text style={{ whiteSpace: "pre-line" }}>
                                        {promptRequest.title}
                                    </Text>
                                </Stack>
                            </Group>
                        </Group>
                        <Group w={"100%"} align="start" wrap="nowrap">
                            <Avatar variant="white" size={"sm"} src={favicon} alt="no image here" />
                            <Stack gap={"xs"}>
                                <Text fw={700}>EasyPrompts</Text>
                                {
                                    response === ""
                                        ? <Center><Loader size={"xs"} type="bars" /></Center>
                                        : <Text style={{ whiteSpace: "pre-line" }}>{response}</Text>
                                }
                            </Stack>
                        </Group>
                    </Stack>
                    <Group>
                        <Button
                            onClick={newPromptModaHandle.open}
                            variant="subtle"
                            leftSection={<IconPlus size={14} />}
                        >
                            Save
                        </Button>
                    </Group>
                </Stack>
            </Card>
        </>
    )
}