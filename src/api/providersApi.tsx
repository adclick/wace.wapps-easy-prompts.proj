import axios from 'axios';
import { Provider } from '../models/Provider';
import { useQuery } from '@tanstack/react-query';
import { Technology } from '../models/Technology';

const API_URL = import.meta.env.VITE_API_URL;

export const getDefaultProvider = async (technology: Technology): Promise<Provider> => {
    const { data } = await axios.get(`${API_URL}/providers/default?` + new URLSearchParams({
        technology_id: technology.uuid
    }));

    return data;
}

export const useProvidersQuery = (technologyUUID: string) => {
    return useQuery({
        queryKey: ["providers", technologyUUID],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/providers?` + new URLSearchParams({
                technology_id: technologyUUID
            }));

            return data;
        },
        enabled: technologyUUID !== ""
    });
};

export const useDefaultProviderQuery = (technology: Technology) => {
    return useQuery({
        queryKey: ["providers", "default", technology.uuid],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/providers/default?` + new URLSearchParams({
                technology_id: technology.uuid
            }));

            return data;
        },
    });
};