import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Thread } from '../models/Thread';

const API_URL = import.meta.env.VITE_API_URL;

export const useImageGenerationQuery = (thread: Thread) => {
    console.log(thread);
    // Hack
    let num_images = '1';
    let image_resolution = '1024x1024';
    if (thread.prompt.parametersList) {
        num_images = thread.prompt.parametersList.num_images.value.toString();
        image_resolution = thread.prompt.parametersList.image_resolution.value.toString();
    }

    return useQuery({
        queryKey: ["imageGeneration", thread.key],
        queryFn: async () => {
            const modifiersIds = thread.prompt.metadata.modifiers.map(m => m.id);
            const templatesIds = thread.prompt.metadata.templates.map(t => t.id);

            const { data } = await axios.post(`${API_URL}/ai/image-generation?` + new URLSearchParams({
                text: thread.prompt.content,
                provider_id: thread.prompt.provider.id.toString(),
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
    });
};