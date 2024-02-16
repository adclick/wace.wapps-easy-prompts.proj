import { Group, Stack, Text } from "@mantine/core";
import { FC } from "react";
import { ThreadCopyButton } from "../../../../components/Threads/Buttons/ThreadCopyButton/ThreadCopyButton";
import { ThreadReloadButton } from "../../../../components/Threads/Buttons/ThreadReloadButton/ThreadReloadButton";
import { EasyPromptsAvatar } from "../../../../components/Common/EasyPromptsAvatar/EasyPromptsAvatar";

interface ThreadAssistantSuccessMessageProps {
    message: any,
    copyButton?: boolean
    reloadFn?: (() => void)
}

const ThreadAssistantSuccessMessage: FC<ThreadAssistantSuccessMessageProps> = ({
    message,
    copyButton = true,
    reloadFn
}: ThreadAssistantSuccessMessageProps) => {
    return (
        <Group w={"100%"} align="flex-start" wrap="nowrap">
            <EasyPromptsAvatar size="sm" />
            <Stack gap={"xs"}>
                <Text size="sm" fw={700}>EasyPrompts</Text>
                <Stack style={{ fontSize: "var(--mantine-font-size-sm)", whiteSpace: "pre-wrap" }}>
                    {message}
                </Stack>
                <Group gap={"xs"}>
                    {copyButton && <ThreadCopyButton value={message} />}
                    {reloadFn && <ThreadReloadButton reload={reloadFn} />}
                </Group>
            </Stack>
        </Group>
    )
}

export default ThreadAssistantSuccessMessage;