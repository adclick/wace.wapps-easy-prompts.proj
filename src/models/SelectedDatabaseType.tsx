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

    constructor() {
        this.type = Type.PROMPT;
        this.label = Label.Prompt;
        this.labelPlural = LabelPlural.Prompts
    }
}
