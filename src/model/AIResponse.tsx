export class AIResponse {
    id: number;
    response: any;

    constructor(id: number) {
        this.id = id;
        this.response = "";
    }

    static clone(aiResponse: AIResponse): AIResponse {
        const newResponse = new AIResponse(aiResponse.id);

        newResponse.response = aiResponse.response;

        return newResponse;
    }
}