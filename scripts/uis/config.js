import { ActionFormData } from "@minecraft/server-ui";
import chatCustomizationUI from "./chatCustomizationUI";
var OptionTypes;
(function (OptionTypes) {
    OptionTypes[OptionTypes["Dropdown"] = 0] = "Dropdown";
    OptionTypes[OptionTypes["Text"] = 1] = "Text";
    OptionTypes[OptionTypes["Toggle"] = 2] = "Toggle";
    OptionTypes[OptionTypes["Slider"] = 3] = "Slider";
})(OptionTypes || (OptionTypes = {}));
let options = [
    {
        name: "§aChat\n§7Chat Customization",
        icon: "textures/azalea_icons/Chat",
        key: "Chat",
        ui: chatCustomizationUI
    }
];
export default {
    name: "AzaleaRewrite0.1/Config",
    open(player) {
        let actionForm = new ActionFormData();
        let selections = [];
        for (const option of options) {
            selections.push(option);
            actionForm.button(option.name, option.icon ? option.icon : undefined);
        }
        actionForm.show(player).then(res => {
            if (res.canceled)
                return;
            let selection = selections[res.selection];
            selection.ui.open(player);
        });
    }
};
