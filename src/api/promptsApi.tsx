import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { PromptsSelectedFilters } from '../model/PromptsSelectedFilters';

const API_URL = import.meta.env.VITE_API_URL;

export const usePromptsFiltersQuery = (userId: string) => {
    return useQuery({
        queryKey: ["prompts", "filters", userId],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/prompts/filters/?` + new URLSearchParams({
                user_external_id: userId
            }));

            return data;
        },
        enabled: !!userId
    });
};

export const usePromptsQuery = (userId: string, selectedFilters: PromptsSelectedFilters) => {
    return useQuery({
        queryKey: ["prompts", selectedFilters],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/prompts/?` + new URLSearchParams({
                user_external_id: userId,
                search_term: selectedFilters.search_term,
                languages_ids: JSON.stringify(selectedFilters.languages_ids),
                repositories_ids: JSON.stringify(selectedFilters.repositories_ids),
                technologies_ids: JSON.stringify(selectedFilters.technologies_ids),
                modes_ids: JSON.stringify(selectedFilters.modes_ids),
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
                user_external_id: formData.get('userId'),
                title: formData.get('title'),
                description: formData.get('description'),
                content: formData.get('content'),
                language_id: formData.get('language_id'),
                repository_id: formData.get('repository_id'),
                technology_id: formData.get('technology_id'),
                mode_id: formData.get('mode_id'),
                provider_id: formData.get('provider_id'),
                modifiers_ids: formData.get('modifiers_ids')
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

export const useDeletePromptMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const { data } = await axios.delete(`${API_URL}/prompts/${id}`)

            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["prompts"]
            })
        }
    })
}