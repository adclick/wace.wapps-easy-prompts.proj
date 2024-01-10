import { Card, Stack } from "@mantine/core";
import { usePromptsRequests } from "../../../context/PromptsRequestsContext";
import { PromptRequest } from "../../../model/PromptRequest";
import { TextGenerationThread } from "../TextGenerationThread/TextGenerationThread";
import { ChatThread } from "../ChatThread/ChatThread";
import { ImageGenerationThread } from "../ImageGenerationThread/ImageGenerationThread";

export function ThreadList() {
    const { promptsRequests, setPromptsRequests } = usePromptsRequests();

    const deleteThread = (promptRequest: PromptRequest) => {
        setPromptsRequests(promptsRequests.filter((p) => p.key !== promptRequest.key));
    }

    let thread = <></>;

    return (
        <Stack gap={"xl"} my={"xs"}>
            {
                promptsRequests.map((promptRequest: PromptRequest) => {
                    switch (promptRequest.technology.slug) {
                        case 'text-generation':
                            thread = <TextGenerationThread
                                key={promptRequest.key}
                                promptRequest={promptRequest}
                                deleteThread={deleteThread}
                            />
                            break;
                        case 'chat':
                            thread = <ChatThread
                                key={promptRequest.key}
                                promptRequest={promptRequest}
                                deleteThread={deleteThread}
                            />
                            break;
                        case 'image-generation':
                            thread = <ImageGenerationThread
                                key={promptRequest.key}
                                promptRequest={promptRequest}
                                deleteThread={deleteThread}
                            />
                            break;
                    }

                    return (
                        <Card p={"lg"} shadow="sm" mx={"md"}>
                            <Stack gap={"xl"}>
                                {thread}
                            </Stack>
                        </Card>
                    )
                })
            }
        </Stack>
    )
}