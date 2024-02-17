import { FC, useState } from "react";
import { PromptRequest, PromptRequestType } from "../../../models/PromptRequest";
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

interface ThreadChatProps {
    promptRequest: PromptRequest
}

const ThreadChat: FC<ThreadChatProps> = ({
    promptRequest
}: ThreadChatProps) => {
    const [updatedPromptRequest, setUpdatedPromptRequest] = useState<PromptRequest>(promptRequest);
    const [
        user,
        promptsRequests,
        setPromptsRequests
    ] = useStore(useShallow(state => [
        state.user,
        state.promptsRequests,
        state.setPromptsRequests
    ]));
    const [reply, setReply] = useState('');

    let promptChatMessages = promptRequest.prompts_chat_messages;
    if (promptRequest.isPlayable) {
        promptChatMessages = [promptChatMessages[promptChatMessages.length - 1]];
    }

    const [chatMessages, setChatMessages] = useState<PromptChatMessage[]>(promptChatMessages);

    const { data, error } = useChatQuery(promptRequest, chatMessages);

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
        const newPromptRequest = promptRequest;
        newPromptRequest.prompts_chat_messages = chatMessages;
        setUpdatedPromptRequest(newPromptRequest);
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
        const newPromptRequest = Prompt.clone(promptRequest) as PromptRequest;
        newPromptRequest.key = promptRequest.key + 1;
        newPromptRequest.isPlayable = promptRequest.isPlayable;
        newPromptRequest.type = PromptRequestType.Prompt;
        newPromptRequest.response = "";

        const newPromptsRequests = promptsRequests.map(p => p.key === promptRequest.key ? newPromptRequest : p);

        setPromptsRequests(newPromptsRequests);
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
                                    !promptRequest.isPlayable
                                        ? <>
                                            <Box key={index}>
                                                {
                                                    !promptRequest.isPlayable &&
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
                            !promptRequest.isPlayable &&
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
                !promptRequest.isPlayable && canReply() &&
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

            <ThreadFooter promptRequest={updatedPromptRequest} />
        </Stack>
    )
}

export default ThreadChat;