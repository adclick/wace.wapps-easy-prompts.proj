import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { User } from '../models/User';

const API_URL = import.meta.env.VITE_API_URL;

export const useFiltersQuery = (user: User, enabled: boolean = true) => {
    return useQuery({
        queryKey: ["filters", user.external_id],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/filters/?` + new URLSearchParams({
                user_external_id: user.external_id
            }));

            return data;
        },
        enabled: user.isLoggedIn && enabled
    });
};

export const usePrivateFiltersQuery = (user: User, enabled: boolean = true) => {
    return useQuery({
        queryKey: ["filters", "private", user.id],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/filters/private?` + new URLSearchParams({
                user_external_id: user.id
            }));

            return data;
        },
        enabled: user.isLoggedIn && enabled
    });
};

export const usePublicDatabaseFiltersQuery = (user: User, enabled: boolean = true) => {
    return useQuery({
        queryKey: ["filters", "public-databse", user.id],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/filters/public?` + new URLSearchParams({
                user_external_id: user.id
            }));

            return data;
        },
        enabled: user.isLoggedIn && enabled
    });
};