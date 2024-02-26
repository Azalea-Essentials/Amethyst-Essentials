import { Player } from "@minecraft/server"
import { ActionFormData, ModalFormData } from "@minecraft/server-ui"
import { chatranksModule } from "modules/chatranks";
import config from "./config";
import { ChestFormData } from "chest/forms";
import { chestguis } from "apis/ChestGUIMaker";
export default {
    name: "AzaleaRewrite0.1/ChestGUIs/Create",
    open(player: Player) {
        let modal = new ModalFormData();
        modal.title("Create Chest GUI");
        modal.slider("Rows", 1, 6, 1, 3);
        modal.toggle("Hopper Mode?", false);
        modal.textField("Title§c*", "UI Title (Required)");
        modal.textField("Tag§c*", "UI Tag (Required)");
        modal.textField("Exit Message", "Sends a message when the player exits");
        modal.dropdown("Theme", [
            "Default",
            "Ocean",
            "Nether",
            "Why",
            "Green",
            "Blue"
        ], 0)
        modal.show(player).then(res=>{

        })
    }
}