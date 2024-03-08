import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { PromptChatMessage } from '../models/PromptChatMessage';
import { Thread } from '../models/Thread';
import { User } from '../models/User';
import { PromptChatMessageRole } from '../enums';

const API_URL = import.meta.env.VITE_API_URL;

export const useChatQuery = (
    user: User,
    thread: Thread,
    chatMessages: PromptChatMessage[],
    enabled: boolean = true
) => {
    const lastMessage = chatMessages[chatMessages.length - 1];

    return useQuery({
        queryKey: ["chat", thread.key, chatMessages.length],
        queryFn: async () => {
            const { data } = await axios.post(`${API_URL}/ai/chat?` + new URLSearchParams({
                user_external_id: user.external_id
            }), {
                provider_id: thread.provider.uuid,
                chat_messages: chatMessages.map(ch => ({role: ch.role, message: ch.message, modifiers_ids: ch.threads_chat_messages_modifiers.map(m => m.modifier.uuid)}))
            });

            return data;
        },
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        enabled: user.isLoggedIn
            && chatMessages.length > 0
            && lastMessage.role === PromptChatMessageRole.USER
            && enabled
    });
};