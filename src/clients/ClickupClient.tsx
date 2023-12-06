import axios from "axios";

export class ClickupClient {
    baseUrl: string;
    itSupportListId: number;

    constructor() {
        this.baseUrl = "https://api.clickup.com/api/v2";
        this.itSupportListId = 0;
    }

    async createTask(name: string, description: string) {
        console.log('creating task')
        axios.post(`${this.baseUrl}/list/${this.itSupportListId}/task`, {
            name,
            description
        });
    }
}