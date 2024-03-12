import { Parameter } from "./Parameter";

export class PromptParameter {
    parameter: Parameter;
    value: string;

    constructor() {
        this.parameter = new Parameter();
        this.value = "";
    }
}