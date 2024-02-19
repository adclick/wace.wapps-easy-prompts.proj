import { create } from "zustand";
import { Template } from "../models/Template";
import { Modifier } from "../models/Modifier";
import { User } from "../models/User";
import { SelectedFilters } from "../models/SelectedFilters";
import { SelectedDatabaseType, Type } from "../models/SelectedDatabaseType";
import { Thread } from "../models/Thread";
import { Workspace } from "../models/Workspace";

interface storeState {
    user: User,
    selectedPrivateFilters: SelectedFilters,
    selectedPrivateDatabaseType: SelectedDatabaseType,
    selectedModifiers: Modifier[],
    selectedTemplates: Template[],
    selectedWorkspace: Workspace,
    threads: Thread[],
    nextThread: Thread,
    setUser: (user: User) => void,
    setSelectedPrivateFilters: (selectedPrivateFilters: SelectedFilters) => void,
    setSelectedPrivateDatabaseType: (selectedPrivateDatabaseType: SelectedDatabaseType) => void,
    setSelectedModifiers: (selectedModifiers: Modifier[]) => void,
    setSelectedTemplates: (selectedTemplates: Template[]) => void,
    setSelectedWorkspace: (selectedWorkspace: Workspace) => void,
    setThreads: (threads: Thread[]) => void,
    setNextThread: (thread: Thread) => void,
}

export const useStore = create<storeState>()(set => ({
    user: new User(),
    selectedPrivateFilters: new SelectedFilters(),
    selectedPrivateDatabaseType: new SelectedDatabaseType(),
    selectedTemplates: [],
    selectedModifiers: [],
    selectedWorkspace: new Workspace(),
    threads: [],
    nextThread: new Thread(),
    setUser: user => set(() => ({user})),
    setSelectedPrivateFilters: selectedPrivateFilters => set(() => ({selectedPrivateFilters})),
    setSelectedPrivateDatabaseType: selectedPrivateDatabaseType => set(() => ({selectedPrivateDatabaseType})),
    setSelectedTemplates: selectedTemplates => set(() => ({selectedTemplates})),
    setSelectedModifiers: selectedModifiers => set(() => ({selectedModifiers})),
    setSelectedWorkspace: selectedWorkspace => set(() => ({selectedWorkspace})),
    setThreads: threads => set(() => ({threads})),
    setNextThread: nextThread => set(() => ({nextThread})),
}));
