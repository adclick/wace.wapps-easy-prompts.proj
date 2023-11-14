export interface Technology {
    name: string,
    slug: string,
    default: boolean,
    providers: Provider[],
    modifiers: Modifier[]
}

export interface Provider {
    name: string,
    slug: string,
    default: boolean,
    parameters: Parameter[]
}

export interface Modifier {
    name: string,
    slug: string
}

export interface Parameter {
    name: string,
    slug: string,
    content: any,
    value: any,
    setValue: any
}

const emptyTechnology: Technology = {
    name: "",
    slug: "",
    default: true,
    providers: [],
    modifiers: []
};

export class PromptOptions {
    technologies: Technology[];

    constructor() {
        this.technologies = [];
    }

    /**
     * Build a new object from the API response
     */
    static buildFromApi(promptOptions: PromptOptions) {
        const newObj = new PromptOptions();

        newObj.technologies = promptOptions.technologies;

        return newObj;
    }

    /**
     * Get the technologies for the respective select-box
    */
    getTechnologies(): Technology[] {
        return this.technologies;
    }

    /**
     * Get the providers for the respective select-box
     */
    getProviders(technologySlug: string): Provider[] {
        const technology = this.technologies.find(t => t.slug === technologySlug);

        if (technology === undefined) return [];

        return technology.providers;
    }

    /**
     * 
     * @param technologySlug 
     * @returns 
     */
    getModifiers(technologySlug: string): Modifier[] {
        const technology = this.technologies.find(t => t.slug === technologySlug);

        if (technology === undefined) return [];

        return technology.modifiers;
    }

    /**
     * 
     * @param technologySlug 
     * @param providerSlug 
     * @returns 
     */
    getParameters(technologySlug: string, providerSlug: string): Parameter[] {
        const technology = this.technologies.find(t => t.slug === technologySlug);

        if (technology === undefined) return [];

        const provider = technology.providers.find(p => p.slug === providerSlug);

        if (provider === undefined) return [];

        return provider.parameters;
    }

    /**
     * Get the default technology
     * 
     * @returns Technology|null
     */
    getDefaultTechnology(): Technology {
        if (this.technologies.length === 0) return emptyTechnology;

        const defaultTechnology = this.technologies.find(technology => technology.default === true);

        return defaultTechnology === undefined
            ? this.technologies[0]
            : defaultTechnology;
    }

    /**
     * Get the default provider for the respective select-box
     * 
     * @returns string
     */
    getDefaultProviderSlug(technologySlug: string): string {
        const technology = this.technologies.find(t => t.slug === technologySlug);

        if (technology === undefined) return "";

        const providers = technology.providers;
        const defaultProvider = providers.find(p => p.default === true);

        return defaultProvider === undefined
            ? providers[0].slug
            : defaultProvider.slug;
    }

    /**
     * 
     * @param slug 
     * @returns 
     */
    getTechnologyBySlug(slug: string) {
        const technology = this.technologies.find(t => t.slug === slug);

        return technology === undefined 
            ? emptyTechnology
            : technology;
    }

    /**
     * 
     * @param slug 
     * @returns 
     */
    getProviderBySlug(slug: string) {
        for (const technology of this.technologies) {
            const provider = technology.providers.find(p => p.slug === slug);

            if (provider !== undefined) {
                return provider;
            }
        }

        return null;
    }

    /**
     * Format a given object to the mantine select-box data prop
     * 
     * @param object 
     * @returns {label: string, value: string}
     */
    formatToKeyValue(object: { name: string, slug: string }) {
        return {
            label: object.name,
            value: object.slug
        };
    }
}