import { UserPromptOptions } from "./UserPromptOptions";

export class Request {
    text: string;
    userPromptOptions: UserPromptOptions
    timestamp: number;

    constructor() {
        this.text = "";
        this.userPromptOptions = new UserPromptOptions();
        this.timestamp = Date.now();
    }

    setText(text: string) {
        this.text = text;
    }

    setUserPromptOptions(userPromptOptions: UserPromptOptions) {
        this.userPromptOptions = userPromptOptions;
    }
}