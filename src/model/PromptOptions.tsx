export interface ResponseType {
    name: string,
    slug: string,
    default: boolean,
    defaultProvider: string
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
    responseTypes: ResponseType[];
    providers: Provider[];
    responseImageSizes: ResponseImageSize[];
    promptModifiers: PromptModifier[];

    constructor() {
        this.responseTypes = [];
        this.providers = [];
        this.responseImageSizes = [];
        this.promptModifiers = [];
    }

    /**
     * Build a new object from the API response
     */
    static buildFromApi(promptOptions: PromptOptions) {
        const newObj = new PromptOptions();

        newObj.responseTypes = promptOptions.responseTypes;
        newObj.providers = promptOptions.providers;
        newObj.responseImageSizes = promptOptions.responseImageSizes;
        newObj.promptModifiers = promptOptions.promptModifiers;

        return newObj;
    }

    /**
     * Get the response-types for the respective select-box
     * @returns {label: string, value: string}[]
     */
    getResponseTypesForSelectBox(): {label: string, value: string}[] {
        return this.responseTypes.map(responseType => this.formatForSelectBox(responseType));
    }

    /**
     * Get the providers for the respective select-box
     * 
     * @returns {label: string, value: string}[]
     */
    getProvidersForSelectBox(): {label: string, value: string}[] {
        return this.providers.map(provider => this.formatForSelectBox(provider));
    }

    /**
     * Get the default response type
     * 
     * @returns ResponseType|null
     */
    getDefaultResponseType(): ResponseType|null {
        if (this.responseTypes.length === 0) return null;

        const defaultResponseType = this.responseTypes.find(responseType => responseType.default === true);

        return defaultResponseType === undefined
            ? this.responseTypes[0]
            : defaultResponseType
    }

    /**
     * Get the default response-tive for the respective select-box
     * 
     * @returns string 
     */
    getDefaultResponseTypeForSelectBox(): string {
        const defaultResponseType: ResponseType|null = this.getDefaultResponseType();

        if (defaultResponseType === null) return "";

        return defaultResponseType.slug;
    }

    /**
     * Get the default provider for the respective select-box
     * 
     * @returns string
     */
    getDefaultProviderForSelectBox() {
        const defaultResponseType: ResponseType|null = this.getDefaultResponseType();

        if (defaultResponseType === null) return "";

        return defaultResponseType.defaultProvider;
    }

    /**
     * Get the default provider for the respective select-box given a response-type
     * @param responseTypeSlug string
     * @returns string
     */
    getDefaultProviderForSelectBoxByResponseTypeSlug(responseTypeSlug: string) : string {
        const responseType = this.responseTypes.find(rt => rt.slug === responseTypeSlug);

        if (responseType === undefined) {
            return "";
        }

        return responseType.defaultProvider;
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
}