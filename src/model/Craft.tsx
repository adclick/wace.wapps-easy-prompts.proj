import { CraftParameter } from "./CraftParameter";
import { Provider } from "./Provider";
import { Technology } from "./Technology";
import { User } from "./User";

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
    user: User
    language: {id: number, name: string, slug: string}
    repository: {id: number, name: string, slug: string}
    technology: Technology;
    provider: Provider;
    crafts_parameters: CraftParameter[];
    
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
        this.user = new User()
        this.language = {id: 0, name: "", slug: ""}
        this.repository = {id: 0, name: "", slug: ""}
        this.technology = new Technology();
        this.provider = new Provider();
        this.crafts_parameters = [];
    }
}