import { useDisclosure } from "@mantine/hooks";
import { PromptRequest } from "../../../model/PromptRequest";
import { TextGenerationThread } from "../TextGenerationThread/TextGenerationThread";
import { ChatThread } from "../ChatThread/ChatThread";
import { ImageGenerationThread } from "../ImageGenerationThread/ImageGenerationThread";
import { ThreadHeader } from "../ThreadHeader/ThreadHeader";
import { Card, Collapse, Group, Stack } from "@mantine/core";
import { usePromptsRequests } from "../../../context/PromptsRequestsContext";

interface ThreadItem {
    promptRequest: PromptRequest,
    scrollIntoView: any
}

export function ThreadItem({ promptRequest, scrollIntoView }: ThreadItem) {
    const [minimized, minimizeHandle] = useDisclosure(false);
    const { promptsRequests, setPromptsRequests } = usePromptsRequests();


    const deleteThread = (promptRequest: PromptRequest) => {
        setPromptsRequests(promptsRequests.filter((p) => p.key !== promptRequest.key));
    }

    let thread = <></>;

    switch (promptRequest.technology.slug) {
        case 'text-generation':
            thread = <TextGenerationThread
                key={promptRequest.key}
                promptRequest={promptRequest}
                scrollIntoView={scrollIntoView}
            />
            break;
        case 'chat':
            thread = <ChatThread
                key={promptRequest.key}
                promptRequest={promptRequest}
                scrollIntoView={scrollIntoView}
            />
            break;
        case 'image-generation':
            thread = <ImageGenerationThread
                key={promptRequest.key}
                promptRequest={promptRequest}
                scrollIntoView={scrollIntoView}
            />
            break;
    }

    return (
        <Group justify="center" >

            <Card p={"lg"} shadow="sm" mx={"md"} withBorder w={800}>
                <Stack gap={"xl"}>
                    <ThreadHeader
                        deleteThread={deleteThread}
                        minimized={minimized}
                        minimizeHandle={minimizeHandle}
                        promptRequest={promptRequest}

                    />
                    <Collapse in={!minimized}>
                        <Stack gap={"xl"}>
                            {thread}
                        </Stack>
                    </Collapse>
                </Stack>
            </Card>
        </Group>
    )
}