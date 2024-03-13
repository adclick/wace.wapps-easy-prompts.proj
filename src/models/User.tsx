import { Language } from "./Language";
import { Prompt } from "./Prompt";
import { Repository } from "./Repository";
import { Workspace } from "./Workspace";

export class User {
    isEmpty: boolean;
    isLoggedIn: boolean;
    id: string;
    uuid: string;
    username: string;
    email: string;
    picture: string;
    theme: string;
    external_id: string;
    history_repository_id: number;
    language: Language;
    repositories: Repository[]
    workspaces: Workspace[];

    constructor() {
        this.isEmpty = true;
        this.isLoggedIn = false;
        this.id = "";
        this.uuid = "";
        this.username = "";
        this.email = "";
        this.picture = "";
        this.theme = "";
        this.external_id = "";
        this.history_repository_id = 0;
        this.language = new Language();
        this.repositories = [];
        this.workspaces = [];
    }

    static buildFromAuth0(auth0User: any) {
        if (auth0User === undefined) return new User();
        
        const user = new User();

        if ("sub" in auth0User) {
            user.id = auth0User.sub;
            user.external_id = auth0User.sub;
        }

        if ("nickname" in auth0User) {
            user.username = auth0User.nickname;
        }

        if ("email" in auth0User) {
            user.email = auth0User.email;
        }

        if ("picture" in auth0User) {
            user.picture = auth0User.picture;
        }

        user.isEmpty = false;

        return user;
    }

    static hasPrompt(user: User, prompt: Prompt): boolean {
        return user.id === prompt.user.id || user.id === prompt.user.external_id;
    }
}