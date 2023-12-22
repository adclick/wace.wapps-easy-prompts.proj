import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useDefaultTechnologyQuery = () => {
    return useQuery({
        queryKey: ["technologies", "default"],
        queryFn: async () => {
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/technologies/default`);

            return data;
        },
    });
};