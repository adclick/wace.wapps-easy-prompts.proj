import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { SelectedFilters } from '../models/SelectedFilters';
import { UpdatePromptFormValues } from '../context/UpdatePromptFormContext';
import { User } from '../models/User';

const API_URL = import.meta.env.VITE_API_URL;
const LIST_LIMIT = 20;

export const usePromptQuery = (promptId: number, enabled: boolean = true) => {
    return useQuery({
        queryKey: ["prompts", promptId],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/prompts/${promptId}`);

            return data;
        },
        enabled: promptId > 0 && enabled
    });
};

export const usePromptsQuery = (userId: string, selectedFilters: SelectedFilters, enabled: boolean = true) => {
    return useInfiniteQuery({
        queryKey: ["prompts", selectedFilters],
        queryFn: async ({ pageParam }) => {
            const { data } = await axios.get(`${API_URL}/prompts/?` + new URLSearchParams({
                user_external_id: userId,
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
        enabled: !!userId && !selectedFilters.isEmpty && enabled
    });
};

export const usePrivatePromptsQuery = (user: User, selectedFilters: SelectedFilters, enabled: boolean = true) => {
    return useInfiniteQuery({
        queryKey: ["prompts", "history", selectedFilters],
        queryFn: async ({ pageParam }) => {
            const { data } = await axios.get(`${API_URL}/prompts/?` + new URLSearchParams({
                user_external_id: user.external_id,
                search_term: selectedFilters.search_term,
                languages_ids: JSON.stringify(selectedFilters.languages_ids),
                repositories_ids: JSON.stringify([user.history_repository_id]),
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
        enabled: !!user.id && !selectedFilters.isEmpty && enabled
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
                response: formData.get('response'),
                language_id: formData.get('language_id'),
                repository_id: formData.get('repository_id'),
                technology_id: formData.get('technology_id'),
                provider_id: formData.get('provider_id'),
                modifiers_ids: formData.get('modifiers_ids'),
                templates_ids: formData.get('templates_ids'),
                chat_messages: formData.get('chat_messages'),
                prompt_parameters: formData.get('prompt_parameters')
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

export const useUpdatePromptMutation = (promptId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: UpdatePromptFormValues) => {
            const { data } = await axios.put(`${API_URL}/prompts/${promptId}`, {
                user_external_id: formData.user_id,
                title: formData.title,
                description: formData.description,
                content: formData.content,
                language_id: formData.language_id,
                repository_id: formData.repository_id,
                technology_id: formData.technology_id,
                provider_id: formData.provider_id,
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