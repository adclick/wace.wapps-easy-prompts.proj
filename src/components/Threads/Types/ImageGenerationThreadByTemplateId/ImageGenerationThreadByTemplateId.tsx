import { ActionIcon, Avatar, Group, Image, Loader, Stack, Text } from "@mantine/core";
import { useUser } from "../../../../context/UserContext";
import { PromptRequest } from "../../../../model/PromptRequest";
import { ThreadRequest } from "../../Layout/ThreadRequest/ThreadRequest";
import { ThreadFooter } from "../../Layout/ThreadFooter/ThreadFooter";
import { useUserPromptRequest } from "../../../../context/UserPromptRequestContext";
import { IconReload } from "@tabler/icons-react";
import favicon from "../../../../favicon.svg";
import { iconPlay } from "../../../../utils/iconsUtils";
import { useImageGenerationByTemplateIdQuery } from "../../../../api/imageGenerationApi";
import { getPromptModeByTechnology, getPromptModeColor } from "../../../../model/PromptMode";

interface ImageGenerationThreadByTemplateId {
    promptRequest: PromptRequest,
    scrollIntoView: any,
    color: string
}

export function ImageGenerationThreadByTemplateId({ promptRequest, scrollIntoView, color }: ImageGenerationThreadByTemplateId) {
    const { user } = useUser();
    const { userPromptRequest } = useUserPromptRequest();
    const { isLoading, isFetching, error, data, refetch } = useImageGenerationByTemplateIdQuery(promptRequest);
    
    scrollIntoView({ alignement: 'start' });

    const reloadIcon = <ActionIcon variant="transparent" onClick={() => refetch()}>
        <IconReload size={14} />
    </ActionIcon>;

    const response = () => {
        if (isLoading || isFetching) return <Loader size={"xs"} type="dots" color={getPromptModeColor(getPromptModeByTechnology(promptRequest.technology))} />;

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
                            <Image key={src} src={src} />
                        )
                    })
                }
                {reloadIcon}
            </Stack>
        }
    }

    return (
        <Stack gap={"xl"}>
            {
                !promptRequest.isPlayable && <ThreadRequest request={promptRequest.title} user={user} />
            }

            <Group w={"100%"} align="flex-start" wrap="nowrap">
                <Avatar color={color} variant="filled" size={"sm"} src={null} alt="no image here">
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