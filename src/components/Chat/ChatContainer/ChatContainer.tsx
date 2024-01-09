import { Stack } from "@mantine/core";
import { usePromptsRequests } from "../../../context/PromptsRequestsContext";
import { PromptRequest } from "../../../model/PromptRequest";
import { TextGenerationCard } from "../TextGenerationCard/TextGenerationCard";
import { ChatCard } from "../ChatCard/ChatCard";
import { ImageGenerationCard } from "../ImageGenerationCard/ImageGenerationCard";

export function ChatContainer() {
    const { promptsRequests } = usePromptsRequests();

    return (
        <Stack gap={"md"} my={"xs"}>
            {
                promptsRequests.map((promptRequest: PromptRequest) => {
                    switch(promptRequest.technology.slug) {
                        case 'text-generation':
                            return <TextGenerationCard key={promptRequest.key} promptRequest={promptRequest} />
                        case 'chat':
                            return <ChatCard key={promptRequest.key} promptRequest={promptRequest} />
                        case 'image-generation':
                            return <ImageGenerationCard key={promptRequest.key} promptRequest={promptRequest} />
                    }
                })
            }
        </Stack>
    )
}