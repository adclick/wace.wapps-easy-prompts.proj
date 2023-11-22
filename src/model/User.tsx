export class User {
    id: string;

    constructor(id: string = "") {
        this.id = id;
    }

    static buildFromAuth0(auth0User: any) {
        const user = new User();

        if ("sub" in auth0User) {
            user.id = auth0User.sub;
        }

        return user;
    }
}