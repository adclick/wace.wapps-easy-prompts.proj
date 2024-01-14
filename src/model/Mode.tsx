
export class Mode {
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

    static clone (mode: Mode): Mode {
        const newMode = new Mode();
        
        newMode.id = mode.id;
        newMode.name = mode.name;
        newMode.slug = mode.slug;
        newMode.default = mode.default;

        return newMode;
    }
}