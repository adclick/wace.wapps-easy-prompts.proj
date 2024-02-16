import { useDisclosure } from "@mantine/hooks";
import { PromptRequest, PromptRequestType } from "../../../../models/PromptRequest";
import { TextGenerationThread } from "../../Types/TextGenerationThread/TextGenerationThread";
import { ChatThread } from "../../Types/ChatThread/ChatThread";
import { ImageGenerationThread } from "../../Types/ImageGeneration/ImageGenerationThread";
import { ThreadHeader } from "../ThreadHeader/ThreadHeader";
import { Card, Collapse, Group, Stack } from "@mantine/core";
import { TextGenerationThreadByPrompt } from "../../Types/TextGenerationThreadByPrompt/TextGenerationThreadByPrompt";
import { ImageGenerationThreadByPromptId } from "../../Types/ImageGenerationThreadByPromptId/ImageGenerationThreadByPromptId";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../../../stores/store";
import ThreadChat from "../../../../features/Thread/ThreadChat/ThreadChat";
import ThreadTextGeneration from "../../../../features/Thread/ThreadTextGeneration/ThreadTextGeneration";
import ThreadImageGeneration from "../../../../features/Thread/ThreadImageGeneration/ThreadImageGeneration";

interface ThreadItem {
    promptRequest: PromptRequest,
    scrollIntoView: any
}

export function ThreadItem({ promptRequest, scrollIntoView }: ThreadItem) {
    const [
        promptsRequests,
        setPromptsRequests,
    ] = useStore(useShallow(state => [
        state.promptsRequests,
        state.setPromptsRequests
    ]));

    const [minimized, minimizeHandle] = useDisclosure(false);

    const deleteThread = (promptRequest: PromptRequest) => {
        setPromptsRequests(promptsRequests.filter((p) => p.key !== promptRequest.key));
    }

    let thread = <></>;

    switch (promptRequest.technology.slug) {
        case 'text-generation':
            thread = <ThreadTextGeneration
                promptRequest={promptRequest}
            />;
            break;
        case 'chat':
            thread = <ThreadChat
                promptRequest={promptRequest}
            />
            break;
        case 'image-generation':
            thread = <ThreadImageGeneration
                promptRequest={promptRequest}
            />;
            break;
    }

    return (
        <Group justify="center" >
            <Card
                p={"sm"}
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