import axios, { AxiosError } from 'axios';
import { useQuery } from "@tanstack/react-query";
import { Thread } from '../models/Thread';

const API_URL = import.meta.env.VITE_API_URL;

export const useTextGenerationQuery = (thread: Thread) => {
    return useQuery({
        queryKey: ["textGeneration", thread.key],
        queryFn: async () => {
            const modifiersIds = thread.metadata && "modifiers" in thread.metadata ? thread.metadata.modifiers.map(m => m.id) : [];
            const templatesIds = thread.metadata && "templates" in thread.metadata ? thread.metadata.templates.map(t => t.id) : [];

                const { data } = await axios.post(`${API_URL}/ai/text-generation`, {
                    text: thread.content,
                    provider_id: thread.provider.id.toString(),
                    modifiers_ids: JSON.stringify(modifiersIds),
                    templates_ids: JSON.stringify(templatesIds)
                });

                return data;
        },
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        enabled: thread.response === ""
    });
};