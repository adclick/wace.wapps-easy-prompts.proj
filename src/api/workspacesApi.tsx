import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../models/User";

const API_URL = import.meta.env.VITE_API_URL;

export const useWorkspacesQuery = (user: User) => {
    return useQuery({
        queryKey: ["workspaces", user.id],
        queryFn: async () => {

            const { data } = await axios.get(`${API_URL}/workspaces/?` + new URLSearchParams({
                user_external_id: user.external_id,
            }));

            return data;
        },
        enabled: !!user.id && user.isLoggedIn
    });
};
