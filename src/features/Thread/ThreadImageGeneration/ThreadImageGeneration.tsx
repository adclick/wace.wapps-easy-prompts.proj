import { FC } from "react";
import { PromptRequest, PromptRequestType } from "../../../models/PromptRequest";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../../stores/store";
import { useImageGenerationQuery } from "../../../api/imageGenerationApi";
import { Prompt } from "../../../models/Prompt";
import { parseError } from "../../../services/ThreadService";
import { Image, Stack } from "@mantine/core";
import { ThreadAssistantLoadingMessage, ThreadAssistantSuccessMessage, ThreadUserMessage } from "../Common";
import { ThreadFooter } from "../../../components/Threads/Layout/ThreadFooter/ThreadFooter";
import { ThreadDownloadButton } from "../../../components/Threads/Buttons/ThreadDownloadButton/ThreadDownloadButton";

interface ThreadImageGenerationProps {
    promptRequest: PromptRequest
}

const ThreadImageGeneration: FC<ThreadImageGenerationProps> = ({
    promptRequest
}: ThreadImageGenerationProps) => {
    const [
        user,
        promptsRequests,
        setPromptsRequests
    ] = useStore(useShallow(state => [
        state.user,
        state.promptsRequests,
        state.setPromptsRequests
    ]));

    const { data, error } = useImageGenerationQuery(promptRequest);

    const regenerate = () => {
        const newPromptRequest = Prompt.clone(promptRequest) as PromptRequest;
        newPromptRequest.key = promptRequest.key + 1;
        newPromptRequest.isPlayable = false;
        newPromptRequest.type = PromptRequestType.Prompt;
        newPromptRequest.response = "";

        const newPromptsRequests = promptsRequests.map(p => p.key === promptRequest.key ? newPromptRequest : p);

        setPromptsRequests(newPromptsRequests);
    }

    if (error) {
        const message = parseError(error);

        return <Stack gap={"lg"}>
            <ThreadUserMessage username={user.username} userPicture={user.picture} message={promptRequest.content} />
            <ThreadAssistantSuccessMessage message={message} reloadFn={regenerate} />
        </Stack>
    }

    if (data) {
        const message = <Stack>
            {
                typeof data === "object" &&
                data.map((src: string) => {
                    return (
                        <Stack gap={"xs"} key={src}>
                            <Image src={src} />
                            <ThreadDownloadButton url={src} />
                        </Stack>
                    )
                })
            }
        </Stack>

        return <Stack gap={"lg"}>
            <ThreadUserMessage username={user.username} userPicture={user.picture} message={promptRequest.content} />
            <ThreadAssistantSuccessMessage message={message} copyButton={false} reloadFn={regenerate}  />
            <ThreadFooter promptRequest={promptRequest} />
        </Stack>
    }

    return <Stack gap={"lg"}>
        <ThreadUserMessage username={user.username} userPicture={user.picture} message={promptRequest.content} />
        <ThreadAssistantLoadingMessage />
    </Stack>
}

export default ThreadImageGeneration;