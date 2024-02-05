import { Parameter } from "./Parameter";
import { Provider } from "./Provider";
import { Template } from "./Template";

export class ParametersList {
    num_images: Parameter;
    image_resolution: Parameter;

    constructor() {
        this.num_images = new Parameter();
        this.image_resolution = new Parameter();
    }

    static buildFromProvider(provider: Provider): ParametersList {
        const newParametersList = new ParametersList();

        const num_images = provider.parameters.find(p => p.slug === "num_images");
        if (num_images) newParametersList.num_images = num_images;
        
        const image_resolution = provider.parameters.find(p => p.slug === "image_resolution");
        if (image_resolution) newParametersList.image_resolution = image_resolution;

        return newParametersList;
    }

    static buildFromTemplate(template: Template): ParametersList {
        const newParametersList = new ParametersList();

        const num_images = template.templates_parameters.find(p => p.parameter.slug === "num_images");
        if (num_images) {
            num_images.parameter.value = num_images.value;
            newParametersList.num_images = num_images.parameter;
        } 
        
        const image_resolution = template.templates_parameters.find(p => p.parameter.slug === "image_resolution");
        if (image_resolution) {
            image_resolution.parameter.value = image_resolution.value;
            newParametersList.image_resolution = image_resolution.parameter;
        }

        return newParametersList;
    }

    static getActiveParameters = (parametersList: ParametersList): Parameter[] => {
        const parameters: Parameter[] = [];

        if (parametersList.num_images.id > 0) parameters.push(parametersList.num_images);
        if (parametersList.image_resolution.id > 0) parameters.push(parametersList.image_resolution);

        return parameters;
    }
}