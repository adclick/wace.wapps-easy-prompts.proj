import axios from 'axios';
import { useQuery } from "@tanstack/react-query";
import { PromptRequest } from "../model/PromptRequest";

const API_URL = import.meta.env.VITE_API_URL;
const ERROR_MESSAGE = "Something went wrong. Please try again later or contact support";

export const useTextGenerationQuery = (request: PromptRequest) => {
    return useQuery({
        queryKey: ["textGeneration", request.key],
        queryFn: async () => {
            const modifiersIds = request.metadata && "modifiers" in request.metadata ? request.metadata.modifiers.map(m => m.id) : [];
            const templatesIds = request.metadata && "templates" in request.metadata ? request.metadata.templates.map(t => t.id) : [];

            const { data } = await axios.post(`${API_URL}/ai/text-generation`, {
                text: request.content,
                provider_id: request.provider.id.toString(),
                modifiers_ids: JSON.stringify(modifiersIds),
                templates_ids: JSON.stringify(templatesIds)
            });

            return data;
        },
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });
};

export const useTextGenerationByPromptQuery = (request: PromptRequest) => {
    return useQuery({
        queryKey: ["textGeneration-playable", "prompt", request.key],
        queryFn: async () => {
            const { data } = await axios.post(`${API_URL}/ai/text-generation/prompt/${request.id}`);

            return data;
        },
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });
};

export const useTextGenerationByTemplateQuery = (request: PromptRequest) => {
    return useQuery({
        queryKey: ["textGeneration-playable", "template", request.key],
        queryFn: async () => {
            const { data } = await axios.post(`${API_URL}/ai/text-generation/template/${request.id}`, {
                text: request.content
            });

            return data;
        },
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });
};