import { ActionFormData } from "@minecraft/server-ui";
import { Player } from "@minecraft/server";
import config from "./config";
export default {
    name: "AzaleaRewrite0.1/Config/settings",
    open(player: Player) {
        let actionForm = new ActionFormData();
        actionForm.title("§bSettings Ui");
        actionForm.button("§aMob Disabler", "textures/")
        actionForm.button("§aClearlag", "textures/")
        actionForm.show(player).then(res=>{
            config.open(player);
        })
    }
}