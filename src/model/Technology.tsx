import { IconLanguage, IconListSearch, IconPencil, IconPhoto } from "@tabler/icons-react";
import { Modifier } from "./Modifier";
import { Provider } from "./Provider";
import { rem } from '@mantine/core';

export class Technology {
    name: string;
    slug: string;
    default: boolean;
    providers: Provider[];
    modifiers: Modifier[];

    constructor(name = "", slug = "") {
        this.name = name;
        this.slug = slug;
        this.default = false;
        this.providers = [];
        this.modifiers = [];
    }

    static buildEmpty() {
        return new Technology()
    }

    static getIcon(slug: string, size: number) {
        switch (slug) {
            case 'text-generation':
                return <IconPencil style={{ width: rem(size), height: rem(size) }} />
            case 'image-generation':
                return <IconPhoto style={{ width: rem(size), height: rem(size) }} />
            case 'keywords-extraction':
                return <IconListSearch style={{ width: rem(size), height: rem(size) }} />
            case 'translation':
                return <IconLanguage style={{ width: rem(size), height: rem(size) }} />
        }
    }
}