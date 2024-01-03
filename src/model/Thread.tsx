export class Request {
    text: string;
    response: string;
    timestamp: Date;

    constructor() {
        this.text = "";
        this.response = "";
        this.timestamp = new Date();
    }
}

export class Thread {
    id: number;
    requests: Request[];

    constructor() {
        this.id = Date.now();
        this.requests = [];
    }
}