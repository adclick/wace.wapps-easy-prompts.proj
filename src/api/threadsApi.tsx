import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../models/User";
import { ThreadFormValues } from "../context/ThreadFormContext";

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

export const useCreateThreadMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: ThreadFormValues) => {
            const { data } = await axios.post(`${API_URL}/threads`, {
                title: formData.title,
                response: formData.response,
                prompt_id: formData.prompt_id,
                workspace_id: formData.workspace_id,
                key: formData.key,
                user_external_id: formData.user_id
            })

            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["threads"]
            })
        },
    })
};

export const useUpdateThreadMutation = (threadId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: ThreadFormValues) => {
            const { data } = await axios.post(`${API_URL}/threads/${threadId}`, {
                title: formData.title,
                response: formData.response,
                prompt_id: formData.prompt_id,
                workspace_id: formData.workspace_id,
                key: formData.key,
                user_external_id: formData.user_id
            })

            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["threads"]
            })
        },
    })
};

export const useDeleteThreadMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (threadId: number) => {
            const { data } = await axios.delete(`${API_URL}/threads/${threadId}`)

            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["threads"]
            })
        }
    })
};
