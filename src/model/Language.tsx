export class Language {
    code: string;

    constructor() {
        this.code = "EN";
    }

    static getAll() {
        return ["EN", "PT"];
    }

    setCode(code: string) {
        this.code = code;
    }
}