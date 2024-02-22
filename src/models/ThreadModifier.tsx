import { Modifier } from "./Modifier";

export class ThreadModifier {
    modifier: Modifier;

    constructor() {
        this.modifier = new Modifier();
    }

    static buildFromSelectedModifiers(selectedModifiers: Modifier[]): ThreadModifier[] {
        const threadModifiers: ThreadModifier[] = [];

        selectedModifiers.forEach(m => threadModifiers.push({modifier: m}));

        return threadModifiers;
    }
}

