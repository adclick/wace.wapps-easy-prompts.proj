import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { User } from '../models/User';

export const useTechnologiesQuery = (user: User) => {
    return useQuery({
        queryKey: ["technologies"],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/technologies`);

            return data;
        },
        enabled: user.isLoggedIn
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