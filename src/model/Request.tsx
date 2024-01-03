import { CraftParameter } from "./CraftParameter";
import { Provider } from "./Provider";
import { Technology } from "./Technology";

export class Request {
    title: string;
    prompt: string;
    technology: Technology;
    provider: Provider;
    crafts_parameters: CraftParameter[];
    timestamp: number;

    constructor(title: string = "", timestamp: number = Date.now()) {
        this.title = title;
        this.prompt = "";
        this.technology = new Technology();
        this.provider = new Provider();
        this.crafts_parameters = [];
        this.timestamp = timestamp;
    }

    static clone (request: Request): Request {
        const newRequest = new Request();

        newRequest.title = request.title;
        newRequest.prompt = request.prompt;
        newRequest.timestamp = request.timestamp;
        newRequest.technology = Technology.clone(request.technology);
        newRequest.provider = Provider.clone(request.provider);
        newRequest.crafts_parameters = request.crafts_parameters.map(cp => CraftParameter.clone(cp));

        return newRequest;
    }
}