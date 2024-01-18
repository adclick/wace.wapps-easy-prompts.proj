import { ActionIcon, Avatar, Group, Loader, Stack, Text } from "@mantine/core";
import { useUser } from "../../../context/UserContext";
import { PromptRequest } from "../../../model/PromptRequest";
import { useTextGenerationQuery } from "../../../api/aiApi";
import { ThreadRequest } from "../ThreadRequest/ThreadRequest";
import { ThreadFooter } from "../ThreadFooter/ThreadFooter";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";
import favicon from "../../../favicon.svg";
import { IconReload } from "@tabler/icons-react";

interface TextGenerationThread {
    promptRequest: PromptRequest,
    scrollIntoView: any
}

export function TextGenerationThread({ promptRequest, scrollIntoView }: TextGenerationThread) {
    const { user } = useUser();
    const { userPromptRequest } = useUserPromptRequest();


    

    const textGenerationQuery = useTextGenerationQuery(promptRequest);

    const reload = () => {
        console.log('reloading');
        textGenerationQuery.refetch();
    }

    const reloadIcon = <ActionIcon variant="transparent" onClick={reload}>
        <IconReload size={14} />
    </ActionIcon>;

    scrollIntoView({ alignement: 'start' })

    return (
        <Stack gap={"xl"}>
            {
                !promptRequest.isPlayable && <ThreadRequest request={promptRequest.title} user={user} />
            }
            {/* <ThreadResponse response={response} /> */}

            <Group w={"100%"} align="flex-start" wrap="nowrap">
                <Avatar variant="white" size={"sm"} src={favicon} alt="no image here" />
                <Stack gap={"xs"}>
                    <Text size="sm" fw={700}>EasyPrompts</Text>
                    {
                        (textGenerationQuery.isLoading || textGenerationQuery.isFetching) && <Loader size={"xs"} type="dots" />
                    }
                    {
                        textGenerationQuery.error &&
                        <Stack style={{ fontSize: "var(--mantine-font-size-sm)", whiteSpace: "pre-wrap" }}>
                            <Text>
                                Error. Please try again later or contact support
                            </Text>
                            {reloadIcon}
                        </Stack>
                    }
                    {
                        textGenerationQuery.data && !textGenerationQuery.isFetching &&
                        <Stack style={{ fontSize: "var(--mantine-font-size-sm)", whiteSpace: "pre-wrap" }}>
                            {textGenerationQuery.data.trim()}
                            {reloadIcon}
                        </Stack>
                    }
                </Stack>
            </Group>


            <ThreadFooter promptRequest={promptRequest} userPromptRequest={userPromptRequest} />
        </Stack>
    )
}