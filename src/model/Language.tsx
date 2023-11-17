export class Language {
    code: string;

    constructor() {
        this.code = "en";
    }

    static getAll() {
        return ["en", "pt"];
    }

    static getDefault() {
        return "en";
    }

    static getValidLanguage(detectedLanguage: string) {
        return this.getAll().includes(detectedLanguage)
            ? detectedLanguage
            : this.getDefault();
    }

    setCode(code: string) {
        this.code = code;
    }
}