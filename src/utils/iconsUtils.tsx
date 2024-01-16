import { IconHeadphones, IconLanguage, IconListSearch, IconPhoto, IconVideo } from "@tabler/icons-react"
import { IconMessage } from "@tabler/icons-react"
import { PromptMode } from "../model/PromptMode"

const getTechnologyIcon = (slug: string, size: number | string, stroke: number = 1.5) => {
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

const getPromptModeIcon = (promptMode: PromptMode, size: number | string, stroke: number = 1.5) => {
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

export default {
    getTechnologyIcon,
    getPromptModeIcon
}