export class Request {
    text: string;
    timestamp: number;

    constructor() {
        this.text = "";
        this.timestamp = Date.now();
    }

    setText(text: string) {
        this.text = text;
    }
}