import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { SelectedFilters } from '../model/SelectedFilters';

const API_URL = import.meta.env.VITE_API_URL;

export const useTemplateQuery = (templateId: number, enabled: boolean = true) => {
    return useQuery({
        queryKey: ["templates", templateId],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/templates/${templateId}`);

            return data;
        },
        enabled
    });
};

export const useTemplatesQuery = (userId: string, selectedFilters: SelectedFilters) => {
    return useInfiniteQuery({
        queryKey: ["templates", selectedFilters],
        queryFn: async ({pageParam}) => {
            const { data } = await axios.get(`${API_URL}/templates/?` + new URLSearchParams({
                user_external_id: userId,
                search_term: selectedFilters.search_term,
                languages_ids: JSON.stringify(selectedFilters.languages_ids),
                repositories_ids: JSON.stringify(selectedFilters.repositories_ids),
                technologies_ids: JSON.stringify(selectedFilters.technologies_ids),
                limit: '10',
                offset: pageParam.toString()
            }));

            return data;
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => {
            return 10 * pages.length;
        },
        enabled: !!userId && !selectedFilters.isEmpty
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
                content: formData.get('content'),
                language_id: formData.get('language_id'),
                repository_id: formData.get('repository_id'),
                technology_id: formData.get('technology_id'),
                provider_id: formData.get('provider_id'),
                modifiers_ids: formData.get('modifiers_ids'),
                chat_history: formData.get('chat_history')
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