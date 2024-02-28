import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Thread } from '../models/Thread';

const API_URL = import.meta.env.VITE_API_URL;

export const useImageGenerationQuery = (thread: Thread) => {
    return useQuery({
        queryKey: ["imageGeneration", thread.key],
        queryFn: async () => {
            const modifiersIds = thread.threads_modifiers.map(m => m.modifier.id);
            const templatesIds = thread.threads_templates.map(t => t.template.id);

            const { data } = await axios.post(`${API_URL}/ai/image-generation?` + new URLSearchParams({
                text: thread.content,
                provider_id: thread.provider.id.toString(),
                modifiers_ids: JSON.stringify(modifiersIds),
                templates_ids: JSON.stringify(templatesIds),
                num_images: Thread.getParameterValue(thread, 'num_images', '1'),
                image_resolution: Thread.getParameterValue(thread, 'image_resolution', '1024x1024'),
            }));

            return data;
        },
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        enabled: thread.response === ""
    });
};