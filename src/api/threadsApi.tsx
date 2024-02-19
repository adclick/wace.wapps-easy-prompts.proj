import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../models/User";

const API_URL = import.meta.env.VITE_API_URL;

export const useThreadsQuery = (user: User, workspaceId: number) => {
    return useQuery({
        queryKey: ["threads", user.id, workspaceId],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/threads/?` + new URLSearchParams({
                user_id: user.id.toString(),
                workspace_id: workspaceId.toString(),
            }));

            return data;
        },
        enabled: user.isLoggedIn && workspaceId > 0
    });
};
