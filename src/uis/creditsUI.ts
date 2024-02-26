import { ActionFormData } from "@minecraft/server-ui";
import { Player } from "@minecraft/server";
import config from "./config";
export default {
    name: "AzaleaRewrite0.1/Config/Chat",
    open(player: Player) {
        let actionForm = new ActionFormData();
        actionForm.title("§bAzalea Credits");
        actionForm.button("§bTrash9240\n§7Main Developer", "textures/minidevs/trash")
        actionForm.button("§aOtf5shotzz\n§7Crates Developer", "textures/minidevs/Otf5shotzz");
        actionForm.button("§9Asteroid3946\n§7UI Designer", "textures/minidevs/Astroidboi")
        actionForm.button("§eEgg7869\n§7Texture Designer", "textures/minidevs/Egg7869")
        actionForm.show(player).then(res=>{
            config.open(player);
        })
    }
}