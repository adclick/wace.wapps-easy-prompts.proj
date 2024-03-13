import { Parameter } from "./Parameter";

export class ThreadParameter {
    parameter: Parameter;
    value: string;

    constructor() {
        this.parameter = new Parameter();
        this.value = "";
    }
}