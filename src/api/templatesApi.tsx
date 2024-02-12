import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { SelectedFilters } from '../models/SelectedFilters';
import { CreateTemplateFormValues } from '../context/CreateTemplateFormContext';
import { UpdateTemplateFormValues } from '../context/UpdateTemplateFormContext';
import { User } from '../models/User';

const API_URL = import.meta.env.VITE_API_URL;
const LIST_LIMIT = 20;

export const useTemplateQuery = (templateId: number, enabled: boolean = true) => {
    return useQuery({
        queryKey: ["templates", templateId],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/templates/${templateId}`);

            return data;
        },
        enabled: templateId > 0 && enabled
    });
};

export const useTemplatesQuery = (userId: string, selectedFilters: SelectedFilters, enabled: boolean = true) => {
    return useInfiniteQuery({
        queryKey: ["templates", selectedFilters],
        queryFn: async ({pageParam}) => {
            const { data } = await axios.get(`${API_URL}/templates/?` + new URLSearchParams({
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

export const usePrivateTemplatesQuery = (user: User, selectedFilters: SelectedFilters, enabled: boolean = true) => {
    return useInfiniteQuery({
        queryKey: ["templates", selectedFilters],
        queryFn: async ({pageParam}) => {
            const { data } = await axios.get(`${API_URL}/templates/?` + new URLSearchParams({
                user_external_id: user.id,
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

export const useCreateTemplateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: FormData) => {
            const { data } = await axios.post(`${API_URL}/templates`, {
                user_external_id: formData.get('userId'),
                title: formData.get('title'),
                description: formData.get('description'),
                language_id: formData.get('language_id'),
                repository_id: formData.get('repository_id'),
                technology_id: formData.get('technology_id'),
                provider_id: formData.get('provider_id'),
                modifiers_ids: formData.get('modifiers_ids'),
                chat_history: formData.get('chat_history'),
                template_parameters: formData.get('template_parameters'),
            })

            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["templates"]
            })
        }
    })
}

export const useUpdateTemplateMutation = (templateId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: UpdateTemplateFormValues) => {
            const { data } = await axios.put(`${API_URL}/templates/${templateId}`, {
                user_external_id: formData.user_id,
                title: formData.title,
                description: formData.description,
                language_id: formData.language_id,
                repository_id: formData.repository_id,
                technology_id: formData.technology_id,
                provider_id: formData.provider_id,
                modifiers_ids: formData.modifiers_ids,
                chat_history: formData.chat_messages,
                template_parameters: formData.template_parameters
            })

            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["templates"]
            })
        }
    })
}

export const useDeleteTemplateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const { data } = await axios.delete(`${API_URL}/templates/${id}`)

            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["templates"]
            })
        }
    })
}