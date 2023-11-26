import { Request } from "./Request";
import { Response } from "./Response";
import { UserPromptOptions } from "./UserPromptOptions";

export class Thread {
    request: Request;
    response: Response;

    constructor() {
        this.request = new Request();
        this.response = new Response();
    }

    setRequest(request: Request) {
        this.request = request;
    }

    setResponse(response: Response) {
        this.response = response;
    }
}