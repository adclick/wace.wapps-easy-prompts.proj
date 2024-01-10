import { Center, Loader, Stack, Text } from "@mantine/core";
import { useUser } from "../../../context/UserContext";
import { PromptRequest } from "../../../model/PromptRequest";
import { useDisclosure } from "@mantine/hooks";
import { textGeneration } from "../../../api/aiApi";
import { useEffect, useState } from "react";
import { usePromptsRequests } from "../../../context/PromptsRequestsContext";
import { ThreadHeader } from "../ThreadHeader/ThreadHeader";
import { ThreadRequest } from "../ThreadRequest/ThreadRequest";
import { ThreadResponse } from "../ThreadResponse/ThreadResponse";
import { ThreadFooter } from "../ThreadFooter/ThreadFooter";

interface TextGenerationThread {
    promptRequest: PromptRequest,
    deleteThread: any
}

export function TextGenerationThread({ promptRequest, deleteThread }: TextGenerationThread) {
    const { user } = useUser();
    const { promptsRequests, setPromptsRequests } = usePromptsRequests();
    const [response, setResponse] = useState<any>(false);
    const [minimized, minimizeHandle] = useDisclosure(false);

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