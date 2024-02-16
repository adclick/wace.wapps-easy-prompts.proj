import axios from 'axios';
import { PromptRequest } from '../models/PromptRequest';
import { useQuery } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL;

export const useImageGenerationQuery = (request: PromptRequest) => {
    const { num_images, image_resolution } = request.parametersList;

    return useQuery({
        queryKey: ["imageGeneration", request.key],
        queryFn: async () => {
            const modifiersIds = request.metadata.modifiers.map(m => m.id);
            const templatesIds = request.metadata.templates.map(t => t.id);

            const { data } = await axios.post(`${API_URL}/ai/image-generation?` + new URLSearchParams({
                text: request.content,
                provider_id: request.provider.id.toString(),
                modifiers_ids: JSON.stringify(modifiersIds),
                templates_ids: JSON.stringify(templatesIds),
                num_images: num_images ? num_images.value : '1',
                image_resolution: image_resolution ? image_resolution.value : '1024x1024'
            }));

            return data;
        },
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });
};

export const useImageGenerationByPromptIdQuery = (request: PromptRequest) => {
    return useQuery({
        queryKey: ["imageGeneration-playable", "prompt", request.key],
        queryFn: async () => {
            const { data } = await axios.post(`${API_URL}/ai/image-generation/prompt/${request.id}`);

            return data;
        },
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });
};