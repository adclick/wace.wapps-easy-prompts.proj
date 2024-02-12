import { Group, Loader, Stack, Text } from "@mantine/core";
import { PromptRequest } from "../../../../models/PromptRequest";
import { ThreadRequest } from "../../Layout/ThreadRequest/ThreadRequest";
import { ThreadFooter } from "../../Layout/ThreadFooter/ThreadFooter";
import { useTextGenerationQuery } from "../../../../api/textGenerationApi";
import { ThreadCopyButton } from "../../Buttons/ThreadCopyButton/ThreadCopyButton";
import { EasyPromptsAvatar } from "../../../Common/EasyPromptsAvatar/EasyPromptsAvatar";
import { ThreadErrorMessage } from "../../Layout/ThreadErrorMessage/ThreadErrorMessage";
import { useCreatePromptMutation } from "../../../../api/promptsApi";
import { saveHistory } from "../../../../services/ThreadService";
import { useState } from "react";
import { useStore } from "../../../../stores/store";
import { useShallow } from "zustand/react/shallow";

interface TextGenerationThread {
    promptRequest: PromptRequest,
    scrollIntoView: any
}

export function TextGenerationThread({ promptRequest, scrollIntoView }: TextGenerationThread) {
    const [
        user,
        selectedModifiers,
        selectedTemplates,
        userPromptRequest,
    ] = useStore(useShallow(state => [
        state.user,
        state.selectedModifiers,
        state.selectedTemplates,
        state.userPromptRequest,
    ]));

    const createMutation = useCreatePromptMutation();
    const [historySaved, setHistorySaved] = useState(false);

    const { data, refetch, error, isLoading, isFetching } = useTextGenerationQuery(promptRequest);

    scrollIntoView({ alignement: 'start' });

    const response = () => {
        if (isLoading || isFetching) return <Loader size={"xs"} type="dots" />;

        if (error) {
            return <ThreadErrorMessage error={error} reloadFn={refetch} />;
        }

        if (data && !isFetching) {
            let dataResponse = data;

            if (typeof data === "string") dataResponse = data.trim();
            if (typeof data === "number") dataResponse = data.toString().trim();

            promptRequest.response = JSON.stringify({ data: dataResponse });

            if (!historySaved) {
                saveHistory(
                    user,
                    promptRequest,
                    selectedTemplates,
                    selectedModifiers,
                    createMutation
                );
                setHistorySaved(true);
            }

            return <Stack style={{ fontSize: "var(--mantine-font-size-sm)", whiteSpace: "pre-wrap" }}>
                {
                    dataResponse
                }
                <Group gap={"xs"}>
                    <ThreadCopyButton value={dataResponse} />
                </Group>
            </Stack>
        }
    }

    return (
        <Stack gap={"xl"}>
            <ThreadRequest request={promptRequest.title} user={user} />

            <Group w={"100%"} align="flex-start" wrap="nowrap">
                <EasyPromptsAvatar size="sm" />
                <Stack gap={"xs"}>
                    <Text size="sm" fw={700}>EasyPrompts</Text>
                    {response()}
                </Stack>
            </Group>

            <ThreadFooter promptRequest={promptRequest} userPromptRequest={userPromptRequest} />
        </Stack>
    )
}