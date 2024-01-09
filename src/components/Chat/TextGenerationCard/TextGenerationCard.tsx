import { Avatar, Button, Card, Center, Group, Loader, Stack, Text } from "@mantine/core";
import { useUser } from "../../../context/UserContext";
import favicon from "../../../favicon.svg";
import { PromptRequest } from "../../../model/PromptRequest";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { ChatSavePromptModal } from "../ChatSavePromptModal/ChatSavePromptModal";
import { textGeneration } from "../../../api/aiApi";
import { useEffect, useState } from "react";
import { usePromptsRequests } from "../../../context/PromptsRequestsContext";

interface TextGenerationCard {
    promptRequest: PromptRequest,
}

export function TextGenerationCard({ promptRequest }: TextGenerationCard) {
    const { user } = useUser();
    const { promptsRequests, setPromptsRequests } = usePromptsRequests();
    const [response, setResponse] = useState<any>(false);
    const [newPromptModalOpened, newPromptModaHandle] = useDisclosure(false);

    useEffect(() => {
        if (response) return;
        setResponse(<Center><Loader size={"xs"} type="bars" /></Center>);
        fetch();
    });

    const fetch = async () => {
        try {
            const response = await textGeneration(promptRequest);

            setResponse(<Text style={{ whiteSpace: "pre-line" }}>{response}</Text>)

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
            <Card p={"md"} shadow="sm">
                <Stack gap={"xl"}>
                    <Stack py={"xs"}>
                        <Group>
                            <Avatar src={user.picture} size={"sm"} />
                            <Text>{user.username}</Text>
                        </Group>
                        <Text style={{ whiteSpace: "pre-line" }}>
                            {promptRequest.title}
                        </Text>
                    </Stack>
                    <Stack>
                        <Group>
                            <Avatar variant="white" size={"sm"} src={favicon} alt="no image here" />
                            <Text>EasyPrompts</Text>
                        </Group>
                        {response}
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
                </Stack>
            </Card>
        </>
    )
}