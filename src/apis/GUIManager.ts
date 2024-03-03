import { Database } from "./database";

enum FormTypes {
    Action = "ACTION",
    Modal = "MODAL"
}
enum FormElementTypes {
    Button = "BUTTON",
    Dropdown = "DROPDOWN",
    Toggle = "TOGGLE",
    Slider = "SLIDER"
}
type FormElementType = "BUTTON" | "DROPDOWN" | "TOGGLE" | "SLIDER";
type FormType = "ACTION" | "MODAL";
type DropdownOption = {
    command: string,
    tag: string
}
type FormContent = {
    type: FormElementType,
    max?: number,
    min?: number,
    label: string,
    tag?: string,
    objective?: string,
    step?: string,
    command?: string,
    optionsList?: DropdownOption[]
}
type Form = {
    type: FormType,
    id: number,
    disabled: boolean,
    tag: string,
    content: FormContent[]
}
class GUIManager {
    private readonly db: Database;
    forms: Form[]
    constructor() {
        this.db = new Database("GUIManager");
        this.forms = [];
        this.loadForms();
    }
    private loadForms() {
        this.forms = this.db.get("Forms", []);
    }
    private saveForms() {
        this.db.set("Forms", this.forms);
    }
    createForm(type: FormType, tag: string) {
        this.forms.push({
            type,
            tag,
            id: Date.now(),
            disabled: false,
            content: []
        })
    }
}
// tui mqnqtqewe im illi534q53 h34