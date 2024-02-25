import { commandManager } from "../../apis/CommandManager";
import { ResponseTypes, playerManager } from "apis/PlayerManager";
import { chatranksModule } from "modules/chatranks";
let commandName = "enable";
commandManager.register(commandName, {
    admin: true,
    author: "TRASH",
    category: "Modules",
    description: "Enables modules",
    tags: ["MODULES", "CUSTOMIZATION"],
    private: false,
    callback(msg, args) {
        let text = [];
        text.push(`!enable chatranks`);
        playerManager.sendResponse(msg.sender, ResponseTypes.PlainText, text.join('\n§r'));
    }
});
commandManager.registerSubcommand(commandName, "chatranks", (msg, args) => {
    chatranksModule.enable();
    playerManager.sendResponse(msg.sender, ResponseTypes.Success, "Enabled chatranks module!");
});