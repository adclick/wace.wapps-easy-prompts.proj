export class Craft {
    id: number;
    name: string;
    slug: string;
    content: string;
    description: string;
    stars: number;
    plays: number;
    created_at: Date;
    type: string;
    metadata: string;
    user: {id: number, email: string, username: string}
    language: {id: number, name: string, slug: string}
    repository: {id: number, name: string, slug: string}
    technology: {id: number, name: string, slug: string}
    
    constructor() {
        this.id = 0;
        this.name = "";
        this.slug = "";
        this.content = "";
        this.description = "";
        this.stars = 0;
        this.plays = 0;
        this.created_at = new Date();
        this.type = "";
        this.metadata = "";
        this.user = {id: 0, email: "", username: ""}
        this.language = {id: 0, name: "", slug: ""}
        this.repository = {id: 0, name: "", slug: ""}
        this.technology = {id: 0, name: "", slug: ""}
    }
}