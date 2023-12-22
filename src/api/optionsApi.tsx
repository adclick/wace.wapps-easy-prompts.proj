import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useOptionsQuery = () => {
    return useQuery({
        queryKey: ["options"],
        queryFn: async () => {
            // Your API call to fetch crafts
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/options/`);

            return data;
        },
    });
};