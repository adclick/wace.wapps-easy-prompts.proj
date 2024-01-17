import { IconFilter, IconHeadphones, IconLanguage, IconLayoutSidebar, IconListSearch, IconPhoto, IconPlus, IconVideo } from "@tabler/icons-react"
import { IconMessage } from "@tabler/icons-react"
import { PromptMode } from "../model/PromptMode"

export const getTechnologyIcon = (slug: string, size: number | string, stroke: number = 1.5) => {
    switch (slug) {
        case 'text-generation':
        case 'chat':
            return <IconMessage size={size} stroke={stroke} />
        case 'image-generation':
            return <IconPhoto size={size} stroke={stroke} />
        case 'audio-generation':
            return <IconHeadphones size={size} stroke={stroke} />
        case 'video-generation':
            return <IconVideo size={size} stroke={stroke} />
        case 'keywords-extraction':
            return <IconListSearch size={size} stroke={stroke} />
        case 'translation':
            return <IconLanguage size={size} stroke={stroke} />
        default:
            return <></>
    }
}

export const getPromptModeIcon = (promptMode: PromptMode, size: number | string, stroke: number = 2) => {
    switch (promptMode) {
        case PromptMode.Text:
            return <IconMessage size={size} stroke={stroke} />
        case PromptMode.Image:
            return <IconPhoto size={size} stroke={stroke} />
        case PromptMode.Audio:
            return <IconHeadphones size={size} stroke={stroke} />
        case PromptMode.Video:
            return <IconVideo size={size} stroke={stroke} />
        default: 
            return <></>;
    }
}

export const iconSideBar = (size: number | string, stroke: number = 2) => {
    return <IconLayoutSidebar size={getSize(size)} stroke={stroke} />
}

export const iconFilter = (size: number | string, stroke: number = 2) => {
    return <IconFilter size={getSize(size)} stroke={stroke} />
}

export const iconAdd = (size: number | string, stroke: number = 2) => <IconPlus size={getSize(size)} stroke={stroke} />;


const getSize = (size: number | string): number => {
    if (typeof size === 'number') return size;

    switch (size) {
        case 'xs': return 18;
        case 'sm': return 20;
        case 'md': return 22;
        case 'lg': return 24;
        case 'xl': return 26;
        default: return 22;
    }
}