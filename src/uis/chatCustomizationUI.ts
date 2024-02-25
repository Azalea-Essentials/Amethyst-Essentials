import { Player } from "@minecraft/server"
import { ModalFormData } from "@minecraft/server-ui"
import { chatranksModule } from "modules/chatranks";
import config from "./config";
export default {
    name: "AzaleaRewrite0.1/Config/Chat",
    open(player: Player) {
        let form = new ModalFormData();
        form.title("§aChat Customization");
        form.toggle("Enable Chatranks", chatranksModule.enabled);
        form.dropdown("Chatranks Style", [
            "Default",
            "Default (With Time)",
            "Legacy Compatibility Mode (Chatrank Formats)"
        ], 0)
        form.show(player).then(res=>{
            if(res.canceled) {
                config.open(player);
            }
        })
    }
}