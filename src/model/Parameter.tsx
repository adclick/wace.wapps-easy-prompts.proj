export class Parameter {
    id: number;
    name: string;
    slug: string;
    content: any;
    value: any;

    constructor() {
        this.id = 0;
        this.name = "";
        this.slug = "";
        this.content = "";
        this.value = "";
    }

    static clone (parameter: Parameter): Parameter {
        const newParameter = new Parameter();

        newParameter.id = parameter.id;
        newParameter.name = parameter.name;
        newParameter.slug = parameter.slug;
        newParameter.content = parameter.content;
        newParameter.value = parameter.value;

        return newParameter;
    }
}