import { useDisclosure } from "@mantine/hooks";
import { PromptRequest } from "../../../../model/PromptRequest";
import { TextGenerationThread } from "../../Types/TextGeneration/TextGenerationThread";
import { ChatThread } from "../../Types/ChatThread/ChatThread";
import { ImageGenerationThread } from "../../Types/ImageGeneration/ImageGenerationThread";
import { ThreadHeader } from "../ThreadHeader/ThreadHeader";
import { Card, Collapse, Group, Stack } from "@mantine/core";
import { usePromptsRequests } from "../../../../context/PromptsRequestsContext";
import { TextGenerationPlayableThread } from "../../Types/TextGenerationPlayable/TextGenerationPlayableThread";
import { ImageGenerationPlayableThread } from "../../Types/ImageGenerationPlayable/ImageGenerationPlayableThread";

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
            thread = promptRequest.isPlayable
                ? <TextGenerationPlayableThread
                    key={promptRequest.key}
                    promptRequest={promptRequest}
                    scrollIntoView={scrollIntoView}
                />
                : <TextGenerationThread
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
            thread = promptRequest.isPlayable
                ? <ImageGenerationPlayableThread
                    key={promptRequest.key}
                    promptRequest={promptRequest}
                    scrollIntoView={scrollIntoView}
                />
                : <ImageGenerationThread
                    key={promptRequest.key}
                    promptRequest={promptRequest}
                    scrollIntoView={scrollIntoView}
                />
            break;
    }

    return (
        <Group justify="center" >
            <Card
                p={"lg"}
                shadow="sm"
                mx={"md"}
                withBorder w={800}
            >
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