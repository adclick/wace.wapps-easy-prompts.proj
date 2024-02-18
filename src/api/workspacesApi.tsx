import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const useWorkspacesQuery = (userId: string) => {
    return useQuery({
        queryKey: ["workspaces", userId],
        queryFn: async () => {

            const { data } = await axios.get(`${API_URL}/workspaces/?` + new URLSearchParams({
                user_external_id: userId,
            }));

            return data;
        },
        enabled: !!userId
    });
};
