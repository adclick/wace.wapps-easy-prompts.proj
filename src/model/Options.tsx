export class Options {
    isEmpty: boolean;
    prompt: string;
    technology: {id: number, name: string, slug: string};
    provider: {id: number, name: string, slug: string};

    constructor() {
        this.isEmpty = true;
        this.prompt = "";
        this.technology = {id: 0, name: "", slug: ""};
        this.provider = {id: 0, name: "", slug: ""};
    }

    static buildFromQuery(data: any): Options {
        const newOptions = new Options();

        newOptions.prompt = data.prompt;
        newOptions.technology = data.technology;
        newOptions.provider = data.provider;
        newOptions.isEmpty = false;
        
        return newOptions;
    }
}