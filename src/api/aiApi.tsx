import axios from 'axios';
import { PromptRequest } from '../model/PromptRequest';
import { Technology } from '../model/Technology';
import { Provider } from '../model/Provider';

const API_URL = import.meta.env.VITE_API_URL;
const ERROR_MESSAGE = "Something went wrong. Please try again later or contact support";

export const textGeneration = async (request: PromptRequest): Promise<string> => {
    try {
        const modifiersIds = request.metadata.modifiers.map(m => m.id);

        const { data } = await axios.get(`${API_URL}/ai/text-generation?` + new URLSearchParams({
            text: request.content,
            provider_id: request.provider.id.toString(),
            modifiers_ids: JSON.stringify(modifiersIds),
        }));
    
        return data;
    } catch(e) {
        console.error(e);
        return ERROR_MESSAGE;
    }
};

export const textGenerationById = async (promptId: number): Promise<string> => {
    try {
        const { data } = await axios.get(`${API_URL}/ai/text-generation/${promptId}`);
    
        return data;
    } catch(e) {
        console.error(e);
        return ERROR_MESSAGE;
    }
};

export const imageGeneration = async (request: PromptRequest): Promise<string[]|string> => {
    try {
        const { data } = await axios.get(`${API_URL}/ai/image-generation?` + new URLSearchParams({
            text: request.content,
            provider_id: request.provider.id.toString(),
            modifiers_ids: JSON.stringify([])
        }));
    
        return data;
    } catch(e) {
        console.error(e);
        return ERROR_MESSAGE;
    }
};

export const imageGenerationById = async (promptId: number): Promise<string[]|string> => {
    try {
        const { data } = await axios.get(`${API_URL}/ai/image-generation/${promptId}`);
    
        return data;
    } catch(e) {
        console.error(e);
        return ERROR_MESSAGE;
    }
};

export const chat = async (text: string, providerId: number,  history: {role: string, message: string}[]): Promise<string> => {
    try {
        const { data } = await axios.post(`${API_URL}/ai/chat`, {
            text,
            provider_id: providerId,
            chat_history: JSON.stringify(history)
        });
    
        return data;
    } catch(e) {
        console.error(e);
        return ERROR_MESSAGE;
    }
};

export const chatById = async (promptId: number): Promise<{response: string, technology: Technology|undefined, provider: Provider|undefined}> => {
    try {
        const { data } = await axios.post(`${API_URL}/ai/chat/${promptId}`);
    
        return data;
    } catch(e) {
        console.error(e);
        return {
            response: ERROR_MESSAGE,
            technology: undefined,
            provider: undefined
        };
    }
};