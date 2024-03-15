import { ChatSendBeforeEvent } from "@minecraft/server";
import { commandManager } from "../../apis/CommandManager";
import { ResponseTypes, playerManager } from "apis/PlayerManager";
import { chatranksModule } from "modules/chatranks";

let commandName = "b";

commandManager.register(commandName, {
    admin: true,
    author: "ASTEROID3946",
    category: "Fun",
    description: "b",
    tags: ["B", "BB", "BBB", "BBBB", "BBBBB"],
    private: false,
    callback(msg: ChatSendBeforeEvent, args: string[]) {
        let textList: string[] = [
            "b",
            "B",
            "bb",
            "bB",
            "Bb",
            "BB",
            "bbb",
            "bbB",
            "bBb",
            "Bbb",
            "BbB",
            "Bbb",
            "BBB",
            "BBBBBBBBBBBBBBBBBBBB",
            "You used !b",
            "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
            "b is the second letter of the english alphabet. it comes right before c."
        ]
        let text: string = textList[Math.floor(Math.random() * textList.length)]
        playerManager.sendResponse(msg.sender, ResponseTypes.Info, text)
    }
});