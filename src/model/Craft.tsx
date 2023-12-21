export class Craft {
    id: number;
    name: string;
    slug: string;
    content: string;
    description: string;
    score: number;
    created_at: Date;
    users: {id: number, email: string}
    type: string
    languages: {id: number, name: string, slug: string}
    repositories: {id: number, name: string, slug: string}
    technologies: {id: number, name: string, slug: string}
    crafted_by: {crafting: {id: number, name: string, slug: string, description: string, content: string, score: 50, created_at: Date, type: string, users: {id: number, email: string}}}[]
    
    constructor() {
        this.id = 0;
        this.name = "";
        this.slug = "";
        this.content = "";
        this.description = "";
        this.score = 0;
        this.created_at = new Date();
        this.users = {id: 0, email: ""}
        this.type = "";
        this.languages = {id: 0, name: "", slug: ""}
        this.repositories = {id: 0, name: "", slug: ""}
        this.technologies = {id: 0, name: "", slug: ""}
        this.crafted_by =  [];
    }
}