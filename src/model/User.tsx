import { Language } from "./Language";

export class User {
    id: string;
    nickname: string;
    email: string;
    picture: string;
    theme: string;

    constructor() {
        this.id = "";
        this.nickname = "";
        this.email = "";
        this.picture = "";
        this.theme = "";
    }

    static buildFromAuth0(auth0User: any) {
        if (auth0User === undefined) return new User();
        
        const user = new User();

        if ("sub" in auth0User) {
            user.id = auth0User.sub;
        }

        if ("nickname" in auth0User) {
            user.nickname = auth0User.nickname;
        }

        if ("email" in auth0User) {
            user.email = auth0User.email;
        }

        if ("picture" in auth0User) {
            user.picture = auth0User.picture;
        }

        return user;
    }
}