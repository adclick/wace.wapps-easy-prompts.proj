import { Group, Loader, Stack, Text } from "@mantine/core";
import { PromptRequest, PromptRequestType } from "../../../../models/PromptRequest";
import { ThreadFooter } from "../../Layout/ThreadFooter/ThreadFooter";
import { ThreadReloadButton } from "../../Buttons/ThreadReloadButton/ThreadReloadButton";
import { ThreadCopyButton } from "../../Buttons/ThreadCopyButton/ThreadCopyButton";
import { useTextGenerationByPromptQuery } from "../../../../api/textGenerationApi";
import { EasyPromptsAvatar } from "../../../Common/EasyPromptsAvatar/EasyPromptsAvatar";
import { ThreadErrorMessage } from "../../Layout/ThreadErrorMessage/ThreadErrorMessage";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../../../stores/store";
import { Prompt } from "../../../../models/Prompt";

interface TextGenerationThreadByPrompt {
    promptRequest: PromptRequest,
    scrollIntoView: any
}

export function TextGenerationThreadByPrompt({ promptRequest, scrollIntoView }: TextGenerationThreadByPrompt) {
    const [
        userPromptRequest,
        promptsRequests,
        setPromptsRequests,
    ] = useStore(useShallow(state => [
        state.userPromptRequest,
        state.promptsRequests,
        state.setPromptsRequests
    ]));

    const regenerate = () => {
        const newPromptRequest = Prompt.clone(promptRequest) as PromptRequest;
        newPromptRequest.key = promptRequest.key + 1;
        newPromptRequest.isPlayable = true;
        newPromptRequest.type = PromptRequestType.Prompt;
        newPromptRequest.response = "";
        
        const newPromptsRequests = promptsRequests.map(p => p.key === promptRequest.key ? newPromptRequest : p);

        setPromptsRequests(newPromptsRequests);
    }

    const { data, error, isLoading, isFetching } = useTextGenerationByPromptQuery(promptRequest);

    const response = () => {
        if (promptRequest.response !== "") {
            const response = JSON.parse(promptRequest.response);

            return response.data.trim();
        }

        if (isLoading || isFetching) return <Loader size={"xs"} type="dots" />;

        if (error) {
            return <ThreadErrorMessage error={error} reloadFn={regenerate} />;
        }

        if (data && !isFetching) {
            return data.trim();
        }
    }

    return (
        <Stack gap={"xl"}>
            <Group w={"100%"} align="flex-start" wrap="nowrap">
                <EasyPromptsAvatar size="sm" />
                <Stack gap={"xs"}>
                    <Text size="sm" fw={700}>EasyPrompts</Text>
                    < Stack gap={"xs"} style={{ fontSize: "var(--mantine-font-size-sm)", whiteSpace: "pre-wrap" }
                    }>
                        {response()}
                        < Group gap={"xs"} >
                            <ThreadCopyButton value={response()} />
                            <ThreadReloadButton reload={regenerate} />
                        </Group >
                    </Stack >
                </Stack>
            </Group>

            <ThreadFooter promptRequest={promptRequest} userPromptRequest={userPromptRequest} />
        </Stack>
    )

}