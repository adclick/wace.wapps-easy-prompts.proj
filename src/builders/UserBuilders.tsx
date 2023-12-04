import { useAuth0 } from "@auth0/auth0-react";
import { User } from "../model/User";

export class UserBuilder {
    static build(): User {
        const newUser = new User();


        return newUser;
    }
}