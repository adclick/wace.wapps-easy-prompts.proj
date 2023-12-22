import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { SelectedFilters } from '../model/SelectedFilters';

export const useCraftsQuery = (userId: string, selectedFilters: SelectedFilters) => {
    return useQuery({
        queryKey: ["crafts", selectedFilters],
        queryFn: async () => {
            const { search_term, languages_ids, repositories_ids, technologies_ids, crafts_types } = selectedFilters;
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/crafts/?` + new URLSearchParams({
                userId,
                search_term,
                languages_ids: languages_ids.join(','),
                repositories_ids: repositories_ids.join(','),
                technologies_ids: technologies_ids.join(','),
                crafts_types: crafts_types.join(',')
            }));

            return data;
        },
        enabled: !!userId && !selectedFilters.isEmpty
    });
};

export const useCreateModifierMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: FormData) => {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/crafts/modifier`, {
                userId: formData.get('userId'),
                name: formData.get('name'),
                description: formData.get('description'),
                content: formData.get('content'),
                language_id: formData.get('language_id'),
                repository_id: formData.get('repository_id'),
                technology_id: formData.get('technology_id'),
            })

            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["crafts"]
            })
        },
        onError: (error) => {
            return error
        }
    })
}