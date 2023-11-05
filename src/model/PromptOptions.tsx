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
     * @returns {label: string, value: string}[]
    */
   getTechnologies(): {label: string, value: string}[] {
       return this.technologies.map(technologiy => this.formatToKeyValue(technologiy));
    }

    /**
     * Get the providers for the respective select-box
     * 
     * @returns {label: string, value: string}[]
     */
    getProviders(technologySlug: string): {label: string, value: string}[] {
        const technology = this.technologies.find(t => t.slug === technologySlug);

        if (technology === undefined) return [];

        const providers = technology.providers;

        return providers.map(p => this.formatToKeyValue(p));
    }

    /**
     * 
     * @param technologySlug 
     * @returns 
     */
    getModifiers(technologySlug: string): {label: string, value: string}[] {
        const technology = this.technologies.find(t => t.slug === technologySlug);

        if (technology === undefined) return [];

        const modifiers = technology.modifiers;

        return modifiers.map(m => this.formatToKeyValue(m));
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
    getDefaultTechnologySlug(): string {
        if (this.technologies.length === 0) return "";

        const defaultTechnology = this.technologies.find(technology => technology.default === true);

        return defaultTechnology === undefined
            ? this.technologies[0].slug
            : defaultTechnology.slug;
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
        return this.technologies.find(t => t.slug === slug);
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