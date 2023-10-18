export class UserPromptOptions {
    responseType: string;
    provider: string;
    
    constructor() {
        this.responseType = "";
        this.provider = "";
    }

    setResponseType(responseType: string) {
        this.responseType = responseType;
    }

    setProvider(provider: string) {
        this.provider = provider;
    }

    toJson() {
        return {
            responseType: this.responseType,
            provider: this.provider
        }
    }
}