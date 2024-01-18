import { Technology } from "./Technology";

export enum PromptMode {
    Text = "Text",
    Image = "Image",
    Audio = "Audio",
    Video = "Video"
}

export const promptMode: PromptMode = PromptMode.Text;

export const getAllPromptModes: PromptMode[] = [
    PromptMode.Text,
    PromptMode.Image,
    PromptMode.Audio,
    PromptMode.Video
];

export const isPromptModeEnabled = (promptMode: PromptMode): boolean => {
    switch(promptMode) {
        case PromptMode.Text:
        case PromptMode.Image:
            return true;
        default:
            return false;
    }
}

export const getPromptModeByTechnology = (technology: Technology): PromptMode => {
    switch (technology.slug) {
        case 'image-generation':
            return PromptMode.Image;
        default:
            return PromptMode.Text;
    }
}

export const getPromptModeColor = (currentMode: PromptMode): string => {
    switch (currentMode) {
        case PromptMode.Image:
            return "teal";
        case PromptMode.Audio:
            return "yellow.7";
        case PromptMode.Video:
            return "red"
        default:
            return "blue";
    }
}