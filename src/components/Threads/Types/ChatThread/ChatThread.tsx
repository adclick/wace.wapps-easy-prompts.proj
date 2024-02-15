import { Box, Stack, Text } from "@mantine/core";
import { PromptRequest } from "../../../../models/PromptRequest";
import { useEffect, useState } from "react";
import { chat, chatByPromptId, useChatQuery } from "../../../../api/chatApi";
import { ThreadRequest } from "../../Layout/ThreadRequest/ThreadRequest";
import { ThreadResponse } from "../../Layout/ThreadResponse/ThreadResponse";
import { ChatThreadReplyContainer } from "../../Layout/ChatThreadReplyContainer/ChatThreadReplyContainer";
import { ThreadFooter } from "../../Layout/ThreadFooter/ThreadFooter";
import { useDisclosure, useScrollIntoView } from "@mantine/hooks";
import { saveHistory } from "../../../../services/ThreadService";
import { useCreatePromptMutation, useUpdatePromptMutation } from "../../../../api/promptsApi";
import { useStore } from "../../../../stores/store";
import { useShallow } from "zustand/react/shallow";

interface ChatThread {
    promptRequest: PromptRequest,
    scrollIntoView: any,
}

interface Message {
    id: number,
    request: string,
    response: string,
}

export function ChatThread({ promptRequest, scrollIntoView }: ChatThread) {
    const [
        user,
        selectedModifiers,
        selectedTemplates,
        userPromptRequest,
        setUserPromptRequest,
    ] = useStore(useShallow(state => [
        state.user,
        state.selectedModifiers,
        state.selectedTemplates,
        state.userPromptRequest,
        state.setUserPromptRequest
    ]));

    const [id, setId] = useState(0);

    const [messages, setMessages] = useState<Message[]>([]);
    const replyScrollIntoView = useScrollIntoView<HTMLDivElement>();
    const [isResponding, isRespondingHandle] = useDisclosure(false);
    const createMutation = useCreatePromptMutation();
    const updateMutation = useUpdatePromptMutation(id);
    const [historySaved, setHistorySaved] = useState(false);

    useEffect(() => {
        if (createMutation.data) {
            setId(createMutation.data.id);
        }
    }, [createMutation])

    useEffect(() => {
        scrollIntoView({ alignement: 'start' });
        if (messages.length === 0) {
            if (!promptRequest.isPlayable) {
                updateUserPromptRequest(promptRequest.content);
            }

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
            const response = await chatByPromptId(promptRequest.id);
            updateMessages(message.id, message.request, response);
            return;
        }

        isRespondingHandle.open();
        const response = await chat(
            message.request,
            promptRequest.provider.id,
            getHistory(),
            selectedModifiers,
            selectedTemplates
        );
        updateMessages(message.id, message.request, response);
        isRespondingHandle.close();

        if (!historySaved) {
            saveHistory(
                user,
                promptRequest,
                selectedTemplates,
                selectedModifiers,
                getHistory(),
                createMutation
            );
            setHistorySaved(true);
        } else {
            saveHistory(
                user,
                promptRequest,
                selectedTemplates,
                selectedModifiers,
                getHistory(),
                updateMutation
            );
        }
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
        newUserPromptRequest.metadata.modifiers = selectedModifiers;
        newUserPromptRequest.metadata.templates = selectedTemplates;
        setUserPromptRequest(newUserPromptRequest);

        promptRequest.chatReply = chatReply;
        promptRequest.metadata.history = getHistory();
        promptRequest.metadata.modifiers = selectedModifiers;
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

            {
                !isResponding && <ChatThreadReplyContainer reply={reply} />
            }

            <Box ref={replyScrollIntoView.targetRef}>
                <ThreadFooter
                    userPromptRequest={userPromptRequest}
                    promptRequest={promptRequest}
                />
            </Box>
        </Stack>
    )
}