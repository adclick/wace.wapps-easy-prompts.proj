import { Technology } from "./Technology";

export class Request {
    text: string;
    technology: Technology;
    timestamp: number;

    constructor(text: string = "", timestamp: number = Date.now()) {
        this.text = text;
        this.technology = new Technology();
        this.timestamp = timestamp;
    }

    static clone (request: Request) {
        const newRequest = new Request();

        newRequest.text = request.text;
        newRequest.timestamp = request.timestamp;
        newRequest.technology = Technology.clone(request.technology);

        return newRequest;
    }
}