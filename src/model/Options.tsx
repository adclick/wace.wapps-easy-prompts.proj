export class Options {
    technologies: {id: number, name: string}[];
    providers: {id: number, name: string}[];
    parameters: {id: number, name: string, value: string}[];
    modifiers: number[];

    technology: {id: number, name: string} | undefined;

    constructor() {
        this.technologies = [];
        this.providers = [];
        this.parameters = [];
        this.modifiers = [];
    }

    static buildFromApi(apiData: any): Options {
        const newOptions = new Options();

        for (const technology of apiData.technologies) {
            newOptions.technologies.push({
                id: technology.id,
                name: technology.name,
            });
        }
        
        return newOptions;
    }
}