import { iconManager } from "./IconManager";
import { Database } from "./database";
type RowCol = {
    row: number,
    col: number
}
type ChestGUIItem = {
    command: string;
    tagToView: string | null;
    name: string;
    lore: string[];
    amount: number;
    iconID: string;
    row: number;
    column: number;
}
type ChestGUI = {
    tag: string;
    title: string;
    rows: number;
    id: number;
    icons: ChestGUIItem[];
    exitMessage: string;
    theme: number;
}
enum addItemResponse {
    // returns -1 if the chest gui is not found
    // returns -2 if the icon ID is not valid
    // returns -3 if there is already an icon in that slot
    // returns 0 if successful
    Successful = 0,
    ChestGUINotFound = -1,
    InvalidIconID = -2,
    IconAlreadyInSlot = -3,
}
enum makeChestGUI {
    AdminTagNotAllowed = -1,
    DuplicateGUI = -2,
    Successful = 0,
}
class ChestGUIMaker {

    chestGUIs: ChestGUI[];
    db: Database;
    private readonly columnSize: number;
    private readonly rowColumnOffset: number;
    constructor() {
        this.columnSize = 9;
        this.rowColumnOffset = 1;
        this.db = new Database("ChestGUIs");
        this.chestGUIs = [];
        this.loadChest();
    }
    getByID(id: number) {
        return this.chestGUIs.find(_=>_.id == id);
    }
    replaceItemInChestGUI(itemIndex: number, chestGUIId: number, options: ChestGUIItem) {
        let result = this.addItemToChestGUI(chestGUIId, options);
        let index = this.chestGUIs.findIndex(_=>_.id == chestGUIId);
        this.chestGUIs[index].icons.splice(itemIndex, 1);
        this.saveChest();
        return result;
    }
    loadChest() {
        this.chestGUIs = this.db.get("Forms", []);
    }
    saveChest() {
        this.db.set("Forms", this.chestGUIs);
    }
    makeChestGUI(data: ChestGUI) {
        // returns -1 if the tag is admin, returns -2 if there is a duplicate chest gui, and returns 0 if it is successful
        if(data.tag == "admin") return -1;
        if(this.chestGUIs.find(gui => gui.tag == data.tag)) return -2;
        this.chestGUIs.push(data);
        this.saveChest();
        return 0;
    }
    getChestIndexByID(id: number) {
        return this.chestGUIs.findIndex(gui => gui.id == id);
    }
    addItemToChestGUI(id: number, item: ChestGUIItem) {
        // returns -1 if the chest gui is not found
        // returns -2 if the icon ID is not valid
        // returns -3 if there is already an icon in that slot
        // returns 0 if successful
        let index = this.getChestIndexByID(id);
        if(index < 0) return -1;
        if(!iconManager.isValidIcon(item.iconID)) return -2;
        if(this.chestGUIs[index].icons.find(itemB=>itemB.column == item.column && itemB.row == item.row)) return -3;
        this.chestGUIs[index].icons.push(item);
        this.saveChest();
        return 0;
    }
    convertRowAndColumnToSlot(position: RowCol): number {
        return this.columnSize * (position.row - this.rowColumnOffset) + (position.col - this.rowColumnOffset)
    }
    convertSlotToRowColumn(slot: number): RowCol {
        let row = Math.floor(slot / this.columnSize) + this.rowColumnOffset;
        let col = (slot % this.columnSize) + this.rowColumnOffset;
        return { row, col }
    }
}

export const chestguis = new ChestGUIMaker();

export { makeChestGUI, addItemResponse}