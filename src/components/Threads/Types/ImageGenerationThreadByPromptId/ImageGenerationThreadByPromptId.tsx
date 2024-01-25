import { ActionIcon, Avatar, Group, Image, Loader, Stack, Text } from "@mantine/core";
import { useUser } from "../../../../context/UserContext";
import { PromptRequest } from "../../../../model/PromptRequest";
import { ThreadRequest } from "../../Layout/ThreadRequest/ThreadRequest";
import { ThreadFooter } from "../../Layout/ThreadFooter/ThreadFooter";
import { useUserPromptRequest } from "../../../../context/UserPromptRequestContext";
import { IconReload } from "@tabler/icons-react";
import favicon from "../../../../favicon.svg";
import { useImageGenerationByPromptIdQuery } from "../../../../api/imageGenerationApi";
import { iconPlay } from "../../../../utils/iconsUtils";
import { getPromptModeByTechnology, getPromptModeColor } from "../../../../model/PromptMode";
import { EasyPromptsAvatar } from "../../../Common/EasyPromptsAvatar/EasyPromptsAvatar";
import { ThreadDownloadButton } from "../../Buttons/ThreadDownloadButton/ThreadDownloadButton";
import { ThreadReloadButton } from "../../Buttons/ThreadReloadButton/ThreadReloadButton";

interface ImageGenerationThreadByPromptId {
    promptRequest: PromptRequest,
    scrollIntoView: any,
    color: string
}

export function ImageGenerationThreadByPromptId({ promptRequest, scrollIntoView, color }: ImageGenerationThreadByPromptId) {
    const { user } = useUser();
    const { userPromptRequest } = useUserPromptRequest();
    const { isLoading, isFetching, error, data, refetch } = useImageGenerationByPromptIdQuery(promptRequest);

    scrollIntoView({ alignement: 'start' });

    const reloadIcon = <ActionIcon variant="transparent" onClick={() => refetch()}>
        <IconReload size={14} />
    </ActionIcon>;

    const response = () => {
        if (isLoading || isFetching) return <Loader size={"xs"} type="dots" />;

        if (error) {
            return <Stack style={{ fontSize: "var(--mantine-font-size-sm)", whiteSpace: "pre-wrap" }}>
                {error.message}
                {reloadIcon}
            </Stack>;
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
                !promptRequest.isPlayable && <ThreadRequest request={promptRequest.title} user={user} />
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