import axios from 'axios';
import { PromptRequest } from '../model/PromptRequest';
import { Technology } from '../model/Technology';
import { Provider } from '../model/Provider';
import { Modifier } from '../model/Modifier';
import { useQuery } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL;
const ERROR_MESSAGE = "Something went wrong. Please try again later or contact support";

export const useChatQuery = (request: PromptRequest, text: string, providerId: number, history: { role: string, message: string }[], modifiers: Modifier[]) => {
    return useQuery({
        queryKey: ["chat", request.key],
        queryFn: async () => {
            const modifiersIds = modifiers.map(m => m.id);


            const { data } = await axios.post(`${API_URL}/ai/chat`, {
                text: request.content,
                provider_id: providerId,
                providers_ids: JSON.stringify(providerId),
                modifiers_ids: JSON.stringify(modifiersIds),
            });

            return data;
        },
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });
};

export const chat = async (text: string, providerId: number, history: { role: string, message: string }[], modifiers: Modifier[]): Promise<string> => {
    try {
        const modifiersIds = modifiers.map(m => m.id);
        const { data } = await axios.post(`${API_URL}/ai/chat`, {
            text,
            provider_id: providerId,
            modifiers_ids: JSON.stringify(modifiersIds),
            chat_history: JSON.stringify(history)
        });

        return data;
    } catch (e) {
        console.error(e);
        return ERROR_MESSAGE;
    }
};

export const chatById = async (promptId: number): Promise<{ response: string, technology: Technology | undefined, provider: Provider | undefined }> => {
    try {
        const { data } = await axios.post(`${API_URL}/ai/chat/${promptId}`);

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