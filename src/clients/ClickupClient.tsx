import axios from "axios";

export class ClickupClient {
    baseUrl: string;
    itSupportListId: number;

    constructor() {
        // api token: pk_8735294_94255UUOZTPQ6D5XE3JKX0A17VMZ171H
        this.baseUrl = "https://api.clickup.com/api/v2";
        this.itSupportListId = 901200963685;
    }

    async createTask(name: string, description: string) {
        console.log('creating task')
        axios.post(`${this.baseUrl}/list/${this.itSupportListId}/task`, {
            name,
            description
        }, {
            headers: {
                Authorization: 'pk_8735294_94255UUOZTPQ6D5XE3JKX0A17VMZ171H'
            }
        });
    }
}