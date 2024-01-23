import { useDisclosure } from "@mantine/hooks";
import { PromptRequest, PromptRequestType } from "../../../../model/PromptRequest";
import { TextGenerationThread } from "../../Types/TextGenerationThread/TextGenerationThread";
import { ChatThread } from "../../Types/ChatThread/ChatThread";
import { ImageGenerationThread } from "../../Types/ImageGeneration/ImageGenerationThread";
import { ThreadHeader } from "../ThreadHeader/ThreadHeader";
import { Card, Collapse, Group, Stack } from "@mantine/core";
import { usePromptsRequests } from "../../../../context/PromptsRequestsContext";
import { getPromptModeByTechnology, getPromptModeColor } from "../../../../model/PromptMode";
import { TextGenerationThreadByPrompt } from "../../Types/TextGenerationThreadByPrompt/TextGenerationThreadByPrompt";
import { TextGenerationThreadByTemplate } from "../../Types/TextGenerationThreadByTemplate/TextGenerationThreadByTemplate";
import { ImageGenerationThreadByTemplateId } from "../../Types/ImageGenerationThreadByTemplateId/ImageGenerationThreadByTemplateId";
import { ImageGenerationThreadByPromptId } from "../../Types/ImageGenerationThreadByPromptId/ImageGenerationThreadByPromptId";

interface ThreadItem {
    promptRequest: PromptRequest,
    scrollIntoView: any
}

export function ThreadItem({ promptRequest, scrollIntoView }: ThreadItem) {
    const [minimized, minimizeHandle] = useDisclosure(false);
    const { promptsRequests, setPromptsRequests } = usePromptsRequests();

    const color = getPromptModeColor(getPromptModeByTechnology(promptRequest.technology));

    const deleteThread = (promptRequest: PromptRequest) => {
        setPromptsRequests(promptsRequests.filter((p) => p.key !== promptRequest.key));
    }

    let thread = <></>;

    switch (promptRequest.technology.slug) {
        case 'text-generation':
            switch (promptRequest.type) {
                case PromptRequestType.New:
                    thread = <TextGenerationThread
                        key={promptRequest.key}
                        promptRequest={promptRequest}
                        scrollIntoView={scrollIntoView}
                    />;
                    break;
                case PromptRequestType.Prompt:
                    thread = <TextGenerationThreadByPrompt
                        key={promptRequest.key}
                        promptRequest={promptRequest}
                        scrollIntoView={scrollIntoView}
                    />;
                    break;
                case PromptRequestType.Template:
                    thread = <TextGenerationThreadByTemplate
                        key={promptRequest.key}
                        promptRequest={promptRequest}
                        scrollIntoView={scrollIntoView}
                    />;
                    break;
            }
            break;
        case 'chat':
            thread = <ChatThread
                key={promptRequest.key}
                promptRequest={promptRequest}
                scrollIntoView={scrollIntoView}
                color={color}
            />
            break;
        case 'image-generation':
            switch (promptRequest.type) {
                case PromptRequestType.New:
                    thread = <ImageGenerationThread
                        key={promptRequest.key}
                        promptRequest={promptRequest}
                        scrollIntoView={scrollIntoView}
                        color={color}
                    />;
                    break;
                case PromptRequestType.Prompt:
                    thread = <ImageGenerationThreadByPromptId
                        key={promptRequest.key}
                        promptRequest={promptRequest}
                        scrollIntoView={scrollIntoView}
                        color={color}
                    />;
                    break;
                case PromptRequestType.Template:
                    thread = <ImageGenerationThreadByTemplateId
                        key={promptRequest.key}
                        promptRequest={promptRequest}
                        scrollIntoView={scrollIntoView}
                        color={color}
                    />;
                    break;
            }
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