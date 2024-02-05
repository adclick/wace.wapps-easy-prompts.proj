import { IconAdjustmentsHorizontal, IconChevronDown, IconChevronUp, IconHeadphones, IconLanguage, IconLayoutSidebar, IconListSearch, IconPhoto, IconPlayerPlayFilled, IconPlus, IconStar, IconVideo, IconX } from "@tabler/icons-react"
import { IconMessage } from "@tabler/icons-react"

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

export const iconSideBar = (size: number | string, stroke: number = 2) => {
    return <IconLayoutSidebar size={getSize(size)} stroke={stroke} />
}

export const iconAdjustmentsHorizontal = (size: number | string, stroke: number = 2) => <IconAdjustmentsHorizontal size={getSize(size)} stroke={stroke} />;
export const iconAdd = (size: number | string, stroke: number = 2) => <IconPlus size={getSize(size)} stroke={stroke} />;
export const iconClose = (size: number | string, stroke: number = 2) => <IconX size={getSize(size)} stroke={stroke} />;
export const iconChevronUp = (size: number | string, stroke: number = 2) => <IconChevronUp size={getSize(size)} stroke={stroke} />;
export const iconChevronDown = (size: number | string, stroke: number = 2) => <IconChevronDown size={getSize(size)} stroke={stroke} />;
export const iconPlay = (size: number | string, stroke: number = 2) => <IconPlayerPlayFilled size={getSize(size)} stroke={stroke} />;
export const iconStar = (size: number | string, stroke: number = 2) => <IconStar size={getSize(size)} stroke={stroke} />;


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