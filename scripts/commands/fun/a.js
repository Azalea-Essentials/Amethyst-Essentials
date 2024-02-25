import { commandManager } from "../../apis/CommandManager";
import { ResponseTypes, playerManager } from "apis/PlayerManager";
let commandName = "a";
commandManager.register(commandName, {
    admin: true,
    author: "TRASH",
    category: "Fun",
    description: "a",
    tags: ["A", "AA", "AAA", "AAAA", "AAAAA"],
    private: false,
    callback(msg, args) {
        let textList = [
            "a",
            "A",
            "aa",
            "aA",
            "Aa",
            "AA",
            "aaa",
            "aaA",
            "aAa",
            "Aaa",
            "AaA",
            "AAa",
            "AAA",
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            "You used !a",
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            "a is the first letter of the english alphabet. it comes right before b."
        ];
        let text = textList[Math.floor(Math.random() * textList.length)];
        playerManager.sendResponse(msg.sender, ResponseTypes.Info, text);
    }
});
