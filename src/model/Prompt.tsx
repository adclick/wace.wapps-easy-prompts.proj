import { User } from "./User";
import { UserPromptOptions } from "./UserPromptOptions";

export class Prompt {
    text: string;
    options: UserPromptOptions;
    creator: User;

    constructor(text = "", options = new UserPromptOptions(), user = new User()) {
        this.text = text;
        this.options = options;
        this.creator = user;
    }
}