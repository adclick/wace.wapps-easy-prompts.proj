export class Parameter {
    id: number;
    uuid: string;
    name: string;
    slug: string;
    data: any;
    value: string;

    constructor(name: string = "", slug: string = "", data: string = "", value: any = null) {
        this.id = 0;
        this.uuid = "";
        this.name = name;
        this.slug = slug;
        this.data = data;
        this.value = value;
    }

    static clone (parameter: Parameter): Parameter {
        const newParameter = new Parameter();

        newParameter.id = parameter.id;
        newParameter.uuid = parameter.uuid;
        newParameter.name = parameter.name;
        newParameter.slug = parameter.slug;
        newParameter.data = parameter.data;
        newParameter.value = parameter.value;

        return newParameter;
    }

    static getIdAndValue = (parameter: Parameter) => {
        return {
            parameter_id: parameter.id,
            value: parameter.value
        };
    }
}