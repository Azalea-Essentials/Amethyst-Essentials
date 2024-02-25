import { DatabaseLegacy } from "apis/database";
class ChatranksModule {
    constructor() {
        this.modulesDb = new DatabaseLegacy("Modules");
        this.moduleKey = "Chatranks";
        this.enabled = this.modulesDb.get(this.moduleKey, "true") == "true" ? true : false;
    }
    enable() {
        this.enabled = true;
        this.modulesDb.set(this.moduleKey, "true");
    }
    disable() {
        this.enabled = false;
        this.modulesDb.set(this.moduleKey, "false");
    }
    call(msg) {
        if (!this.enabled)
            return;
    }
}
