import { Template } from "./Template";

export class ThreadTemplate {
    template: Template;

    constructor() {
        this.template = new Template();
    }

    static buildFromSelectedTemplates(selectedTemplates: Template[]): ThreadTemplate[] {
        const threadsTemplates: ThreadTemplate[] = [];

        selectedTemplates.forEach(t => threadsTemplates.push({template: t}));

        return threadsTemplates;
    }
}