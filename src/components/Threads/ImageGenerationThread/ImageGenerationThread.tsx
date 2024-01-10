import { ActionIcon, Avatar, Button, Card, Center, Group, Image, Loader, Stack, Text } from "@mantine/core";
import { useUser } from "../../../context/UserContext";
import favicon from "../../../favicon.svg";
import { PromptRequest } from "../../../model/PromptRequest";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { ChatSavePromptModal } from "../../Chat/ChatSavePromptModal/ChatSavePromptModal";
import { imageGeneration } from "../../../api/aiApi";
import { useEffect, useState } from "react";
import { usePromptsRequests } from "../../../context/PromptsRequestsContext";
import { ThreadHeader } from "../ThreadHeader/ThreadHeader";
import { ThreadRequest } from "../ThreadRequest/ThreadRequest";
import { ThreadResponse } from "../ThreadResponse/ThreadResponse";
import { ThreadSaveButton } from "../ThreadSaveButton/ThreadSaveButton";
import { ThreadInfoButton } from "../ThreadInfoButton/ThreadInfoButton";
import { ThreadFooter } from "../ThreadFooter/ThreadFooter";

interface ImageGenerationThread {
    promptRequest: PromptRequest,
    deleteThread: any
}

export function ImageGenerationThread({ promptRequest, deleteThread }: ImageGenerationThread) {
    const { user } = useUser();
    const { promptsRequests, setPromptsRequests } = usePromptsRequests();
    const [response, setResponse] = useState<any>(false);
    const [minimized, minimizeHandle] = useDisclosure(false);

    useEffect(() => {
        if (response) return;
        setResponse(<Center><Loader size={"xs"} type="bars" /></Center>);
        fetch();
    });

    const fetch = async () => {
        try {
            const images = await imageGeneration(promptRequest);

            setResponse(<Group>{images.map(image => <Image key={image} src={image} />)}</Group>)

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
            <ThreadHeader
                promptRequest={promptRequest}
                deleteThread={deleteThread}
                minimized={minimized}
                minimizeHandle={minimizeHandle}
            />
            {
                !minimized &&
                <Stack gap={"xl"}>
                    <ThreadRequest request={promptRequest.title} user={user} />
                    <ThreadResponse response={response} />
                    <ThreadFooter promptRequest={promptRequest} />
                </Stack>
            }
        </>
    )
}