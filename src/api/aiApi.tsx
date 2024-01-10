import axios from 'axios';
import { PromptRequest } from '../model/PromptRequest';

const API_URL = import.meta.env.VITE_API_URL;
const ERROR_MESSAGE = "Something went wrong. Please contact support";

export const textGeneration = async (request: PromptRequest): Promise<string> => {
    try {
        const { data } = await axios.get(`${API_URL}/ai/text-generation?` + new URLSearchParams({
            text: request.content,
            providerId: request.provider.id.toString(),
            craftId: request.id.toString()
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
            providerId: request.provider.id.toString(),
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
            promptId: 0,
            text,
            providerId: providerId.toString(),
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