import { Modifier } from "./Modifier";
import { Parameter } from "./Parameter";
import { Provider } from "./Provider";
import { Technology } from "./Technology";

export class UsedPrompt {
    prompt: string
    score: number;
    technology: Technology;
    provider: Provider;
    parameters: Parameter[];
    modifiers: Modifier[];

    constructor(prompt = "") {
        this.prompt = prompt;
        this.score = 50; 
        this.technology = new Technology();
        this.provider = new Provider();
        this.parameters = [];
        this.modifiers = [];
    }
}