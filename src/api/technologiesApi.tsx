import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Request } from '../model/Request';

export const useTechnologiesQuery = () => {
    return useQuery({
        queryKey: ["technologies"],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/technologies`);

            return data;
        },
    });
};

export const useDefaultTechnologyQuery = () => {
    return useQuery({
        queryKey: ["technologies", "default"],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/technologies/default`);

            return data;
        },
    });
};