import axios, { AxiosError } from 'axios';
import { PromptRequest } from '../models/PromptRequest';
import { Modifier } from '../models/Modifier';
import { useQuery } from '@tanstack/react-query';
import { Template } from '../models/Template';

const API_URL = import.meta.env.VITE_API_URL;
const ERROR_MESSAGE = "Something went wrong. Please try again later or contact support";

export const useChatQuery = (
    promptRequest: PromptRequest,
) => {
    return useQuery({
        queryKey: ["chat", promptRequest.key],
        queryFn: async () => {
            const modifiersIds = promptRequest.metadata && "modifiers" in promptRequest.metadata ? promptRequest.metadata.modifiers.map(m => m.id) : [];
            const templatesIds = promptRequest.metadata && "templates" in promptRequest.metadata ? promptRequest.metadata.templates.map(t => t.id) : [];

            const { data } = await axios.post(`${API_URL}/ai/chat`, {
                text: promptRequest.content,
                provider_id: promptRequest.provider.id,
                modifiers_ids: JSON.stringify(modifiersIds),
                templates_ids: JSON.stringify(templatesIds),
                chat_messages: JSON.stringify(promptRequest.prompts_chat_messages)
            });

            return data;
        },
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        enabled: promptRequest.content !== ""
    });
};

export const chat = async (
    text: string,
    providerId: number,
    history: { role: string, message: string }[],
    modifiers: Modifier[],
    templates: Template[]
): Promise<string> => {
    try {
        const modifiersIds = modifiers.map(m => m.id);
        const templatesIds = templates.map(t => t.id);

        const { data } = await axios.post(`${API_URL}/ai/chat`, {
            text,
            provider_id: providerId,
            modifiers_ids: JSON.stringify(modifiersIds),
            templates_ids: JSON.stringify(templatesIds),
            chat_messages: JSON.stringify(history)
        });

        return data;
    } catch (e) {
        if (e instanceof AxiosError) {
            return e.response?.data.message;
        }

        return ERROR_MESSAGE;
    }
};

export const chatByPromptId = async (promptId: number) => {
    try {
        const { data } = await axios.post(`${API_URL}/ai/chat/prompt/${promptId}`);

        console.log(data);
        return data;
    } catch (e) {
        console.error(e);
        return {
            response: ERROR_MESSAGE,
            technology: undefined,
            provider: undefined
        };
    }
};