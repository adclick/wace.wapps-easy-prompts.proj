import { Group, Loader, Stack, Text } from "@mantine/core";
import { PromptRequest } from "../../../../models/PromptRequest";
import { ThreadFooter } from "../../Layout/ThreadFooter/ThreadFooter";
import { ThreadReloadButton } from "../../Buttons/ThreadReloadButton/ThreadReloadButton";
import { ThreadCopyButton } from "../../Buttons/ThreadCopyButton/ThreadCopyButton";
import { useTextGenerationByPromptQuery } from "../../../../api/textGenerationApi";
import { EasyPromptsAvatar } from "../../../Common/EasyPromptsAvatar/EasyPromptsAvatar";
import { ThreadErrorMessage } from "../../Layout/ThreadErrorMessage/ThreadErrorMessage";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../../../stores/store";

interface TextGenerationThreadByPrompt {
    promptRequest: PromptRequest,
    scrollIntoView: any
}

export function TextGenerationThreadByPrompt({ promptRequest, scrollIntoView }: TextGenerationThreadByPrompt) {
    const [
        userPromptRequest,
    ] = useStore(useShallow(state => [
        state.userPromptRequest,
    ]));

    const { data, refetch, error, isLoading, isFetching } = useTextGenerationByPromptQuery(promptRequest);

    if (promptRequest.response !== null) {
        const response = JSON.parse(promptRequest.response);

        if (response && "data" in response) {
            return (
                <Stack gap={"xl"}>
                    <Group w={"100%"} align="flex-start" wrap="nowrap">
                        <EasyPromptsAvatar size="sm" />
                        <Stack gap={"xs"}>
                            <Text size="sm" fw={700}>EasyPrompts</Text>
                            <Stack gap={"xs"} style={{ fontSize: "var(--mantine-font-size-sm)", whiteSpace: "pre-wrap" }}>
                                {response.data.trim()}
                                <Group gap={"xs"}>
                                    <ThreadCopyButton value={response.data.trim()} />
                                </Group>
                            </Stack>
                        </Stack>
                    </Group>

                    <ThreadFooter promptRequest={promptRequest} userPromptRequest={userPromptRequest} />
                </Stack>
            )
        }
    }


    const response = () => {
        if (isLoading || isFetching) return <Loader size={"xs"} type="dots" />;

        if (error) {
            return <ThreadErrorMessage error={error} reloadFn={refetch} />;
        }

        if (data && !isFetching) {
            scrollIntoView({ alignement: 'start' });
            return <Stack gap={"xs"} style={{ fontSize: "var(--mantine-font-size-sm)", whiteSpace: "pre-wrap" }}>
                {data.trim()}
                <Group gap={"xs"}>
                    <ThreadCopyButton value={data.trim()} />
                    <ThreadReloadButton reload={refetch} />
                </Group>
            </Stack>
        }
    }

    return (
        <Stack gap={"xl"}>
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