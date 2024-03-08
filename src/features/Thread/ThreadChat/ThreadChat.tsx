import { FC, useState } from "react";
import { Avatar, Box, Button, Group, Stack, Textarea } from "@mantine/core";
import { useChatQuery } from "../../../api/chatApi";
import { PromptChatMessage } from "../../../models/PromptChatMessage";
import { iconPlay } from "../../../utils/iconsUtils";
import { useStore } from "../../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { ThreadFooter } from "../../../components/Threads/Layout/ThreadFooter/ThreadFooter";
import { PromptChatMessageRole } from "../../../enums";
import { parseError } from "../../../services/ThreadService";
import { ThreadAssistantLoadingMessage, ThreadAssistantSuccessMessage, ThreadUserMessage } from "../Common";
import { Thread } from "../../../models/Thread";
import { useScrollIntoView } from "@mantine/hooks";

interface ThreadChatProps {
    thread: Thread
    createThread: (response: string, chatMessages: PromptChatMessage[]) => void,
    updateThreadResponse: (response: string, chatMessages: PromptChatMessage[]) => void,
}

const ThreadChat: FC<ThreadChatProps> = ({
    thread,
    createThread,
    updateThreadResponse,
}: ThreadChatProps) => {
    const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();

    const [
        user,
        selectedModifiers,
        selectedTemplates
    ] = useStore(useShallow(state => [
        state.user,
        state.selectedModifiers,
        state.selectedTemplates
    ]));
    const [updatedNextThread, setUpdatedNextThread] = useState<Thread>(thread);
    const [reply, setReply] = useState('');
    const [chatMessages, setChatMessages] = useState<PromptChatMessage[]>(thread.threads_chat_messages);

    const { data, isFetching, error } = useChatQuery(user, thread, chatMessages);

    const buildNewChatMessage = (role: string, message: string) => {
        return {
            role,
            message,
            threads_chat_messages_modifiers: selectedModifiers.map(m => ({modifier: m})),
            threads_chat_messages_templates: selectedTemplates.map(t => ({template: t}))
        }
    }

    const updateChatMessages = (role: string, message: string) => {
        const newChatMessages = [
            ...chatMessages,
            buildNewChatMessage(role, message)
        ];

        console.log(newChatMessages);

        setChatMessages(newChatMessages);
        setReply('');

        const newThread = Thread.clone(thread);
        setUpdatedNextThread(newThread);
    }

    const onKeyDown = async (e: any) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            updateChatMessages(PromptChatMessageRole.USER, reply);
        }
    }

    if (data) {
        scrollIntoView({ alignment: 'start' });

        const newChatMessages = [
            ...chatMessages,
            buildNewChatMessage(PromptChatMessageRole.ASSISTANT, data)
        ];

        if (thread.uuid !== "") {
            updateThreadResponse(data, newChatMessages.slice(-2));
        } else {
            createThread(data, newChatMessages);
        }

        updateChatMessages(PromptChatMessageRole.ASSISTANT, data);
    }

    if (error) {
        const message = parseError(error);
        updateChatMessages(PromptChatMessageRole.ASSISTANT, message);
    }

    if (isFetching) {
        scrollIntoView({ alignment: 'start' });
    }

    const canReply = () => {
        const lastMessage = chatMessages[chatMessages.length - 1];

        return lastMessage && lastMessage.role === PromptChatMessageRole.ASSISTANT;
    }

    const regenerate = () => {
        const newChatMessages = chatMessages;
        newChatMessages.pop();
        updateThreadResponse("", newChatMessages);
    }

    return (
        <Stack gap={"lg"}>
            {
                chatMessages.map((message, index) => {
                    const isLastMessage = chatMessages.length - 1 === index;
                    if (message.role === PromptChatMessageRole.USER) {
                        if (isLastMessage) {

                            // User message with Assistant Loader
                            return <Stack gap={"lg"} key={index}>
                                <Box >
                                    <ThreadUserMessage
                                        username={user.username}
                                        userPicture={user.picture}
                                        message={message.message}
                                        modifiers={message.threads_chat_messages_modifiers.map(m => m.modifier)}
                                    />
                                </Box>
                                <Box ref={targetRef}>
                                    <ThreadAssistantLoadingMessage />
                                </Box>
                            </Stack>
                        }

                        // User Messsage
                        return (
                            <Box key={index} ref={targetRef}>
                                <ThreadUserMessage
                                    username={user.username}
                                    userPicture={user.picture}
                                    message={message.message}
                                    modifiers={message.threads_chat_messages_modifiers.map(m => m.modifier)}
                                />
                            </Box>
                        )
                    }

                    // Assistant Messsage
                    return (
                        <Box key={index} ref={targetRef}>
                            {
                                isLastMessage
                                    ? <ThreadAssistantSuccessMessage message={message.message} reloadFn={regenerate} />
                                    : <ThreadAssistantSuccessMessage message={message.message} />
                            }
                        </Box>
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
                            onClick={() => updateChatMessages(PromptChatMessageRole.USER, reply)}
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

            <ThreadFooter thread={updatedNextThread} />
        </Stack>
    )
}

export default ThreadChat;