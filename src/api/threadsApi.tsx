import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../models/User";
import { ThreadFormValues } from "../context/ThreadFormContext";
import { Workspace } from "../models/Workspace";
import { Thread } from "../models/Thread";

const API_URL = import.meta.env.VITE_API_URL;

export const useThreadsQuery = (user: User, workspace: Workspace) => {
    return useQuery({
        queryKey: ["threads", user.id, workspace.uuid],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/threads/?` + new URLSearchParams({
                user_external_id: user.external_id.toString(),
                workspace_id: workspace.uuid,
            }));

            return data;
        },
        enabled: user.isLoggedIn && workspace.uuid !== ""
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
                templates_ids: JSON.stringify(formData.templates_ids),
                modifiers_ids: JSON.stringify(formData.modifiers_ids),
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

export const useUpdateThreadMutation = (thread: Thread) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: ThreadFormValues) => {
            const { data } = await axios.put(`${API_URL}/threads/${thread.uuid}`, {
                title: formData.title,
                key: formData.key,
                content: formData.content,
                response: formData.response,
                collapsed: formData.collapsed,
                user_external_id: formData.user_external_id,
                workspace_id: formData.workspace_id,
                technology_id: formData.technology_id,
                provider_id: formData.provider_id,
                templates_ids: JSON.stringify(formData.templates_ids),
                modifiers_ids: JSON.stringify(formData.modifiers_ids),
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
        mutationFn: async (threadId: string) => {
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
        mutationFn: async (workspaceUUID: string) => {
            const { data } = await axios.delete(`${API_URL}/threads/`, {
                data: {
                    workspace_id: workspaceUUID,
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
