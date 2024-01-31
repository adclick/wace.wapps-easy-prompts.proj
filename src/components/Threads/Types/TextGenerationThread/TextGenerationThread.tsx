import { Alert, Avatar, Group, Loader, Stack, Text } from "@mantine/core";
import { useUser } from "../../../../context/UserContext";
import { PromptRequest } from "../../../../model/PromptRequest";
import { ThreadRequest } from "../../Layout/ThreadRequest/ThreadRequest";
import { ThreadFooter } from "../../Layout/ThreadFooter/ThreadFooter";
import { useUserPromptRequest } from "../../../../context/UserPromptRequestContext";
import { IconAlertCircle } from "@tabler/icons-react";
import { ThreadReloadButton } from "../../Buttons/ThreadReloadButton/ThreadReloadButton";
import { useTextGenerationQuery } from "../../../../api/textGenerationApi";
import { ThreadCopyButton } from "../../Buttons/ThreadCopyButton/ThreadCopyButton";
import { iconPlay } from "../../../../utils/iconsUtils";
import { getPromptModeByTechnology, getPromptModeColor } from "../../../../model/PromptMode";
import { EasyPromptsAvatar } from "../../../Common/EasyPromptsAvatar/EasyPromptsAvatar";
import { ThreadErrorMessage } from "../../Layout/ThreadErrorMessage/ThreadErrorMessage";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface TextGenerationThread {
    promptRequest: PromptRequest,
    scrollIntoView: any
}

export function TextGenerationThread({ promptRequest, scrollIntoView }: TextGenerationThread) {
    const { user } = useUser();
    const { userPromptRequest } = useUserPromptRequest();
    const [request, setRequest] = useState(promptRequest);
    const queryClient = useQueryClient()

    const { data, refetch, error, isLoading, isFetching } = useTextGenerationQuery(promptRequest);

    scrollIntoView({ alignement: 'start' });

    const reload = () => {
        // queryClient.invalidateQueries({queryKey: ["textGemeration", promptRequest.key]});
        refetch();
    }

    const response = () => {
        if (isLoading || isFetching) return <Loader size={"xs"} type="dots" />;

        if (error) {
            return <ThreadErrorMessage message={error.message} reloadFn={reload} />;
        }

        if (data && !isFetching) {
            return <Stack style={{ fontSize: "var(--mantine-font-size-sm)", whiteSpace: "pre-wrap" }}>
                {
                    data
                }
                <Group gap={"xs"}>
                    <ThreadCopyButton value={data} />
                    <ThreadReloadButton reload={reload} />
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