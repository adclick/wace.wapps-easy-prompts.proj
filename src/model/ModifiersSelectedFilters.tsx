export class ModifiersSelectedFilters {
    isEmpty: boolean;
    search_term: string;
    languages_ids: number[];
    repositories_ids: number[];

    constructor() {
        this.isEmpty = true;
        this.search_term = "";
        this.languages_ids = [];
        this.repositories_ids = [];
    }

    static buildFromQuery(data: any) {
        const newFilters = new ModifiersSelectedFilters();

        newFilters.search_term = data.searchTerm;
        newFilters.languages_ids = data.languages.map((l: {id: number}) => l.id);
        newFilters.repositories_ids = data.repositories.map((r: {id: number}) => r.id);
        newFilters.isEmpty = false;

        return newFilters;
    }
}