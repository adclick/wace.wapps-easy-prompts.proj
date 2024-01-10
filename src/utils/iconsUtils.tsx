import { IconLanguage, IconListSearch, IconMessages, IconPhoto } from "@tabler/icons-react"
import { IconMessage } from "@tabler/icons-react"

const getTechnologyIcon = (slug: string, size: number | string, stroke: number = 1.5) => {
    switch (slug) {
        case 'text-generation':
            return <IconMessage size={size} stroke={stroke} />
        case 'chat':
            return <IconMessages size={size} stroke={stroke} />
        case 'image-generation':
            return <IconPhoto size={size} stroke={stroke} />
        case 'keywords-extraction':
            return <IconListSearch size={size} stroke={stroke} />
        case 'translation':
            return <IconLanguage size={size} stroke={stroke} />
        default:
            return <></>
    }
}

export default {
    getTechnologyIcon
}