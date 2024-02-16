import { FC, useState } from "react";
import { PromptRequest } from "../../models/PromptRequest";
import { Avatar, Button, Group, Loader, Stack, Text, Textarea } from "@mantine/core";
import { ThreadRequest } from "../../components/Threads/Layout/ThreadRequest/ThreadRequest";
import { useChatQuery } from "../../api/chatApi";
import { PromptChatMessage } from "../../models/PromptChatMessage";
import { iconPlay } from "../../utils/iconsUtils";
import { EasyPromptsAvatar } from "../../components/Common/EasyPromptsAvatar/EasyPromptsAvatar";
import { useStore } from "../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { ThreadFooter } from "../../components/Threads/Layout/ThreadFooter/ThreadFooter";

interface ThreadChatProps {
    key: number,
    promptRequest: PromptRequest
}

const ThreadChat: FC<ThreadChatProps> = ({
    key,
    promptRequest
}: ThreadChatProps) => {
    const [updatedPromptRequest, setUpdatedPromptRequest] = useState<PromptRequest>(promptRequest);

    const [
        user,
    ] = useStore(useShallow(state => [
        state.user,
    ]));

    const [chatMessages, setChatMessages] = useState<PromptChatMessage[]>(promptRequest.prompts_chat_messages);
    const [reply, setReply] = useState('');
    const { data } = useChatQuery(promptRequest, chatMessages);

    const updateChatMessages = (role: string, message: string) => {
        const newChatMessages = [
            ...chatMessages,
            {role, message}
        ];

        setChatMessages(newChatMessages);
        setReply('');

        const newPromptRequest = promptRequest;
        newPromptRequest.prompts_chat_messages = newChatMessages;
        setUpdatedPromptRequest(newPromptRequest);
    }

    const onKeyDown = async (e: any) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            updateChatMessages('user', reply);
        }
    }

    if (data) {
        updateChatMessages('assistant', data);
    }

    const canReply = () => {
        const lastMessage = chatMessages[chatMessages.length - 1];

        return lastMessage && lastMessage.role === 'assistant';
    }

    return (
        <Stack gap={"xl"}>
            {
                chatMessages.map((message, index) => {
                    if (message.role === "user") {
                        const isLastMessage = chatMessages.length - 1 === index;

                        if (isLastMessage) {
                            return <>
                                <ThreadRequest key={index} request={message.message} user={user} />
                                <Group key={index} w={"100%"} align="flex-start" wrap="nowrap">
                                    <EasyPromptsAvatar size="sm" />
                                    <Stack gap={"xs"}>
                                        <Text size="sm" fw={700}>EasyPrompts</Text>
                                        <Loader size={"xs"} type="dots" />
                                    </Stack>
                                </Group>
                            </>
                        }

                        return <ThreadRequest key={index} request={message.message} user={user} />
                    }

                    return (
                        <Group key={index} w={"100%"} align="flex-start" wrap="nowrap">
                            <EasyPromptsAvatar size="sm" />
                            <Stack gap={"xs"}>
                                <Text size="sm" fw={700}>EasyPrompts</Text>
                                <Stack style={{ fontSize: "var(--mantine-font-size-sm)", whiteSpace: "pre-wrap" }}>
                                    {
                                        message.message
                                    }
                                </Stack>
                            </Stack>
                        </Group>
                    )
                })
            }

            {
                canReply() &&
                <Stack>
                    <Group wrap="nowrap">
                        <Avatar src={user.picture} size={"sm"} />
                        <Textarea
                            placeholder="Reply here"
                            autosize
                            autoFocus
                            minRows={1}
                            maxRows={6}
                            w={"100%"}
                            styles={{
                                input: {
                                    paddingRight: "90px",
                                },

                            }}
                            value={reply}
                            onChange={e => setReply(e.target.value)}
                            onKeyDown={onKeyDown}
                        />
                        <Button
                            onClick={() => updateChatMessages('user', reply)}
                            rightSection={iconPlay(12)}
                            color="gray"
                            variant="transparent"
                            size="xs"
                            pos={"absolute"}
                            right={"25px"}
                        >
                            Reply
                        </Button>
                    </Group>
                </Stack>
            }

            <ThreadFooter
                promptRequest={updatedPromptRequest}
            />
        </Stack>
    )
}

export default ThreadChat;