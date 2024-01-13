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

    useEffect(() => {
        scrollIntoView({ alignement: 'start' });
        if (messages.length === 0) {
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

    const fetch = async (message: Message) => {
        let history = [];
        for (const message of messages) {
            if (message.response === "") continue;

            history.push({ role: "user", message: message.request });
            history.push({ role: "assistant", message: message.response });
        }

        const response = promptRequest.isPlayable
            ? await chatById(promptRequest.id)
            : await chat(message.request, promptRequest.provider.id, history);

        updateMessages(message.id, message.request, response);
    }

    const reply = (replyValue: string) => {
        const message: Message = {
            id: messages.length,
            request: replyValue,
            response: ""
        };

        updateMessages(message.id, message.request, "");
        replyScrollIntoView.scrollIntoView();
        fetch(message);
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

            <ThreadFooter promptRequest={promptRequest} />
        </Stack>
    )
}