import { ChatSendBeforeEvent, Player } from "@minecraft/server";
import { ResponseTypes, playerManager } from "apis/PlayerManager";
import { session } from "apis/Session";

class ChatOverrideInteraction {
    getKey(player: Player) {
        return `${player.id}-Callback`
    }
    createChatOverrideInteraction(player: Player, callback: Function) {
        playerManager.sendResponse(player, ResponseTypes.Info, "You are in a command session. Type 'exit' to exit");
        session.storage.set(this.getKey(player), callback);
    }
    chatOverrideRun(player: Player, msg: ChatSendBeforeEvent): boolean {
        if(!session.storage.has(this.getKey(player))) return false;
        if(msg.message == "exit") {
            playerManager.sendResponse(player, ResponseTypes.Info, "Exiting...")
            session.storage.delete(this.getKey(player));
            return true;
        }

        let callback = session.storage.get(this.getKey(player));
        let response = callback(msg);
        if(response == true) {
            session.storage.delete(this.getKey(player));
            playerManager.sendResponse(player, ResponseTypes.Info, "Exiting...");
        }
        return true;
    }
}
export const chatOverrideInteraction = new ChatOverrideInteraction();