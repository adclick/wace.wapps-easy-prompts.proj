import { Modifier } from "./Modifier";
import { Parameter } from "./Parameter";
import { Provider } from "./Provider";
import { Technology } from "./Technology";

export class Suggestion {
    name: string
    score: number;
    technology: Technology;
    provider: Provider;
    parameters: Parameter[];
    modifiers: Modifier[];

    constructor(prompt = "") {
        this.name = prompt;
        this.score = 50; 
        this.technology = new Technology();
        this.provider = new Provider();
        this.parameters = [];
        this.modifiers = [];
    }

    static buildFromApi(usedPrompts: any): Suggestion[] {
        const objs: Suggestion[] = [];

        for (const up of usedPrompts) {
            const obj = new Suggestion();

            obj.name = up.name;
            obj.score = up.score;

            objs.push(obj);
        }

        return objs;
    }
}