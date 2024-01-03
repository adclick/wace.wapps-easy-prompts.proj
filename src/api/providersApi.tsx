import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const useProvidersQuery = (technologyId: number) => {
    return useQuery({
        queryKey: ["providers", technologyId],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/providers?` + new URLSearchParams({
                technologyId: technologyId.toString()
            }));

            return data;
        },
        enabled: technologyId > 0
    });
};

export const useDefaultProvidersQuery = (technologyId: number) => {
    return useQuery({
        queryKey: ["providers", "default", technologyId],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/providers/default?` + new URLSearchParams({
                technologyId: technologyId.toString()
            }));

            return data;
        },
        enabled: technologyId > 0
    });
};