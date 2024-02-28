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
    // scrollIntoView: any
}

const ThreadChat: FC<ThreadChatProps> = ({
    thread,
    createThread,
    updateThreadResponse,
    // scrollIntoView
}: ThreadChatProps) => {
    const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();

    const [updatedNextThread, setUpdatedNextThread] = useState<Thread>(thread);
    const [
        user,
    ] = useStore(useShallow(state => [
        state.user,
    ]));
    const [reply, setReply] = useState('');

    let promptChatMessages = thread.threads_chat_messages;

    const [chatMessages, setChatMessages] = useState<PromptChatMessage[]>(promptChatMessages);

    const { data, isFetching, error } = useChatQuery(user, thread, chatMessages);

    const updateChatMessages = (role: string, message: string) => {
        const newChatMessages = [
            ...chatMessages,
            { role, message }
        ];

        if (thread.uuid !== "") {
            updateThreadResponse(data, newChatMessages);
        } else {
            createThread(data, newChatMessages);
        }

        setChatMessages(newChatMessages);
        setReply('');
        updatePromptRequest();
    }

    const updatePromptRequest = () => {
        const newThread = thread;
        newThread.threads_chat_messages = chatMessages;
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
        // console.log(newChatMessages);
        updateThreadResponse("", newChatMessages);
        // setProcessing(true);
        // setThreadProcessed(false);
    }

    return (
        <Stack gap={"lg"}>
            {
                chatMessages.map((message, index) => {
                    const isLastMessage = chatMessages.length - 1 === index;
                    if (message.role === PromptChatMessageRole.USER) {
                        if (isLastMessage) {

                            // User message with Assistant Loader
                            return <>
                                <Box key={index}>
                                    <ThreadUserMessage
                                        username={user.username}
                                        userPicture={user.picture}
                                        message={message.message}
                                    />
                                </Box>
                                <Box key={index + 1} ref={targetRef}>
                                    <ThreadAssistantLoadingMessage />
                                </Box>
                            </>
                        }

                        // User Messsage
                        return (
                            <Box key={index} ref={targetRef}>
                                <ThreadUserMessage
                                    username={user.username}
                                    userPicture={user.picture}
                                    message={message.message}
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