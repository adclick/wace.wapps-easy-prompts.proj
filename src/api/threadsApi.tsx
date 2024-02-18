import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const useThreadsQuery = (userId: string, workspaceId: number) => {
    return useQuery({
        queryKey: ["threads", userId, workspaceId],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/threads/?` + new URLSearchParams({
                user_id: userId.toString(),
                workspace_id: workspaceId.toString(),
            }));

            return data;
        },
        enabled: workspaceId > 0
    });
};
