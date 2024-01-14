import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL;

export const useModesQuery = () => {
    return useQuery({
        queryKey: ["modes"],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/modes`);

            return data;
        },
    });
};

export const useDefaultModeQuery = () => {
    return useQuery({
        queryKey: ["modes", "default"],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/modes/default`);

            return data;
        },
    });
};