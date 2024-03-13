import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { SelectedFilters } from '../models/SelectedFilters';
import { User } from '../models/User';
import { PromptFormValues } from '../context/PromptFormContext';

const API_URL = import.meta.env.VITE_API_URL;
const LIST_LIMIT = 10;

export const usePromptQuery = (user: User, promptId: string, enabled: boolean = true) => {
    return useQuery({
        queryKey: ["prompts", promptId],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/prompts/${promptId}`);

            return data;
        },
        enabled: user.isLoggedIn && promptId !== "" && enabled
    });
};

export const usePromptsQuery = (user: User, selectedFilters: SelectedFilters, enabled: boolean = true) => {
    return useInfiniteQuery({
        queryKey: ["prompts", selectedFilters],
        queryFn: async ({ pageParam }) => {
            const { data } = await axios.get(`${API_URL}/prompts/?` + new URLSearchParams({
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
        enabled: !!user.external_id && user.isLoggedIn && !selectedFilters.isEmpty && enabled
    });
};

export const useCreatePromptMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: PromptFormValues) => {
            const { data } = await axios.post(`${API_URL}/prompts`, {
                user_external_id: formData.user_id,
                title: formData.title,
                description: formData.description,
                content: formData.content,
                language_id: formData.language_id,
                repository_id: formData.repository_id,
                technology_id: formData.technology_id,
                provider_id: formData.provider_id,
                templates_ids: JSON.stringify(formData.templates_ids),
                modifiers_ids: JSON.stringify(formData.modifiers_ids),
                chat_messages: formData.prompt_chat_messages,
                prompt_parameters: JSON.stringify(formData.prompt_parameters),
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

export const useUpdatePromptMutation = (promptUUID: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: PromptFormValues) => {
            const { data } = await axios.put(`${API_URL}/prompts/${promptUUID}`, {
                user_external_id: formData.user_id,
                title: formData.title,
                description: formData.description,
                content: formData.content,
                language_id: formData.language_id,
                repository_id: formData.repository_id,
                technology_id: formData.technology_id,
                provider_id: formData.provider_id,
                templates_ids: JSON.stringify(formData.templates_ids),
                modifiers_ids: JSON.stringify(formData.modifiers_ids),
                chat_messages: formData.prompt_chat_messages,
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
        mutationFn: async (uuid: string) => {
            const { data } = await axios.delete(`${API_URL}/prompts/${uuid}`)

            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["prompts"]
            })
        }
    })
}