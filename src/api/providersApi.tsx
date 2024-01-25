import axios from 'axios';
import { Provider } from '../model/Provider';
import { useQuery } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL;

export const getProviders = async (technologyId: number): Promise<Provider[]> => {
    const { data } = await axios.get(`${API_URL}/providers?` + new URLSearchParams({
        technology_id: technologyId.toString()
    }));

    return data;
}

export const getDefaultProvider = async (technologyId: number): Promise<Provider> => {
    const { data } = await axios.get(`${API_URL}/providers/default?` + new URLSearchParams({
        technology_id: technologyId.toString()
    }));

    return data;
}

export const useProvidersQuery = (technologyId: number) => {
    return useQuery({
        queryKey: ["providers", technologyId],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/providers?` + new URLSearchParams({
                technology_id: technologyId.toString()
            }));

            return data;
        },
        enabled: technologyId > 0
    });
};

export const useDefaultProviderQuery = (technologyId: number) => {
    return useQuery({
        queryKey: ["providers", "default", technologyId],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/providers/default?` + new URLSearchParams({
                technology_id: technologyId.toString()
            }));

            return data;
        },
    });
};