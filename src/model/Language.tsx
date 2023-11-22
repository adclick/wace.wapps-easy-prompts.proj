import { Code } from "@mantine/core";

const CODES = {
    EN: "en",
    PT: "pt"
}

const DEFAULT_CODE = CODES.EN;

export class Language {
    code: string;


    constructor() {
        this.code = DEFAULT_CODE;
    }

    static getAll() {
        return Object.values(CODES);
    }

    static getDefaultCode() {
        return DEFAULT_CODE;
    }

    static getValidLanguage(detectedLanguage: string) {
        return Object.values(CODES).includes(detectedLanguage)
            ? detectedLanguage
            : this.getDefaultCode();
    }

    setCode(code: string) {
        this.code = code;
    }
}