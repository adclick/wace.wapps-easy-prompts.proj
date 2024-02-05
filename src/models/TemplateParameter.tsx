import { Parameter } from "./Parameter";

export class TemplateParameter {
    parameter: Parameter;
    value: string;

    constructor() {
        this.parameter = new Parameter();
        this.value = "";
    }
}