import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useFiltersQuery = (userId: string) => {
    return useQuery({
        queryKey: ["filters", userId],
        queryFn: () => {
            // Your API call to fetch crafts
            return axios.get("https://easyprompts.wacestudio.pt/api/filters/" + userId);
        }
    });
};