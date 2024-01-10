import { Stack } from "@mantine/core";
import { usePromptsRequests } from "../../../context/PromptsRequestsContext";
import { PromptRequest } from "../../../model/PromptRequest";
import { TextGenerationCard } from "../TextGenerationCard/TextGenerationCard";
import { ChatCard } from "../ChatCard/ChatCard";
import { ImageGenerationCard } from "../ImageGenerationCard/ImageGenerationCard";

export function ChatContainer() {
    const { promptsRequests, setPromptsRequests } = usePromptsRequests();

    const deleteThread = (promptRequest: PromptRequest) => {
        setPromptsRequests(promptsRequests.filter((p) => p.key !== promptRequest.key));
    }

    return (
        <Stack gap={"xl"} my={"xs"}>
            {
                promptsRequests.map((promptRequest: PromptRequest) => {
                    switch (promptRequest.technology.slug) {
                        case 'text-generation':
                            return <TextGenerationCard
                                key={promptRequest.key}
                                promptRequest={promptRequest}
                                deleteThread={deleteThread}
                            />
                        case 'chat':
                            return <ChatCard
                                key={promptRequest.key}
                                promptRequest={promptRequest}
                                deleteThread={deleteThread}
                            />
                        case 'image-generation':
                            return <ImageGenerationCard
                                key={promptRequest.key}
                                promptRequest={promptRequest}
                                deleteThread={deleteThread}
                            />
                    }
                })
            }
        </Stack>
    )
}