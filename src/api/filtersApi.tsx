import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const useFiltersQuery = (userId: string, enabled: boolean = true) => {
    return useQuery({
        queryKey: ["filters", userId],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/filters/?` + new URLSearchParams({
                user_external_id: userId
            }));

            return data;
        },
        enabled: !!userId && enabled
    });
};