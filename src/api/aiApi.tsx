import axios from 'axios';
import { Request } from '../model/Request';

const API_URL = import.meta.env.VITE_API_URL;

export const textGeneration = async (request: Request): Promise<string> => {
    const { data } = await axios.get(`${API_URL}/ai/text-generation?` + new URLSearchParams({
        text: request.prompt,
        providerId: request.provider.id.toString(),
        craftId: request.craftId.toString()
    }));

    return data;
};

export const imageGeneration = async (request: Request): Promise<string[]> => {
    const parameters = request.crafts_parameters.map(cp => {
        return {slug: cp.parameter.slug, value: cp.value}
    });

    const { data } = await axios.get(`${API_URL}/ai/image-generation?` + new URLSearchParams({
        text: request.prompt,
        providerId: request.provider.id.toString(),
        parameters: JSON.stringify(parameters)
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