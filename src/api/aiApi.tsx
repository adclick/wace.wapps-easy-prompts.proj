import axios from 'axios';
import { PromptRequest } from '../model/PromptRequest';
import { Modifier } from '../model/Modifier';

const API_URL = import.meta.env.VITE_API_URL;
const ERROR_MESSAGE = "Something went wrong. Please try again later or contact support";

export const textGeneration = async (request: PromptRequest, modifiersSelected: Modifier[]): Promise<string> => {
    try {
        const { data } = await axios.get(`${API_URL}/ai/text-generation?` + new URLSearchParams({
            text: request.content,
            provider_id: request.provider.id.toString(),
            modifiers_ids: JSON.stringify(modifiersSelected.map(m => m.id)),
            prompt_id: request.id.toString()
        }));
    
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
            parameters: JSON.stringify("")
        }));
    
        return data;
    } catch(e) {
        console.error(e);
        return ERROR_MESSAGE;
    }
};

export const chat = async (text: string, providerId: number,  history: {request: string, response: string}[]): Promise<string> => {
    try {
        const { data } = await axios.post(`${API_URL}/ai/chat`, {
            prompt_id: 0,
            text,
            provider_id: providerId,
            requests: history
        });
    
        return data;
    } catch(e) {
        console.error(e);
        return ERROR_MESSAGE;
    }
};

export const play = async (promptId: number): Promise<string> => {
    const { data } = await axios.post(`${API_URL}/ai/play`, {
        promptId,
    });

    return data;
};