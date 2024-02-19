import { FC, useState } from "react";
import { Avatar, Box, Button, Group, Stack, Textarea } from "@mantine/core";
import { useChatQuery } from "../../../api/chatApi";
import { PromptChatMessage } from "../../../models/PromptChatMessage";
import { iconPlay } from "../../../utils/iconsUtils";
import { useStore } from "../../../stores/store";
import { useShallow } from "zustand/react/shallow";
import { ThreadFooter } from "../../../components/Threads/Layout/ThreadFooter/ThreadFooter";
import { PromptChatMessageRole } from "../../../enums";
import { Prompt } from "../../../models/Prompt";
import { parseError } from "../../../services/ThreadService";
import { ThreadAssistantLoadingMessage, ThreadAssistantSuccessMessage, ThreadUserMessage } from "../Common";
import { Thread } from "../../../models/Thread";

interface ThreadChatProps {
    thread: Thread
}

const ThreadChat: FC<ThreadChatProps> = ({
    thread
}: ThreadChatProps) => {
    const [updatedNextThread, setUpdatedNextThread] = useState<Thread>(thread);
    const [
        user,
        threads,
        setThreads
    ] = useStore(useShallow(state => [
        state.user,
        state.threads,
        state.setThreads
    ]));
    const [reply, setReply] = useState('');

    let promptChatMessages = thread.prompt.prompts_chat_messages;
    if (thread.prompt.id > 0) {
        promptChatMessages = [promptChatMessages[promptChatMessages.length - 1]];
    }

    const [chatMessages, setChatMessages] = useState<PromptChatMessage[]>(promptChatMessages);

    const { data, error } = useChatQuery(thread, chatMessages);

    const updateChatMessages = (role: string, message: string) => {
        const newChatMessages = [
            ...chatMessages,
            { role, message }
        ];

        setChatMessages(newChatMessages);
        setReply('');
        updatePromptRequest();
    }

    const updatePromptRequest = () => {
        const newThread = thread;
        newThread.prompt.prompts_chat_messages = chatMessages;
        setUpdatedNextThread(newThread);
    }

    const onKeyDown = async (e: any) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            updateChatMessages(PromptChatMessageRole.USER, reply);
        }
    }

    if (data) {
        updateChatMessages(PromptChatMessageRole.ASSISTANT, data);
    }

    if (error) {
        const message = parseError(error);
        updateChatMessages(PromptChatMessageRole.ASSISTANT, message);
    }

    const canReply = () => {
        const lastMessage = chatMessages[chatMessages.length - 1];

        return lastMessage && lastMessage.role === PromptChatMessageRole.ASSISTANT;
    }

    const regenerate = () => {
        const newThread = new Thread();
        newThread.prompt = Prompt.clone(thread.prompt);
        newThread.key = thread.key + 1;
        newThread.response = "";

        const newThreads = threads.map(t => t.key === thread.key ? newThread : t);

        setThreads(newThreads);
    }

    return (
        <Stack gap={"lg"}>
            {
                chatMessages.map((message, index) => {
                    const isLastMessage = chatMessages.length - 1 === index;
                    if (message.role === "user") {
                        if (isLastMessage) {

                            // User message with Assistant Loader
                            return <>
                                {
                                    thread.prompt.id <= 0
                                        ? <>
                                            <Box key={index}>
                                                {
                                                    thread.prompt.id <= 0 &&
                                                    <ThreadUserMessage
                                                        username={user.username}
                                                        userPicture={user.picture}
                                                        message={message.message}
                                                    />
                                                }
                                            </Box>
                                            <Box key={index + 1}>
                                                <ThreadAssistantLoadingMessage />
                                            </Box>
                                        </>
                                        : <Box key={index}>
                                            <ThreadAssistantLoadingMessage />
                                        </Box>
                                }
                            </>
                        }

                        // User Messsage
                        return (
                            thread.prompt.id <= 0 &&
                            <Box key={index}>
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
                        <Box key={index}>
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
                thread.prompt.id <= 0 && canReply() &&
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