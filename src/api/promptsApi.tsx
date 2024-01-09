import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { PromptsSelectedFilters } from '../model/PromptsSelectedFilters';

const API_URL = import.meta.env.VITE_API_URL;

export const usePromptsFiltersQuery = (userId: string) => {
    return useQuery({
        queryKey: ["prompts", "filters", userId],
        queryFn: async () => {
            // Your API call to fetch crafts
            const {data} = await axios.get(`${API_URL}/prompts/filters/?` + new URLSearchParams({userId}));

            return data;
        },
        enabled: !!userId
    });
};

export const usePromptsQuery = (userId: string, selectedFilters: PromptsSelectedFilters) => {
    return useQuery({
        queryKey: ["prompts", selectedFilters],
        queryFn: async () => {
            const { search_term, languages_ids, repositories_ids, technologies_ids } = selectedFilters;
            const { data } = await axios.get(`${API_URL}/prompts/?` + new URLSearchParams({
                userId,
                search_term,
                languages_ids: languages_ids.join(','),
                repositories_ids: repositories_ids.join(','),
                technologies_ids: technologies_ids.join(','),
            }));

            return data;
        },
        enabled: !!userId && !selectedFilters.isEmpty
    });
};

export const useCreatePromptMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: FormData) => {
            const { data } = await axios.post(`${API_URL}/prompts`, {
                userId: formData.get('userId'),
                name: formData.get('name'),
                description: formData.get('description'),
                content: formData.get('content'),
                language_id: formData.get('language_id'),
                repository_id: formData.get('repository_id'),
                technology_id: formData.get('technology_id'),
                provider_id: formData.get('provider_id'),
            })

            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["prompts"]
            })
        }
    })
}

export const useDeleteCraftMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const { data } = await axios.delete(`${API_URL}/crafts/${id}`)

            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["crafts"]
            })
        }
    })
}