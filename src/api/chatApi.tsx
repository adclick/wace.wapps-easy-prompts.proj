import axios, { AxiosError } from 'axios';
import { Modifier } from '../models/Modifier';
import { useQuery } from '@tanstack/react-query';
import { Template } from '../models/Template';
import { PromptChatMessage } from '../models/PromptChatMessage';
import { Thread } from '../models/Thread';

const API_URL = import.meta.env.VITE_API_URL;
const ERROR_MESSAGE = "Something went wrong. Please try again later or contact support";

export const useChatQuery = (
    thread: Thread,
    chatMessages: PromptChatMessage[]
) => {
    const lastMessage = chatMessages[chatMessages.length - 1];

    return useQuery({
        queryKey: ["chat", thread.key, chatMessages.length],
        queryFn: async () => {
            const modifiersIds = thread.prompt.metadata && "modifiers" in thread.prompt.metadata ? thread.prompt.metadata.modifiers.map((m: Modifier) => m.id) : [];
            const templatesIds = thread.prompt.metadata && "templates" in thread.prompt.metadata ? thread.prompt.metadata.templates.map((t: Template) => t.id) : [];

            const { data } = await axios.post(`${API_URL}/ai/chat`, {
                text: lastMessage?.message,
                provider_id: thread.prompt.provider.id,
                modifiers_ids: JSON.stringify(modifiersIds),
                templates_ids: JSON.stringify(templatesIds),
                chat_messages: JSON.stringify(chatMessages)
            });

            return data;
        },
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        enabled: lastMessage && lastMessage.role === "user"
    });
};