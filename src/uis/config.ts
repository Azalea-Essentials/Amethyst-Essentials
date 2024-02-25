import { ActionFormData } from "@minecraft/server-ui";
import { Player } from "@minecraft/server"
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
type OptionsObject = {
    name: string;
    icon: string;
    options: OptionData[];
}
let options:OptionsObject[] = [
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
]
export default {
    name: "AzaleaRewrite0.1/Config",
    open(player: Player) {
        let actionForm = new ActionFormData();
        for(const option of options) {
            actionForm.button(option.name, option.icon ? option.icon : undefined);
        }
        actionForm.show(player).then(res=>{
            
        })
    }
}