import { commandManager } from "../../apis/CommandManager";
import { ResponseTypes, playerManager } from "apis/PlayerManager";
import { chatranksModule } from "modules/chatranks";
let commandName = "disable";
commandManager.register(commandName, {
    admin: true,
    author: "TRASH",
    category: "Modules",
    description: "Disables modules",
    tags: ["MODULES", "CUSTOMIZATION"],
    private: false,
    callback(msg, args) {
        let text = [];
        text.push(`!disable chatranks`);
        playerManager.sendResponse(msg.sender, ResponseTypes.PlainText, text.join('\n§r'));
    }
});
commandManager.registerSubcommand(commandName, "chatranks", (msg, args) => {
    chatranksModule.disable();
    playerManager.sendResponse(msg.sender, ResponseTypes.Success, "Disabled chatranks module!");
});
