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
                user_external_id: user.external_id.toString(),
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
                key: formData.key,
                content: formData.content,
                response: formData.response,
                user_external_id: formData.user_external_id,
                workspace_id: formData.workspace_id,
                technology_id: formData.technology_id,
                provider_id: formData.provider_id,
                templates_ids: JSON.stringify(formData.templates_ids.map(id => Number(id))),
                modifiers_ids: JSON.stringify(formData.modifiers_ids.map(id => Number(id))),
                chat_messages: JSON.stringify(formData.chat_messages),
                thread_parameters: JSON.stringify(formData.thread_parameters),
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
            const { data } = await axios.put(`${API_URL}/threads/${threadId}`, {
                title: formData.title,
                key: formData.key,
                content: formData.content,
                response: formData.response,
                user_external_id: formData.user_external_id,
                workspace_id: formData.workspace_id,
                technology_id: formData.technology_id,
                provider_id: formData.provider_id,
                templates_ids: JSON.stringify(formData.templates_ids.map(id => Number(id))),
                modifiers_ids: JSON.stringify(formData.modifiers_ids.map(id => Number(id))),
                chat_messages: JSON.stringify(formData.chat_messages),
                thread_parameters: JSON.stringify(formData.thread_parameters),
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

export const useDeleteThreadMutation = (user: User) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (threadId: number) => {
            const { data } = await axios.delete(`${API_URL}/threads/${threadId}`, {
                data: {
                    user_external_id: user.external_id
                }
            })

            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["threads"]
            })
        }
    })
};

export const useDeleteThreadsMutation = (user: User) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (workspaceId: number) => {
            const { data } = await axios.delete(`${API_URL}/threads/`, {
                data: {
                    workspace_id: workspaceId.toString(),
                    user_external_id: user.external_id
                }
            })

            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["threads"]
            })
        }
    })
};
