import axios from 'axios';
import { PromptRequest } from '../model/PromptRequest';

const API_URL = import.meta.env.VITE_API_URL;

export const textGeneration = async (request: PromptRequest): Promise<string> => {
    const { data } = await axios.get(`${API_URL}/ai/text-generation?` + new URLSearchParams({
        text: request.content,
        providerId: request.provider.id.toString(),
        craftId: request.id.toString()
    }));

    return data;
};

export const imageGeneration = async (request: PromptRequest): Promise<string[]> => {
    const { data } = await axios.get(`${API_URL}/ai/image-generation?` + new URLSearchParams({
        text: request.content,
        providerId: request.provider.id.toString(),
        parameters: ""
    }));

    return data;
};

export const chat = async (text: string, providerId: number,  history: {request: string, response: string}[]): Promise<string> => {
    const { data } = await axios.post(`${API_URL}/ai/chat`, {
        promptId: 0,
        text,
        providerId: providerId.toString(),
        requests: history
    });

    return data;
};

export const play = async (promptId: number): Promise<string> => {
    const { data } = await axios.post(`${API_URL}/ai/play`, {
        promptId,
    });

    return data;
};