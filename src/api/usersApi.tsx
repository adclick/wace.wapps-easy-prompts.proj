import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { User } from '../models/User';

export const useUsersLoginsQuery = (user: User) => {
    return useQuery({
        queryKey: ["users", user, "login"],
        queryFn: async () => {
            // Your API call to fetch crafts
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/users/login/`, {
                user_external_id: user.id,
                email: user.email,
                username: user.username
            });

            return data;
        },
        enabled: !!user.id && !user.isLoggedIn
    });
};