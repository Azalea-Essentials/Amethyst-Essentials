import { commandManager } from "../../apis/CommandManager";
import { ResponseTypes, playerManager } from "apis/PlayerManager";
commandManager.register("help", {
    admin: false,
    author: "TRASH",
    category: "Information",
    description: "Azalea help command",
    tags: ["INFORMATION"],
    private: false,
    callback(msg, args) {
        if (args.length) {
            let commandName = args[0];
            let commandData = commandManager.commands.find(_ => _.name == commandName);
            if (!commandData)
                return playerManager.sendResponse(msg.sender, ResponseTypes.Error, "Command not found!");
            let textList = [];
            textList.push(`§8----§7>§8-- §b!${commandData.name} §r§8--§7<§8----`);
            textList.push(`§7> §3Description §8- §7${commandData.description}`);
            textList.push(`§7> §3Category §8- §7${commandData.category}`);
            textList.push(`§7> §3Tags (${commandData.tags.length}) §8- §7${commandData.tags.join('§r§8, §7')}`);
            textList.push(``);
            textList.push(`§7Command written by §b${commandData.author}`);
            playerManager.sendResponse(msg.sender, ResponseTypes.PlainText, textList.join('\n§r'));
            return;
        }
        let textList = [];
        let categories = {};
        for (const command of commandManager.commands) {
            if (categories[command.category])
                categories[command.category].push(command);
            else
                categories[command.category] = [command];
        }
        for (const categoryName of Object.keys(categories)) {
            textList.push(`§8----§7>§8-- §b${categoryName} §r§8--§7<§8----`);
            for (const command of categories[categoryName]) {
                textList.push(`§3${command.name} §8- §7${command.description}`);
            }
        }
        playerManager.sendResponse(msg.sender, ResponseTypes.PlainText, textList.join('\n§r'));
    }
});
