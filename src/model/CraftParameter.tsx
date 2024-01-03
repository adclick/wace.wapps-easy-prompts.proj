import { Parameter } from "./Parameter";

export class CraftParameter {
    value: string;
    parameter: Parameter;

    constructor() {
        this.value = "";
        this.parameter = new Parameter();
    }

    static clone (craftParameter: CraftParameter): CraftParameter {
        const newCraftParameter = new CraftParameter();

        newCraftParameter.value = craftParameter.value;
        newCraftParameter.parameter = Parameter.clone(craftParameter.parameter);

        return newCraftParameter;
    }
}