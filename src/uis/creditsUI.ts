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
        actionForm.button("§cProtogen1164\n§7Texture Designer", "textures/minidevs/Protogen1164")
        actionForm.button("§dZJawa\n§7Your average 40k furry man", "textures/minidevs/zjawa")
        if(Math.floor(Math.random() * 40) == 10) actionForm.button("§eAverage Azalea User\n§7Also a furry ;3", "textures/minidevs/AverageAzaleaUser")
        actionForm.show(player).then(res=>{
            config.open(player);
        })
    }
}