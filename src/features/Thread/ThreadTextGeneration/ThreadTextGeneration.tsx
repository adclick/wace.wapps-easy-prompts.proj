import { FC } from "react";
import { PromptRequest, PromptRequestType } from "../../../models/PromptRequest";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../../stores/store";
import { useTextGenerationQuery } from "../../../api/textGenerationApi";
import { Stack } from "@mantine/core";
import { Prompt } from "../../../models/Prompt";
import { ThreadFooter } from "../../../components/Threads/Layout/ThreadFooter/ThreadFooter";
import { parseError } from "../../../services/ThreadService";
import { ThreadAssistantLoadingMessage, ThreadAssistantSuccessMessage, ThreadUserMessage } from "../Common";

interface ThreadTextGenerationProps {
    promptRequest: PromptRequest
}

const ThreadTextGeneration: FC<ThreadTextGenerationProps> = ({
    promptRequest
}: ThreadTextGenerationProps) => {
    const [
        user,
        promptsRequests,
        setPromptsRequests
    ] = useStore(useShallow(state => [
        state.user,
        state.promptsRequests,
        state.setPromptsRequests
    ]));

    const { data, error } = useTextGenerationQuery(promptRequest);

    const regenerate = () => {
        const newPromptRequest = Prompt.clone(promptRequest) as PromptRequest;
        newPromptRequest.key = promptRequest.key + 1;
        newPromptRequest.isPlayable = promptRequest.isPlayable;
        newPromptRequest.type = PromptRequestType.Prompt;
        newPromptRequest.response = "";

        const newPromptsRequests = promptsRequests.map(p => p.key === promptRequest.key ? newPromptRequest : p);

        setPromptsRequests(newPromptsRequests);
    }

    if (error) {
        const message = parseError(error);

        return <Stack gap={"lg"}>
            {!promptRequest.isPlayable && <ThreadUserMessage userPicture={user.picture} message={promptRequest.content} />}
            <ThreadAssistantSuccessMessage message={message} reloadFn={regenerate} />
        </Stack>
    }

    if (data) {
        return <Stack gap={"lg"}>
            {!promptRequest.isPlayable && <ThreadUserMessage userPicture={user.picture} message={promptRequest.content} />}
            <ThreadAssistantSuccessMessage message={data} reloadFn={regenerate} />
            <ThreadFooter promptRequest={promptRequest} />
        </Stack>
    }

    return <Stack gap={"lg"}>
        {!promptRequest.isPlayable && <ThreadUserMessage userPicture={user.picture} message={promptRequest.content} />}
        <ThreadAssistantLoadingMessage />
    </Stack>

}

export default ThreadTextGeneration;