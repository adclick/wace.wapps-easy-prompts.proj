import { FC } from "react";
import { PromptRequest } from "../../models/PromptRequest";
import { Stack } from "@mantine/core";
import { ThreadRequest } from "../../components/Threads/Layout/ThreadRequest/ThreadRequest";
import { ThreadResponse } from "../../components/Threads/Layout/ThreadResponse/ThreadResponse";
import { ChatThreadReplyContainer } from "../../components/Threads/Layout/ChatThreadReplyContainer/ChatThreadReplyContainer";
import { useChatQuery } from "../../api/chatApi";

interface ThreadChatProps {
    key: number,
    promptRequest: PromptRequest
}

const ThreadChat: FC<ThreadChatProps> = ({
    key,
    promptRequest
}: ThreadChatProps) => {
    const { data, isLoading } = useChatQuery(promptRequest);

    return (
        <Stack>
            <Stack gap={"xl"}>
                {
                    promptRequest.prompts_chat_messages.map((message, index) => {
                        return (
                            message.role === "user"
                                ? <ThreadRequest key={index} request={message.message} />
                                : <ThreadResponse key={index} response={message.message} />
                        )
                    })
                }
                <ThreadRequest request={promptRequest.content} />

                


                {
                    data &&
                    <Stack>
                        <ThreadResponse response={data} />
                        <ChatThreadReplyContainer reply={undefined} />
                    </Stack>

                }
            </Stack>

        </Stack>
    )
}

export default ThreadChat;