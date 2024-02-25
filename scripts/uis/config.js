import { ActionFormData } from "@minecraft/server-ui";
var OptionTypes;
(function (OptionTypes) {
    OptionTypes[OptionTypes["Dropdown"] = 0] = "Dropdown";
    OptionTypes[OptionTypes["Text"] = 1] = "Text";
    OptionTypes[OptionTypes["Toggle"] = 2] = "Toggle";
    OptionTypes[OptionTypes["Slider"] = 3] = "Slider";
})(OptionTypes || (OptionTypes = {}));
let options = [
    {
        name: "Chat",
        icon: "textures/azalea_icons/Chat",
        options: [
            {
                type: OptionTypes.Dropdown,
                options: [
                    {
                        key: "1",
                        display: ""
                    }
                ],
                key: "ChatrankStyle",
                label: "§bChat rank style",
            }
        ]
    }
];
export default {
    name: "AzaleaRewrite0.1/Config",
    open(player) {
        let actionForm = new ActionFormData();
        for (const option of options) {
            actionForm.button(option.name, option.icon ? option.icon : undefined);
        }
        actionForm.show(player).then(res => {
        });
    }
};
