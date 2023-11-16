export enum TYPE {
    TEXT = "text",
    IMAGE = "image",
    VIDEO = "video",
    AUDIO = "audio"
}

export class Response {
    data: string;
    type: TYPE;

    constructor() {
        this.data = "";
        this.type = TYPE.TEXT;
    }

    setData(data: string) {
        this.data = data;
    }
}