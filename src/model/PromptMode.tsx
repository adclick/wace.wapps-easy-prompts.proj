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