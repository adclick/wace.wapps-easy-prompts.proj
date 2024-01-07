export enum Type {
    PROMPT,
    TEMPLATE,
    MODIFIER
};

export class SelectedFilters {
    isEmpty: boolean;
    type: Type;
    searchTerm: string;
    languages_ids: number[];
    repositories_ids: number[];
    technologies_ids: number[];
    crafts_types: string[];

    constructor() {
        this.isEmpty = true;
        this.type = Type.PROMPT;
        this.searchTerm = "";
        this.languages_ids = [];
        this.repositories_ids = [];
        this.technologies_ids = [];
        this.crafts_types = [];
    }

    static buildFromQuery(data: any) {
        const newFilters = new SelectedFilters();

        newFilters.type = Type.PROMPT;
        newFilters.searchTerm = data.searchTerm;
        newFilters.languages_ids = data.languages.map((l: {id: number}) => l.id);
        newFilters.repositories_ids = data.repositories.map((r: {id: number}) => r.id);
        newFilters.technologies_ids = data.technologies.map((t: {id: number}) => t.id);
        newFilters.isEmpty = false;

        return newFilters;
    }
}