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
    users: {id: number, email: string, username: string}
    languages: {id: number, name: string, slug: string}
    repositories: {id: number, name: string, slug: string}
    technologies: {id: number, name: string, slug: string}
    
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
        this.languages = {id: 0, name: "", slug: ""}
        this.users = {id: 0, email: "", username: ""}
        this.repositories = {id: 0, name: "", slug: ""}
        this.technologies = {id: 0, name: "", slug: ""}
    }
}