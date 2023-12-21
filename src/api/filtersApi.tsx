import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useFiltersQuery = (userId: string) => {
    return useQuery({
        queryKey: ["filters", userId],
        queryFn: async () => {
            // Your API call to fetch crafts
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/filters/?` + new URLSearchParams({userId}));

            return data;
        },
        enabled: !!userId
    });
};