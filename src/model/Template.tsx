import { User } from "./User";
import { UserPromptOptions } from "./UserPromptOptions";

export class Template {
    options: UserPromptOptions;
    creator: User;

    constructor(options = new UserPromptOptions(), user = new User()) {
        this.options = options;
        this.creator = user;
    }
}