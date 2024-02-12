import { create } from "zustand";
import { PromptRequest } from "../models/PromptRequest";
import { Template } from "../models/Template";
import { Modifier } from "../models/Modifier";
import { User } from "../models/User";

interface storeState {
    user: User,
    selectedModifiers: Modifier[],
    selectedTemplates: Template[],
    promptsRequests: PromptRequest[],
    userPromptRequest: PromptRequest,
    setUser: (user: User) => void,
    setSelectedModifiers: (selectedModifiers: Modifier[]) => void,
    setSelectedTemplates: (selectedTemplates: Template[]) => void,
    setPromptsRequests: (promptsRequests: PromptRequest[]) => void,
    setUserPromptRequest: (userPromptRequest: PromptRequest) => void,
}

export const useStore = create<storeState>()(set => ({
    user: new User(),
    selectedTemplates: [],
    selectedModifiers: [],
    promptsRequests: [],
    userPromptRequest: new PromptRequest(),
    setUser: user => set(state => ({user})),
    setSelectedTemplates: selectedTemplates => set(state => ({selectedTemplates})),
    setSelectedModifiers: selectedModifiers => set(state => ({selectedModifiers})),
    setPromptsRequests: promptsRequests => set(state => ({promptsRequests})),
    setUserPromptRequest: userPromptRequest => set(state => ({userPromptRequest})),
}));
