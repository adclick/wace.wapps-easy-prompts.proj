import axios from 'axios';
import { Request } from '../model/Request';
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

export const chat = async (currentRequest: Request, requests: Request[]): Promise<string> => {
    const lastRequest = requests.pop();

    if (!lastRequest) return "";

    const threads = requests.filter(r => r.response !== "").map(r => {
        return {
            request: r.prompt,
            response: r.response
        }
    })

    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/ai/text/chat`, {
        text: currentRequest.prompt,
        provider: currentRequest.provider.slug,
        threads
    });

    return data;
};