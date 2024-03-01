import { ChatSendBeforeEvent, Player, world } from "@minecraft/server";
import { commandManager } from "../../apis/CommandManager";
import { ResponseTypes, playerManager } from "apis/PlayerManager";
import { chatranksModule } from "modules/chatranks";

let commandName = "speakas";

commandManager.register(commandName, {
    admin: true,
    author: "TRASH",
    category: "Commands to make people hate you",
    description: "make anyone send any message (requires chatranks module enabled!)",
    tags: ["SPEAKAS", "TROLLING"],
    private: false,
    callback(msg: ChatSendBeforeEvent, args: string[]) {
        if(!chatranksModule.enabled) return playerManager.sendResponse(msg.sender, ResponseTypes.Error, "Please enable chat ranks for this to work.")
        let player:Player;
        for(const player2 of world.getPlayers()) {
            if(player2.name.toLocaleLowerCase() == args[0].toLowerCase()) player = player2;
        }
        if(!player) return playerManager.sendResponse(msg.sender, ResponseTypes.Error, "Player not found!");
        chatranksModule.call({
            message: args.slice(1).join(' '),
            sender: player
        })
    }
});