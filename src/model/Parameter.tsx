export class Parameter {
    id: number;
    name: string;
    slug: string;
    data: any;
    value: any;

    constructor() {
        this.id = 0;
        this.name = "";
        this.slug = "";
        this.data = "";
        this.value = null;
    }

    static clone (parameter: Parameter): Parameter {
        const newParameter = new Parameter();

        newParameter.id = parameter.id;
        newParameter.name = parameter.name;
        newParameter.slug = parameter.slug;
        newParameter.data = parameter.data;
        newParameter.value = parameter.value;

        return newParameter;
    }
}