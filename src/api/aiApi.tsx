import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Request } from '../model/Request';

export const useAIQuery = (request: Request, userId: string, responded: boolean) => {
    const parameters = request.crafts_parameters.map(cp => {
        return {slug: cp.parameter.slug, value: cp.value}
    });

    return useQuery({
        queryKey: ["ai", request.technology.slug, request.timestamp],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/ai/${request.technology.slug}/?` + new URLSearchParams({
                text: request.prompt,
                providerId: request.provider.id.toString(),
                parameters: JSON.stringify(parameters)
            }));

            return data;
        },
        enabled: !!userId && !responded,
        staleTime: Infinity,
        retry: false
    });
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