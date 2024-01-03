import { Provider } from "./Provider";
import { Technology } from "./Technology";

export class Request {
    text: string;
    technology: Technology;
    provider: Provider;
    timestamp: number;

    constructor(text: string = "", timestamp: number = Date.now()) {
        this.text = text;
        this.technology = new Technology();
        this.provider = new Provider();
        this.timestamp = timestamp;
    }

    static clone (request: Request) {
        const newRequest = new Request();

        newRequest.text = request.text;
        newRequest.timestamp = request.timestamp;
        newRequest.technology = Technology.clone(request.technology);
        newRequest.provider = Provider.clone(request.provider);

        return newRequest;
    }
}