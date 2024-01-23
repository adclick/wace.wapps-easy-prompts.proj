import { Avatar, Group, Image, Loader, Stack, Text } from "@mantine/core";
import { useUser } from "../../../../context/UserContext";
import { PromptRequest } from "../../../../model/PromptRequest";
import { ThreadRequest } from "../../Layout/ThreadRequest/ThreadRequest";
import { ThreadFooter } from "../../Layout/ThreadFooter/ThreadFooter";
import { useUserPromptRequest } from "../../../../context/UserPromptRequestContext";
import { useImageGenerationQuery } from "../../../../api/imageGenerationApi";
import { ThreadReloadButton } from "../../Buttons/ThreadReloadButton/ThreadReloadButton";
import { ThreadDownloadButton } from "../../Buttons/ThreadDownloadButton/ThreadDownloadButton";
import { iconPlay } from "../../../../utils/iconsUtils";
import { ThreadErrorMessage } from "../../Layout/ThreadErrorMessage/ThreadErrorMessage";

interface ImageGenerationThread {
    promptRequest: PromptRequest,
    scrollIntoView: any,
    color: string
}

export function ImageGenerationThread({ promptRequest, scrollIntoView, color }: ImageGenerationThread) {
    const { user } = useUser();
    const { userPromptRequest } = useUserPromptRequest();
    const { isLoading, isFetching, error, data, refetch } = useImageGenerationQuery(promptRequest);

    scrollIntoView({ alignement: 'start' });

    const response = () => {
        if (isLoading || isFetching) return <Loader color={color} size={"xs"} type="dots" />;

        if (error) {
            return <ThreadErrorMessage message={error.message} reloadFn={refetch} />;
        }

        if (data && !isFetching) {
            return <Stack style={{ fontSize: "var(--mantine-font-size-sm)", whiteSpace: "pre-wrap" }}>
                {
                    typeof data === "object" &&
                    data.map((src: string) => {
                        return (
                            <Stack gap={"xs"}>
                                <Image key={src} src={src} w={512} h={512} />
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
                <Avatar variant="filled" color={color} size={"sm"} src={null} alt="no image here">
                    {iconPlay(14)}
                </Avatar>
                <Stack gap={"xs"}>
                    <Text size="sm" fw={700}>EasyPrompts</Text>
                    {response()}
                </Stack>
            </Group>

            <ThreadFooter promptRequest={promptRequest} userPromptRequest={userPromptRequest} />
        </Stack>
    )
}