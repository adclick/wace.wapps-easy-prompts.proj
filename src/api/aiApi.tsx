import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Request } from '../model/Request';

export const useAIQuery = (request: Request, userId: string, responded: boolean) => {
    return useQuery({
        queryKey: ["ai", request.technology.slug, request.timestamp],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/ai/${request.technology.slug}/?` + new URLSearchParams({
                text: request.text,
                providerId: request.provider.id.toString()
            }));

            return data;
        },
        enabled: !!userId && !responded,
        staleTime: Infinity,
        retry: false
    });
};