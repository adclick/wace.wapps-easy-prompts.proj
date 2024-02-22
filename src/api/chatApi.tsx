import axios, { AxiosError } from 'axios';
import { Modifier } from '../models/Modifier';
import { useQuery } from '@tanstack/react-query';
import { Template } from '../models/Template';
import { PromptChatMessage } from '../models/PromptChatMessage';
import { Thread } from '../models/Thread';
import { User } from '../models/User';
import { PromptChatMessageRole } from '../enums';

const API_URL = import.meta.env.VITE_API_URL;

export const useChatQuery = (
    user: User,
    thread: Thread,
    chatMessages: PromptChatMessage[]
) => {
    const lastMessage = chatMessages[chatMessages.length - 1];

    return useQuery({
        queryKey: ["chat", thread.key, chatMessages.length],
        queryFn: async () => {
            const templatesIds = thread.threads_templates.map(t => Number(t.template.id));
            const modifiersIds = thread.threads_modifiers.map(m => Number(m.modifier.id));

            const { data } = await axios.post(`${API_URL}/ai/chat?` + new URLSearchParams({
                user_external_id: user.external_id
            }), {
                text: lastMessage?.message,
                provider_id: thread.provider.id,
                modifiers_ids: JSON.stringify(modifiersIds),
                templates_ids: JSON.stringify(templatesIds),
                chat_messages: JSON.stringify(chatMessages)
            });

            return data;
        },
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        enabled: user.isLoggedIn  && chatMessages.length > 0 && lastMessage && lastMessage.role === PromptChatMessageRole.USER
    });
};