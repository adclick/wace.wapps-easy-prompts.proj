import { create } from "zustand";
import { PromptRequest } from "../models/PromptRequest";
import { Template } from "../models/Template";
import { Modifier } from "../models/Modifier";

interface ThreadsState {
    requests: PromptRequest[],
    add: (promptRequest: PromptRequest) => void,
}

const useThreadsStore = create<ThreadsState>()(set => ({
    requests: [],
    add: promptRequest => set((state) => ({
        requests: [
            ...state.requests,
            promptRequest
        ]
    }))
}));