import { Group, Image, Loader, Stack, Text } from "@mantine/core";
import { PromptRequest } from "../../../../models/PromptRequest";
import { ThreadRequest } from "../../Layout/ThreadRequest/ThreadRequest";
import { ThreadFooter } from "../../Layout/ThreadFooter/ThreadFooter";
import { useImageGenerationQuery } from "../../../../api/imageGenerationApi";
import { ThreadReloadButton } from "../../Buttons/ThreadReloadButton/ThreadReloadButton";
import { ThreadDownloadButton } from "../../Buttons/ThreadDownloadButton/ThreadDownloadButton";
import { ThreadErrorMessage } from "../../Layout/ThreadErrorMessage/ThreadErrorMessage";
import { EasyPromptsAvatar } from "../../../Common/EasyPromptsAvatar/EasyPromptsAvatar";
import { useStore } from "../../../../stores/store";
import { useShallow } from "zustand/react/shallow";

interface ImageGenerationThread {
    promptRequest: PromptRequest,
    scrollIntoView: any,
}

export function ImageGenerationThread({ promptRequest, scrollIntoView }: ImageGenerationThread) {
    const [
        user,
        userPromptRequest,
    ] = useStore(useShallow(state => [
        state.user,
        state.userPromptRequest,
    ]));

    const { isLoading, isFetching, error, data, refetch } = useImageGenerationQuery(promptRequest);

    scrollIntoView({ alignement: 'start' });

    const response = () => {
        if (isLoading || isFetching) return <Loader size={"xs"} type="dots" />;

        if (error) {
            return <ThreadErrorMessage error={error} reloadFn={refetch} />;
        }

        if (data && !isFetching) {
            return <Stack style={{ fontSize: "var(--mantine-font-size-sm)", whiteSpace: "pre-wrap" }}>
                {
                    typeof data === "object" &&
                    data.map((src: string) => {
                        return (
                            <Stack gap={"xs"} key={src}>
                                <Image src={src} />
                                <Group gap={"xs"}>
                                    <ThreadDownloadButton url={src} />
                                    <ThreadReloadButton reload={refetch} />
                                </Group>
                            </Stack>
                        )
                    })
                }
            </Stack>
        }
    }

    return (
        <Stack gap={"xl"}>
            {
                !promptRequest.isPlayable
                && <ThreadRequest request={promptRequest.title} user={user} />
            }

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