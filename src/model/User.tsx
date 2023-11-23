import { Language } from "./Language";

export class User {
    id: string;
    language: Language

    constructor(id: string = "") {
        this.id = id;
        this.language = new Language();
    }

    static buildFromAuth0(auth0User: any) {
        const user = new User();

        if ("sub" in auth0User) {
            user.id = auth0User.sub;
        }

        return user;
    }
}