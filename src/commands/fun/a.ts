import { ChatSendBeforeEvent } from "@minecraft/server";
import { commandManager } from "../../apis/CommandManager";
import { ResponseTypes, playerManager } from "apis/PlayerManager";
import { chatranksModule } from "modules/chatranks";

let commandName = "a";

commandManager.register(commandName, {
    admin: true,
    author: "TRASH",
    category: "Fun",
    description: "a",
    tags: ["A", "AA", "AAA", "AAAA", "AAAAA"],
    private: false,
    callback(msg: ChatSendBeforeEvent, args: string[]) {
        let textList: string[] = [
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
        ]
        let text: string = textList[Math.floor(Math.random() * textList.length)]
        playerManager.sendResponse(msg.sender, ResponseTypes.Info, text)
    }
});