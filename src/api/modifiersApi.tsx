import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { SelectedFilters } from '../models/SelectedFilters';
import { User } from '../models/User';
import { ModifierFormValues } from '../context/ModifierFormContext';

const API_URL = import.meta.env.VITE_API_URL;
const LIST_LIMIT = 10;

export const useModifierQuery = (modifierUUID: string, enabled: boolean = true) => {
    return useQuery({
        queryKey: ["modifiers", modifierUUID],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/modifiers/${modifierUUID}`);

            return data;
        },
        enabled: modifierUUID !== "" && enabled
    });
};

export const useAllModifiersQuery = (user: User, enabled: boolean = true) => {
    return useQuery({
        queryKey: ["modifiers", "all", user.external_id],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/modifiers/all?` + new URLSearchParams({
                user_external_id: user.external_id,
            }));

            return data;
        },
        enabled: user.isLoggedIn && !!user.external_id && enabled
    });
};

export const useModifiersQuery = (user: User, selectedFilters: SelectedFilters, enabled: boolean = true) => {
    return useInfiniteQuery({
        queryKey: ["modifiers", selectedFilters],
        queryFn: async ({pageParam}) => {
            const { data } = await axios.get(`${API_URL}/modifiers/?` + new URLSearchParams({
                user_external_id: user.external_id,
                search_term: selectedFilters.search_term,
                languages_ids: JSON.stringify(selectedFilters.languages_ids),
                repositories_ids: JSON.stringify(selectedFilters.repositories_ids),
                technologies_ids: JSON.stringify(selectedFilters.technologies_ids),
                limit: LIST_LIMIT.toString(),
                offset: pageParam.toString()
            }));

            return data;
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.length < LIST_LIMIT) return null;

            return LIST_LIMIT * pages.length;
        },
        enabled: user.isLoggedIn && !!user.external_id && !selectedFilters.isEmpty && enabled
    });
};

export const useCreateModifierMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: ModifierFormValues) => {
            const { data } = await axios.post(`${API_URL}/modifiers`, {
                user_external_id: formData.user_id,
                title: formData.title,
                description: formData.description,
                content: formData.content,
                language_id: formData.language_id,
                repository_id: formData.repository_id,
                technology_id: formData.technology_id,
                provider_id: formData.provider_id
            })

            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["modifiers"]
            })
        }
    })
}

export const useUpdateModifierMutation = (modifierId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: ModifierFormValues) => {
            const { data } = await axios.put(`${API_URL}/modifiers/${modifierId}`, {
                user_external_id: formData.user_id,
                title: formData.title,
                description: formData.description,
                content: formData.content,
                language_id: formData.language_id,
                repository_id: formData.repository_id,
                technology_id: formData.technology_id,
                provider_id: formData.provider_id
            })

            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["modifiers"]
            })
        }
    })
}

export const useDeleteModifierMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const { data } = await axios.delete(`${API_URL}/modifiers/${id}`)

            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["modifiers"]
            })
        }
    })
}