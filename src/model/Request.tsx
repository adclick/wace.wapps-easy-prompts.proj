import { CraftParameter } from "./CraftParameter";
import { Provider } from "./Provider";
import { Technology } from "./Technology";

export class Request {
    id: number;
    craftId: number;
    title: string;
    prompt: string;
    technology: Technology;
    provider: Provider;
    crafts_parameters: CraftParameter[];
    timestamp: number;
    response: any;

    constructor(id: number = 0, title: string = "", timestamp: number = Date.now(), craftId: number = 0) {
        this.id = id;
        this.craftId = craftId;
        this.title = title;
        this.prompt = "";
        this.technology = new Technology();
        this.provider = new Provider();
        this.crafts_parameters = [];
        this.timestamp = timestamp;
        this.response = "";
    }

    static clone(request: Request): Request {
        const newRequest = new Request(request.id);

        newRequest.id = request.id;
        newRequest.craftId = request.craftId;
        newRequest.title = request.title;
        newRequest.prompt = request.prompt;
        newRequest.timestamp = request.timestamp;
        newRequest.technology = Technology.clone(request.technology);
        newRequest.provider = Provider.clone(request.provider);
        newRequest.crafts_parameters = request.crafts_parameters.map(cp => CraftParameter.clone(cp));
        newRequest.response = request.response;

        return newRequest;
    }
}