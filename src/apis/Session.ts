class Session {
    sessionID: number;
    storage: Map<string, any>;
    constructor() {
        this.sessionID = Date.now();
        this.storage = new Map();
    }
}

export const session = new Session();