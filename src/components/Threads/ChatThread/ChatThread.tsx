import { Divider, Group, Stack } from "@mantine/core";
import { useUser } from "../../../context/UserContext";
import { PromptRequest } from "../../../model/PromptRequest";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { chat } from "../../../api/aiApi";
import { ThreadHeader } from "../ThreadHeader/ThreadHeader";
import { ThreadRequest } from "../ThreadRequest/ThreadRequest";
import { ThreadResponse } from "../ThreadResponse/ThreadResponse";
import { ChatThreadReplyContainer } from "../ChatThreadReplyContainer/ChatThreadReplyContainer";
import { ChatThreadReplyButton } from "../ChatThreadReplyButton/ChatThreadReplyButton";
import { ThreadFooter } from "../ThreadFooter/ThreadFooter";

interface ChatThread {
    promptRequest: PromptRequest,
    deleteThread: any
}

interface Message {
    id: number,
    request: string,
    response: string
}

export function ChatThread({ promptRequest, deleteThread }: ChatThread) {
    const { user } = useUser();
    const [replyOpened, replyHandle] = useDisclosure(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [minimized, minimizeHandle] = useDisclosure(false);

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

    useEffect(() => {
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
    });

    const fetch = async (message: Message) => {
        try {
            const history = messages.filter(m => m.response !== "");

            const response = await chat(message.request, promptRequest.provider.id, history);

            updateMessages(message.id, message.request, response);
        } catch (error) {
            console.error(error);
        }
    }

    const save = () => {

    }

    const reply = (replyValue: string, setReplyValue: any) => {
        const message: Message = {
            id: messages.length,
            request: replyValue,
            response: ""
        };

        updateMessages(message.id, message.request, "");
        fetch(message);

        replyHandle.close();
        setReplyValue("");
    }

    return (
        <>
            <ThreadHeader
                promptRequest={promptRequest}
                deleteThread={deleteThread}
                minimized={minimized}
                minimizeHandle={minimizeHandle}
            />
            {
                !minimized &&
                <Stack gap={"xl"}>
                    {
                        messages.map(message => {
                            return (
                                <Stack key={message.id} gap={"xl"}>
                                    <ThreadRequest request={message.request} user={user} />
                                    <ThreadResponse response={message.response} />
                                </Stack>
                            )
                        })
                    }
                    <Stack>
                        {
                            replyOpened && <ChatThreadReplyContainer reply={reply} />
                        }
                        <Group>
                            <ChatThreadReplyButton onClick={replyHandle.toggle} />
                        </Group>
                        <Divider />
                        <ThreadFooter promptRequest={promptRequest} />
                    </Stack>
                </Stack>
            }
        </>
    )
}