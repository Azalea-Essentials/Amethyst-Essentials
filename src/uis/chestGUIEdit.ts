import { Player } from "@minecraft/server"
import { ActionFormData } from "@minecraft/server-ui"
import config from "./config";
import { chestguis } from "apis/ChestGUIMaker";
import editChestGUIItems from "./editChestGUIItems";

export default {
    name: "ChestGUIEdit",
    open(player: Player, id: number) {
        let actionForm = new ActionFormData();
        let chest = chestguis.getByID(id);
        actionForm.title(`Edit "${chest.title}§r"`)
        actionForm.button("§cDelete\n§7Delete the Chest GUI", "textures/3d_icons/Trash");
        actionForm.button("§eEdit Items\n§7Add/remove items", "textures/3d_icons/Chest");
        actionForm.button("§eEdit Properties\n§7Edit title and more", "textures/3d_icons/Edit");
        actionForm.show(player).then(res=>{
            if(res.canceled) config.open(player);
            if(res.selection == 1) {
                editChestGUIItems.open(player, id);
            }
        })
    }
}