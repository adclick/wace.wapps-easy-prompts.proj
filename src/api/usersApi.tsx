import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useUsersLoginsQuery = (userId: string, userEmail: string) => {
    return useQuery({
        queryKey: ["users", "login", userId, userEmail],
        queryFn: () => {
            // Your API call to fetch crafts
            return axios.get(`https://easyprompts.wacestudio.pt/api/users/login/${userId}/${userEmail}`);
        }
    });
};