import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useUsersLoginsQuery = (userId: string, email: string) => {
    return useQuery({
        queryKey: ["users", "login", userId, email],
        queryFn: () => {
            // Your API call to fetch crafts
            return axios.post(`${import.meta.env.VITE_API_URL}/users/login/`, {
                userId,
                email
            });
        }
    });
};