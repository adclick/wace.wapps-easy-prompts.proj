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
            const templateId = request.metadata && "template" in request.metadata ? request.metadata.template : "";
            console.log(templateId);

            const { data } = await axios.get(`${API_URL}/ai/text-generation?` + new URLSearchParams({
                text: request.content,
                provider_id: request.provider.id.toString(),
                providers_ids: "[]",
                modifiers_ids: JSON.stringify(modifiersIds),
                template_id: JSON.stringify(templateId)
            }));

            return data;
        },
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });
};

export const useTextGenerationPlayableQuery = (request: PromptRequest) => {
    return useQuery({
        queryKey: ["textGeneration-playable", request.key],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/ai/text-generation/${request.id}`);

            return data;
        },
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });
};