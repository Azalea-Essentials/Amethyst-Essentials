import { ChatSendBeforeEvent } from "@minecraft/server";
import { commandManager } from "../../apis/CommandManager";
import { ResponseTypes, playerManager } from "apis/PlayerManager";

commandManager.register("credits", {
    admin: false,
    author: "TRASH",
    category: "Information",
    description: "See people who helped with azalea",
    tags: ["INFORMATION"],
    private: false,
    callback(msg: ChatSendBeforeEvent, args: string[]) {
        let credits: string[] = [];
        credits.push(`§8----§7>§8-- §bDevelopers §r§8--§7<§8----`)
        credits.push(`§3Trash9240 §8- §7Main Developer`)
        credits.push(`§3Otf5shotzz §8- §7Developer`)
        credits.push(`§3Asteroid3946 §8- §7UI Designer, Manager`)

        playerManager.sendResponse(msg.sender, ResponseTypes.PlainText, credits.join('\n§r'))
    }
});