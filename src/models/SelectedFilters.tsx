export class SelectedFilters {
    isEmpty: boolean;
    search_term: string;
    languages_ids: string[];
    repositories_ids: string[];
    technologies_ids: string[];

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
        newFilters.languages_ids = data.languages.map((l: {uuid: string}) => l.uuid);
        newFilters.repositories_ids = data.repositories.map((r: {uuid: string}) => r.uuid);
        newFilters.technologies_ids = data.technologies.map((t: {uuid: string}) => t.uuid);
        newFilters.isEmpty = false;

        return newFilters;
    }
}