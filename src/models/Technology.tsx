import { IconLetterT, IconMessage, IconMessages, IconPhoto, IconTextSize } from "@tabler/icons-react";

export class Technology {
    id: number;
    uuid: string;
    name: string;
    slug: string;
    default: boolean;

    constructor(name = "", slug = "") {
        this.id = 0;
        this.uuid = "";
        this.name = name;
        this.slug = slug;
        this.default = false;
    }

    static clone(technology: Technology): Technology {
        const newTechnology = new Technology();

        newTechnology.id = technology.id;
        newTechnology.uuid = technology.uuid;
        newTechnology.name = technology.name;
        newTechnology.slug = technology.slug;
        newTechnology.default = technology.default;

        return newTechnology;
    }

    static getIcon(technology: Technology, size: number = 14, color?: string) {
        switch (technology.slug) {
            case 'image-generation':
                return <IconPhoto size={size} color={color} />
            case 'text-generation':
                return <IconTextSize size={size} color={color} />
            default:
                return <IconMessages size={size} color={color} />
        }
    }
}