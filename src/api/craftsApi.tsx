import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { SelectedFilters } from '../model/SelectedFilters';

export const useCraftsQuery = (userId: string, selectedFilters: SelectedFilters) => {
    return useQuery({
        queryKey: ["crafts", selectedFilters],
        queryFn: async () => {
            const { search_term, languages_ids, repositories_ids, technologies_ids, crafts_types } = selectedFilters;
            // Your API call to fetch crafts
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/crafts/?` + new URLSearchParams({
                userId,
                search_term,
                languages_ids: languages_ids.join(','),
                repositories_ids: repositories_ids.join(','),
                technologies_ids: technologies_ids.join(','),
                crafts_types: crafts_types
            }));

            return data;
        },
        enabled: !!userId && !selectedFilters.isEmpty
    });
};

export const useCreatePromptMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (name: string) => {
            return axios.post("https://easyprompts.wacestudio.pt/api/crafts/123/prompt", {
                name,
                slug: name,
                description: name,
                content: name,
                language_id: 1,
                repository_id: 1,
                technology_id: 1,
                provider_id: 1,
                crafting_ids: []
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["crafts"]
            })
        }
    })
}