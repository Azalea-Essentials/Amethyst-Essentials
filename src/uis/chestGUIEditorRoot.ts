import { Player } from "@minecraft/server"
import { ActionFormData, ModalFormData } from "@minecraft/server-ui"
import { chatranksModule } from "modules/chatranks";
import config from "./config";
import { ChestFormData } from "chest/forms";
import { chestguis } from "apis/ChestGUIMaker";
import createChestGUI from "./createChestGUI";
export default {
    name: "AzaleaRewrite0.1/ChestGUIs/Root",
    open(player: Player) {
        let ui = new ActionFormData();
        let buttons = [];
        ui.button("§aAdd Chest\n§7Add a Chest GUI", "textures/3d_icons/AddChest")
        buttons.push(null);
        for(const gui of chestguis.chestGUIs) {
            ui.button(`§e${gui.title}\n§7${gui.tag}`, "textures/3d_icons/Chest");
            buttons.push(gui)
        }
        ui.button("§dGet Help\n§7Get help with Chest GUI maker", "textures/3d_icons/EnderChest")
        buttons.push(null);
        
        ui.show(player).then(res=>{
            if(res.canceled) return config.open(player);
            if(res.selection == 0) {
                createChestGUI.open(player);
            } else {
                config.open(player);
            }
        })
    }
}