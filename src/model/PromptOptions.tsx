import { Modifier } from "./Modifier";
import { Parameter } from "./Parameter";
import { Provider } from "./Provider";
import { Technology } from "./Technology";

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
        if (this.technologies.length === 0) return new Technology();

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
    getDefaultProvider(technologySlug: string): Provider {
        const technology = this.technologies.find(t => t.slug === technologySlug);

        if (technology === undefined) return new Provider();

        const providers = technology.providers;
        const defaultProvider = providers.find(p => p.default === true);

        return defaultProvider === undefined
            ? providers[0]
            : defaultProvider;
    }

    /**
     * 
     * @param slug 
     * @returns 
     */
    getTechnologyBySlug(slug: string): Technology {
        const technology = this.technologies.find(t => t.slug === slug);

        return technology === undefined 
            ? new Technology()
            : technology;
    }

    /**
     * 
     * @param slug 
     * @returns 
     */
    getProviderBySlug(slug: string): Provider {
        for (const technology of this.technologies) {
            const provider = technology.providers.find(p => p.slug === slug);

            if (provider !== undefined) {
                return provider;
            }
        }

        return new Provider();
    }

    /**
     * 
     * @param slug 
     * @returns 
     */
    getModifierBySlug(slug: string): Modifier {
        for (const technology of this.technologies) {
            const modifier = technology.modifiers.find(m => m.slug === slug);

            if (modifier !== undefined) {
                return modifier;
            }
        }

        return new Modifier();
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