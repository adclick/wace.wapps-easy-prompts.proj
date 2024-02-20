import { Group, Stack, Text } from "@mantine/core";
import { FC } from "react";
import { ThreadCopyButton } from "../../../../components/Threads/Buttons/ThreadCopyButton/ThreadCopyButton";
import { ThreadReloadButton } from "../../../../components/Threads/Buttons/ThreadReloadButton/ThreadReloadButton";
import { EasyPromptsAvatar } from "../../../../components/Common/EasyPromptsAvatar/EasyPromptsAvatar";
import { useHover } from "@mantine/hooks";
import { DesktopContainer, MobileContainer } from "../../../../components/UI/Layout";

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
    const { hovered, ref } = useHover();

    return (
        <div ref={ref}>
            <Group w={"100%"} align="flex-start" wrap="nowrap">
                <EasyPromptsAvatar size="sm" />
                <Stack gap={"xs"}>
                    <Text size="sm" fw={700}>EasyPrompts</Text>
                    <Stack style={{ fontSize: "var(--mantine-font-size-sm)", whiteSpace: "pre-wrap" }}>
                        {message}
                    </Stack>

                    <MobileContainer>
                        <Group gap={"xs"}>
                            {copyButton && <ThreadCopyButton value={message} />}
                            {/* {reloadFn && <ThreadReloadButton reload={reloadFn} />} */}
                        </Group>
                    </MobileContainer>
                    <DesktopContainer>
                        <Group gap={"xs"}>
                            {copyButton && hovered && <ThreadCopyButton value={message} />}
                            {/* {reloadFn && hovered && <ThreadReloadButton reload={reloadFn} />} */}
                        </Group>
                    </DesktopContainer>
                </Stack>
            </Group>
        </div>
    )
}

export default ThreadAssistantSuccessMessage;