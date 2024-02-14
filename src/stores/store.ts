import { create } from "zustand";
import { PromptRequest } from "../models/PromptRequest";
import { Template } from "../models/Template";
import { Modifier } from "../models/Modifier";
import { User } from "../models/User";
import { SelectedFilters } from "../models/SelectedFilters";
import { SelectedDatabaseType, Type } from "../models/SelectedDatabaseType";

interface storeState {
    user: User,
    selectedPrivateFilters: SelectedFilters,
    selectedPrivateDatabaseType: SelectedDatabaseType,
    selectedModifiers: Modifier[],
    selectedTemplates: Template[],
    promptsRequests: PromptRequest[],
    userPromptRequest: PromptRequest,
    setUser: (user: User) => void,
    setSelectedPrivateFilters: (selectedPrivateFilters: SelectedFilters) => void,
    setSelectedPrivateDatabaseType: (selectedPrivateDatabaseType: SelectedDatabaseType) => void,
    setSelectedModifiers: (selectedModifiers: Modifier[]) => void,
    setSelectedTemplates: (selectedTemplates: Template[]) => void,
    setPromptsRequests: (promptsRequests: PromptRequest[]) => void,
    setUserPromptRequest: (userPromptRequest: PromptRequest) => void,
}

export const useStore = create<storeState>()(set => ({
    user: new User(),
    selectedPrivateFilters: new SelectedFilters(),
    selectedPrivateDatabaseType: new SelectedDatabaseType(),
    selectedTemplates: [],
    selectedModifiers: [],
    promptsRequests: [],
    userPromptRequest: new PromptRequest(),
    setUser: user => set(() => ({user})),
    setSelectedPrivateFilters: selectedPrivateFilters => set(() => ({selectedPrivateFilters})),
    setSelectedPrivateDatabaseType: selectedPrivateDatabaseType => set(() => ({selectedPrivateDatabaseType})),
    setSelectedTemplates: selectedTemplates => set(() => ({selectedTemplates})),
    setSelectedModifiers: selectedModifiers => set(() => ({selectedModifiers})),
    setPromptsRequests: promptsRequests => set(() => ({promptsRequests})),
    setUserPromptRequest: userPromptRequest => set(() => ({userPromptRequest})),
}));
