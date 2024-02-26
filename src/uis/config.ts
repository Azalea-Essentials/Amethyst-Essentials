import { ActionFormData } from "@minecraft/server-ui";
import { Player } from "@minecraft/server"
import chatCustomizationUI from "./chatCustomizationUI";
import creditsUI from "./creditsUI";
enum OptionTypes {
    Dropdown = 0,
    Text = 1,
    Toggle = 2,
    Slider = 3,
}
type DropdownOptions = {
    key: string;
    display: string;
}
type OptionData = {
    type: OptionTypes;
    options?: DropdownOptions[];
    key: string;
    label: string;
    max?: number;
    min?: number;
    default?: number|string|boolean;
    placeholder?: string
}
type UI = {
    name: string;
    open: Function;
}
type OptionsObject = {
    name: string;
    icon: string;
    key: string;
    ui: UI;
    // options: OptionData[];
}
let options:OptionsObject[] = [
    {
        name: "§aChat\n§7Chat Customization",
        icon: "textures/azalea_icons/Chat",
        key: "Chat",
        ui: chatCustomizationUI
    },
    {
        name: "§6Chest GUIs\n§7Manage Chest GUIs",
        icon: "textures/3d_icons/Chest",
        key: "Chest",
        ui: {
            name: "a",
            open(){}
        }
    },
    {
        name: "§cCredits\n§7See people who helped",
        icon: "textures/minidevs/icon",
        key: "Credits",
        ui: creditsUI
    },

]
export default {
    name: "AzaleaRewrite0.1/Config",
    open(player: Player) {
        let actionForm = new ActionFormData();
        let selections = [];
        for(const option of options) {
            selections.push(option);
            actionForm.button(option.name, option.icon ? option.icon : undefined);
        }
        actionForm.show(player).then(res=>{
            if(res.canceled) return;
            let selection = selections[res.selection]
            selection.ui.open(player);
        })
    }
}