import { Modifier } from "./Modifier";
import { RepositoryItem } from "./RepositoryItem";
import { UserPromptOptions } from "./UserPromptOptions";

export class Request {
    text: string;
    intro: boolean
    userPromptOptions: UserPromptOptions
    timestamp: number;
    repositoryItems: RepositoryItem[];

    constructor() {
        this.text = "";
        this.intro = false;
        this.userPromptOptions = new UserPromptOptions();
        this.timestamp = Date.now();
        this.repositoryItems = [];
    }

    setText(text: string) {
        this.text = text;
    }

    setUserPromptOptions(userPromptOptions: UserPromptOptions) {
        this.userPromptOptions = userPromptOptions;
    }
}