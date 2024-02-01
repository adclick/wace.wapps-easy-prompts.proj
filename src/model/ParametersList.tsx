import { Parameter } from "./Parameter";

export class ParametersList {
    num_images: Parameter;
    image_resolution: Parameter;

    constructor() {
        this.num_images = new Parameter();
        this.image_resolution = new Parameter();
    }
}