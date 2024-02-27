import { Player } from "@minecraft/server"
import { ModalFormData } from "@minecraft/server-ui"
import { chatranksModule } from "modules/chatranks";
import config from "./config";
export default {
    name: "AzaleaRewrite0.1/Config/Chat",
    open(player: Player) {
        let form = new ModalFormData();
        let moduleConfig = chatranksModule.modulesDb.get("ChatConfig", {});
        let chatranksStyle = moduleConfig.chatranksStyle ?? 0;
        form.title("§aChat Customization");
        form.toggle("Enable Chatranks", chatranksModule.enabled);
        form.dropdown("Chatranks Style", [
            "Default",
            "Default (With Time)",
            "Icon Ranks",
            "Legacy Compatibility Mode (Chatrank Formats)",
        ], chatranksStyle)
        form.show(player).then(res=>{
            if(!res.canceled) {
                if(res.formValues[0]) chatranksModule.enable()
                else chatranksModule.disable();
                moduleConfig.chatranksStyle = res.formValues[1];
                chatranksModule.modulesDb.set("ChatConfig", moduleConfig);
            }
            config.open(player);
        })
    }
}