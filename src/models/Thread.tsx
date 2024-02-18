import { Prompt } from "./Prompt";

export class Thread {
    id: number;
    title: string;
    created_at: Date;
    response: string;
    prompt: Prompt;
    key: number;

    constructor(key: number = 0) {
        this.id = 0;
        this.title = "";
        this.created_at = new Date();
        this.response = "";
        this.prompt = new Prompt();
        this.key = key;
    }
}