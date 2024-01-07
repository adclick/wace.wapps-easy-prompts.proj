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

export const chat = async (requests: PromptRequest[]): Promise<string> => {
    const lastRequest = requests.pop();
    if (!lastRequest) return "";

    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/ai/chat`, {
        text: lastRequest.content,
        providerId: lastRequest.provider.id.toString(),
        requests: requests.map(r => {
            return {
                request: r.content,
                response: r.response
            }
        })
    });

    return data;
};