export class SelectedFilters {
    isEmpty: boolean;
    search_term: string;
    languages_ids: number[];
    repositories_ids: number[];
    technologies_ids: number[];

    constructor() {
        this.isEmpty = true;
        this.search_term = "";
        this.languages_ids = [];
        this.repositories_ids = [];
        this.technologies_ids = [];
    }

    static buildFromQuery(data: any) {
        const newFilters = new SelectedFilters();

        newFilters.search_term = data.searchTerm;
        newFilters.languages_ids = data.languages.map((l: {id: number}) => l.id);
        newFilters.repositories_ids = data.repositories.map((r: {id: number}) => r.id);
        newFilters.technologies_ids = data.technologies.map((t: {id: number}) => t.id);
        newFilters.isEmpty = false;

        return newFilters;
    }
}