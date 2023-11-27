export class Filters {
    types: string[];
    technology: string;
    provider: string;

    constructor() {
        this.types = ["prompts", "templates"];
        this.technology = "";
        this.provider = "";
    }
}