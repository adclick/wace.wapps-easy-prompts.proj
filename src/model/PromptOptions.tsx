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

    static buildFromApi(promptOptions: PromptOptions) {
        const newObj = new PromptOptions();

        newObj.responseTypes = promptOptions.responseTypes;
        newObj.providers = promptOptions.providers;
        newObj.responseImageSizes = promptOptions.responseImageSizes;
        newObj.promptModifiers = promptOptions.promptModifiers;

        return newObj;
    }

    getResponseTypesForSelectBox() {
        return this.responseTypes.map(responseType => this.formatForSelectBox(responseType));
    }

    getProvidersForSelectBox() {
        return this.providers.map(provider => this.formatForSelectBox(provider));
    }

    getDefaultResponseType(): ResponseType|null {
        if (this.responseTypes.length === 0) return null;

        const defaultResponseType = this.responseTypes.find(responseType => responseType.default === true);

        return defaultResponseType === undefined
            ? this.responseTypes[0]
            : defaultResponseType
    }

    getDefaultResponseTypeForSelectBox() {
        const defaultResponseType: ResponseType|null = this.getDefaultResponseType();

        if (defaultResponseType === null) return "";

        return defaultResponseType.slug;
    }

    getDefaultProviderForSelectBox() {
        const defaultResponseType: ResponseType|null = this.getDefaultResponseType();

        if (defaultResponseType === null) return "";

        return defaultResponseType.defaultProvider;
    }

    formatForSelectBox(object: { name: string, slug: string }) {
        return {
            label: object.name,
            value: object.slug
        };
    }
}