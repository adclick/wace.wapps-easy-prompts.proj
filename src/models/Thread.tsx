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

    static clone (thread: Thread): Thread {
        const newThread = new Thread();

        newThread.id = thread.id;
        newThread.title = thread.title;
        newThread.created_at = thread.created_at;
        newThread.response = thread.response;
        newThread.prompt = Prompt.clone(thread.prompt);
        newThread.key = thread.key;

        return newThread;
    }
}