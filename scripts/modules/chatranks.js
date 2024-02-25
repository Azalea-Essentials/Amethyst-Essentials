import { world } from "@minecraft/server";
import { TagPrefixes, playerManager } from "apis/PlayerManager";
import { DatabaseLegacy } from "apis/database";
import configuration from "configuration";
class ChatranksModule {
    constructor() {
        this.modulesDb = new DatabaseLegacy("Modules");
        this.moduleKey = "Chatranks";
        this.enabled = this.modulesDb.get(this.moduleKey, "true") == "true" ? true : false;
    }
    enable() {
        this.enabled = true;
        this.modulesDb.set(this.moduleKey, "true");
    }
    disable() {
        this.enabled = false;
        this.modulesDb.set(this.moduleKey, "false");
    }
    call(msg) {
        if (!this.enabled)
            return;
        let ranks = playerManager.getTagsStartingWith(msg.sender, TagPrefixes.Rank);
        let nameColor = playerManager.getFirstTagStartingWith(msg.sender, TagPrefixes.NameColor) ?? configuration.modules.chatranks.defaultNameColor;
        let bracketColor = playerManager.getFirstTagStartingWith(msg.sender, TagPrefixes.BracketColor) ?? configuration.modules.chatranks.defaultBracketColor;
        let msgColor = playerManager.getFirstTagStartingWith(msg.sender, TagPrefixes.MessageColor) ?? configuration.modules.chatranks.defaultMessageColor;
        let defaultRankColor = configuration.modules.chatranks.defaultRankColor;
        if (!ranks.length) {
            if (playerManager.isAdmin(msg.sender))
                ranks.push(configuration.modules.chatranks.defaultAdminRank);
            else
                ranks.push(configuration.modules.chatranks.defaultMemberRank);
        }
        for (const player of world.getPlayers()) {
            player.sendMessage(`${bracketColor}[§r${defaultRankColor}${ranks.join(`§r${bracketColor}] [${defaultRankColor}`)}§r${bracketColor}] §r${nameColor}${msg.sender.name} §r${bracketColor}» §r${msgColor}${msg.message}`);
        }
    }
}
export const chatranksModule = new ChatranksModule();
