import { IconMessage, IconPhoto } from "@tabler/icons-react";

export class Technology {
    id: number;
    name: string;
    slug: string;
    default: boolean;

    constructor(name = "", slug = "") {
        this.id = 0;
        this.name = name;
        this.slug = slug;
        this.default = false;
    }

    static clone(technology: Technology): Technology {
        const newTechnology = new Technology();

        newTechnology.id = technology.id;
        newTechnology.name = technology.name;
        newTechnology.slug = technology.slug;
        newTechnology.default = technology.default;

        return newTechnology;
    }

    static getIcon(technology: Technology, size: number = 14) {
        switch (technology.slug) {
            case 'image-generation':
                return <IconPhoto size={size} />
            default:
                return <IconMessage size={size} />
        }
    }
}