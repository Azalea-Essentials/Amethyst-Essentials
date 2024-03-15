import { DatabaseLegacy } from "./database";

class IDGenerator {
    incrementalIdDatabase: DatabaseLegacy;
    constructor() {
        this.incrementalIdDatabase = new DatabaseLegacy("IncrementalIDs")
    }
    generateIncrementalID(key: string) {
        let num:any = this.incrementalIdDatabase.get(key, "NUM:0");
        if(!num) num = "NUM:0";
        num = parseInt(num.substring(4));
        let num2 = num+1;
        this.incrementalIdDatabase.set(key, `NUM:${num2.toString()}`)
        return num;
    }
    generateTimeID() {
        return Date.now();
    }
}
export const idGenerator = new IDGenerator();