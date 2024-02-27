import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Thread } from '../models/Thread';

const API_URL = import.meta.env.VITE_API_URL;

export const useImageGenerationQuery = (thread: Thread) => {
    const tpNumImages = thread.threads_parameters.find(tp => tp.parameter.slug === 'num_images');
    const num_images = tpNumImages ? tpNumImages.value : '1';
    const tpResolution = thread.threads_parameters.find(tp => tp.parameter.slug === 'image_resolution');
    const image_resolution = tpResolution ? tpResolution.value : '1024x1024';

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
                num_images,
                image_resolution,
            }));

            return data;
        },
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        enabled: thread.response === ""
    });
};