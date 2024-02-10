export enum Type {
    PROMPT = "PROMPT",
    TEMPLATE = "TEMPLATE",
    MODIFIER = "MODIFIER"
}

export enum Label {
    Prompt = "Prompt",
    Tempalate = "Template",
    Modifier = "Modifier"
}

export enum LabelPlural {
    Prompts = "Prompts",
    Tempalates = "Templates",
    Modifiers = "Modifiers"
}

export class SelectedDatabaseType {
    type: Type;
    label: Label;
    labelPlural: LabelPlural;

    constructor(type: Type = Type.PROMPT) {
        switch(type) {
            case Type.PROMPT:
                this.type = Type.PROMPT;
                this.label = Label.Prompt;
                this.labelPlural = LabelPlural.Prompts;
                break;
            case Type.TEMPLATE:
                this.type = Type.TEMPLATE;
                this.label = Label.Tempalate;
                this.labelPlural = LabelPlural.Tempalates;
                break;
            case Type.MODIFIER:
                this.type = Type.MODIFIER;
                this.label = Label.Modifier;
                this.labelPlural = LabelPlural.Modifiers;
                break;
        }
    }
}
