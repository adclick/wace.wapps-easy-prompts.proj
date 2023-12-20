import { Filters } from '@/model/Filters';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useCraftsQuery = (selectedFilters: Filters) => {
    return useQuery({
        queryKey: ["crafts", selectedFilters],
        queryFn: () => {
            // Your API call to fetch crafts
            return axios.get("https://easyprompts.wacestudio.pt/api/crafts/123/?filters[search_term]=&filters[languages_ids]=1&filters[repositories_ids]=3&filters[technologies_ids]=1&filters[crafts_types]=PROMPTS");
        }
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