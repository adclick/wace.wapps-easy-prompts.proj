import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ModifiersSelectedFilters } from '../model/ModifiersSelectedFilters';

export const useModifiersFiltersQuery = (userId: string) => {
    return useQuery({
        queryKey: ["modifiers", "filters", userId],
        queryFn: async () => {
            // Your API call to fetch crafts
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/modifiers/filters/?` + new URLSearchParams({
                user_external_id: userId
            }));

            return data;
        },
        enabled: !!userId
    });
};

export const useModifierssQuery = (userId: string, selectedFilters: ModifiersSelectedFilters) => {
    return useQuery({
        queryKey: ["modifiers", selectedFilters],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/modifiers/?` + new URLSearchParams({
                user_external_id: userId,
                search_term: selectedFilters.search_term,
                languages_ids: JSON.stringify(selectedFilters.languages_ids),
                repositories_ids: JSON.stringify(selectedFilters.repositories_ids),
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
                user_external_id: formData.get('userId'),
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
        }
    })
}

export const useDeleteCraftMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/crafts/${id}`)

            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["crafts"]
            })
        }
    })
}