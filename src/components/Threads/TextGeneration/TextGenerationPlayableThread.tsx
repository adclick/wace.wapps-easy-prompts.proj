import { Alert, Avatar, Group, Loader, Stack, Text } from "@mantine/core";
import { useUser } from "../../../context/UserContext";
import { PromptRequest } from "../../../model/PromptRequest";
import { ThreadRequest } from "../ThreadRequest/ThreadRequest";
import { ThreadFooter } from "../ThreadFooter/ThreadFooter";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import favicon from "../../../favicon.svg";
import { IconAlertCircle } from "@tabler/icons-react";
import { ThreadReloadButton } from "../ThreadReloadButton/ThreadReloadButton";
import { useTextGenerationPlayableQuery } from "../../../api/textGenerationApi";
import { ThreadCopyButton } from "../ThreadCopyButton/ThreadCopyButton";

interface TextGenerationPlayableThread {
    promptRequest: PromptRequest,
    scrollIntoView: any
}

export function TextGenerationPlayableThread({ promptRequest, scrollIntoView }: TextGenerationPlayableThread) {
    const { user } = useUser();
    const { userPromptRequest } = useUserPromptRequest();
    const { data, refetch, error, isLoading, isFetching } = useTextGenerationPlayableQuery(promptRequest);

    scrollIntoView({ alignement: 'start' });

    const response = () => {
        if (isLoading || isFetching) return <Loader size={"xs"} type="dots" />;

        if (error) {
            return <Stack style={{ fontSize: "var(--mantine-font-size-sm)", whiteSpace: "pre-wrap" }}>
                <Alert p={0} variant="transparent" color="red" title={error.message} icon={<IconAlertCircle size={14} />} />
                <ThreadReloadButton reload={refetch} />
            </Stack>;
        }

        if (data && !isFetching) {
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
            {
                !promptRequest.isPlayable && <ThreadRequest request={promptRequest.title} user={user} />
            }

            <Group w={"100%"} align="flex-start" wrap="nowrap">
                <Avatar variant="white" size={"sm"} src={favicon} alt="no image here" />
                <Stack gap={"xs"}>
                    <Text size="sm" fw={700}>EasyPrompts</Text>
                    {response()}
                </Stack>
            </Group>


            <ThreadFooter promptRequest={promptRequest} userPromptRequest={userPromptRequest} />
        </Stack>
    )
}