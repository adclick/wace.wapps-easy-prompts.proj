import { Alert, Avatar, Group, Loader, Stack, Text } from "@mantine/core";
import { PromptRequest } from "../../../../model/PromptRequest";
import { ThreadFooter } from "../../Layout/ThreadFooter/ThreadFooter";
import { useUserPromptRequest } from "../../../../context/UserPromptRequestContext";
import { IconAlertCircle } from "@tabler/icons-react";
import { ThreadReloadButton } from "../../Buttons/ThreadReloadButton/ThreadReloadButton";
import { ThreadCopyButton } from "../../Buttons/ThreadCopyButton/ThreadCopyButton";
import { useTextGenerationByPromptQuery } from "../../../../api/textGenerationApi";
import { getPromptModeByTechnology, getPromptModeColor } from "../../../../model/PromptMode";
import { iconPlay } from "../../../../utils/iconsUtils";

interface TextGenerationThreadByPrompt {
    promptRequest: PromptRequest,
    scrollIntoView: any
}

export function TextGenerationThreadByPrompt({ promptRequest, scrollIntoView }: TextGenerationThreadByPrompt) {
    const { userPromptRequest } = useUserPromptRequest();
    const { data, refetch, error, isLoading, isFetching } = useTextGenerationByPromptQuery(promptRequest);

    const response = () => {
        if (isLoading || isFetching) return <Loader size={"xs"} type="dots" />;

        if (error) {
            return <Stack style={{ fontSize: "var(--mantine-font-size-sm)", whiteSpace: "pre-wrap" }}>
                <Alert p={0} variant="transparent" color="red" title={error.message} icon={<IconAlertCircle size={14} />} />
                <ThreadReloadButton reload={refetch} />
            </Stack>;
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
                <Avatar
                    variant="filled"
                    color={getPromptModeColor(getPromptModeByTechnology(promptRequest.technology))}
                    size={"sm"}
                    src={null}
                >
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