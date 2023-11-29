import { Language } from "./Language";

export class User {
    id: string;
    email: string;
    language: Language

    constructor(id: string = "", email: string = "") {
        this.id = id;
        this.email = email;
        this.language = new Language();
    }

    static buildFromAuth0(auth0User: any) {
        if (auth0User === undefined) return new User();
        
        const user = new User();

        if ("sub" in auth0User) {
            user.id = auth0User.sub;
        }

        if ("email" in auth0User) {
            user.email = auth0User.email;
        }

        return user;
    }
}