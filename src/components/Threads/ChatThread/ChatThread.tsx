import { Box, Stack, Text } from "@mantine/core";
import { useUser } from "../../../context/UserContext";
import { PromptRequest } from "../../../model/PromptRequest";
import { useEffect, useState } from "react";
import { chat, chatById } from "../../../api/aiApi";
import { ThreadRequest } from "../ThreadRequest/ThreadRequest";
import { ThreadResponse } from "../ThreadResponse/ThreadResponse";
import { ChatThreadReplyContainer } from "../ChatThreadReplyContainer/ChatThreadReplyContainer";
import { ThreadFooter } from "../ThreadFooter/ThreadFooter";
import { useScrollIntoView } from "@mantine/hooks";
import { useUserPromptRequest } from "../../../context/UserPromptRequestContext";

interface ChatThread {
    promptRequest: PromptRequest,
    scrollIntoView: any
}

interface Message {
    id: number,
    request: string,
    response: string,
}

export function ChatThread({ promptRequest, scrollIntoView }: ChatThread) {
    const { user } = useUser();
    const [messages, setMessages] = useState<Message[]>([]);
    const replyScrollIntoView = useScrollIntoView<HTMLDivElement>();
    const { userPromptRequest, setUserPromptRequest } = useUserPromptRequest();
    const [replyValue, setReplyValue] = useState('');

    useEffect(() => {
        scrollIntoView({ alignement: 'start' });
        if (messages.length === 0) {
            updateUserPromptRequest(promptRequest.content);

            const message: Message = {
                id: messages.length,
                request: promptRequest.content,
                response: ""
            };
            updateMessages(message.id, message.request, "");
            fetch(message);
            return;
        }
    }, [scrollIntoView]);

    const updateMessages = (id: number, request: string, response: string) => {
        const exists = messages[id];

        if (exists) {
            exists.request = request;
            exists.response = response;
            messages[id] = exists;
            setMessages(messages);
            return;
        }

        setMessages([
            ...messages,
            {
                id: messages.length,
                request,
                response
            }
        ]);
    }

    const getHistory = () => {
        const history = [];
        for (const message of messages) {
            if (message.response === "") continue;

            history.push({ role: "user", message: message.request });
            history.push({ role: "assistant", message: message.response });
        }

        return history;
    }

    const fetch = async (message: Message) => {
        if (promptRequest.isPlayable) {
            const { response } = await chatById(promptRequest.id);
            updateMessages(message.id, message.request, response);
            return;
        }

        const response = await chat(message.request, promptRequest.provider.id, getHistory());
        updateMessages(message.id, message.request, response);
    }

    const reply = (replyValue: string) => {
        const message: Message = {
            id: messages.length,
            request: replyValue,
            response: ""
        };

        updateUserPromptRequest(replyValue);

        updateMessages(message.id, message.request, "");
        replyScrollIntoView.scrollIntoView();
        fetch(message);
    }

    const updateUserPromptRequest = (chatReply: string) => {
        const newUserPromptRequest = PromptRequest.clone(userPromptRequest);
        newUserPromptRequest.chatReply = chatReply;
        newUserPromptRequest.metadata.history = getHistory();
        setUserPromptRequest(newUserPromptRequest);
    }

    return (
        <Stack gap={"xl"}>
            {
                messages.map((message, index) => {
                    return (
                        <Stack key={message.id} gap={"xl"}>
                            {
                                !promptRequest.isPlayable && <ThreadRequest request={message.request} user={user} />
                            }
                            <ThreadResponse response={message.response} />
                        </Stack>
                    )
                })
            }

            <Box ref={replyScrollIntoView.targetRef}>
                {
                    !promptRequest.isPlayable && <ChatThreadReplyContainer reply={reply} />
                }
            </Box>

            <ThreadFooter promptRequest={userPromptRequest} />
        </Stack>
    )
}