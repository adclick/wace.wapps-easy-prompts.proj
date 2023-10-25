export interface Technology {
    name: string,
    slug: string,
    default: boolean,
    providers: Provider[],
    promptModifiers: PromptModifier[]
}

export interface Provider {
    name: string,
    slug: string,
    default: boolean
}

export interface ResponseImageSize {
    name: string,
    slug: string
}

export interface PromptModifier {
    name: string,
    slug: string,
    content: string
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
    getTechnologiesForSelectBox(): {label: string, value: string}[] {
        return this.technologies.map(technologiy => this.formatForSelectBox(technologiy));
    }

    /**
     * Get the providers for the respective select-box
     * 
     * @returns {label: string, value: string}[]
     */
    getProvidersForSelectBox(): {label: string, value: string}[] {
        const providers: Provider[] = [];

        for (const technology of this.technologies) {
            const tProviders = technology.providers;
            
            for (const tp of tProviders) {
                if (providers.find(p => p.slug === tp.slug)) {
                    continue;
                }

                providers.push(tp);
            }
        }

        return providers.map(provider => this.formatForSelectBox(provider));
    }

    /**
     * 
     * @returns {label: string, value: string}[]
     */
    getPromtModifiersForSelectBox(): {label: string, value: string}[] {
        const promptModifiers: PromptModifier[] = [];

        for (const technology of this.technologies) {
            const tPromptModifiers = technology.promptModifiers;

            for (const tpm of tPromptModifiers) {
                if (promptModifiers.find(pm => pm.slug === tpm.slug)) {
                    continue;
                }

                promptModifiers.push(tpm);
            }
            promptModifiers.push(...technology.promptModifiers);
        }

        return promptModifiers.map(modifier => this.formatForSelectBox(modifier));
    }

    /**
     * Get the default technology
     * 
     * @returns Technology|null
     */
    getDefaultTechnology(): Technology|null {
        if (this.technologies.length === 0) return null;

        const defaultTechnology = this.technologies.find(technology => technology.default === true);

        return defaultTechnology === undefined
            ? this.technologies[0]
            : defaultTechnology;
    }

    /**
     * Get the default technology for the respective select-box
     * 
     * @returns string 
     */
    getDefaultTechnologyForSelectBox(): string {
        const defaultTechnology: Technology|null = this.getDefaultTechnology();

        if (defaultTechnology === null) return "";

        return defaultTechnology.slug;
    }

    /**
     * Get the default provider for the respective select-box
     * 
     * @returns string
     */
    getDefaultProviderForSelectBox() {
        const defaultTechnology: Technology|null = this.getDefaultTechnology();

        if (defaultTechnology === null) return "";

        const defaultProvider = defaultTechnology.providers.find(provider => provider.default === true);

        return defaultProvider === undefined
            ? defaultTechnology.providers[0].slug
            : defaultProvider.slug;
    }

    /**
     * Get the default provider for the respective select-box given a technology
     * @param technologySlug string
     * @returns string
     */
    getDefaultProviderForSelectBoxByTechnologySlug(technologySlug: string) : string {
        const technology = this.technologies.find(t => t.slug === technologySlug);

        if (technology === undefined) {
            return "";
        }

        const defaultProvider = technology.providers.find(provider => provider.default === true);

        return defaultProvider === undefined
            ? technology.providers[0].slug
            : defaultProvider.slug;
    }

    /**
     * Format a given object to the mantine select-box data prop
     * 
     * @param object 
     * @returns {label: string, value: string}
     */
    formatForSelectBox(object: { name: string, slug: string }) {
        return {
            label: object.name,
            value: object.slug
        };
    }

    getTechnologyBySlug(slug: string) {
        return this.technologies.find(t => t.slug === slug);
    }

    getProviderBySlug(slug: string) {
        for (const technology of this.technologies) {
            const provider = technology.providers.find(p => p.slug === slug);

            if (provider !== undefined) {
                return provider;
            }
        }

        return null;
    }
}