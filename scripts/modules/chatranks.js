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
    callIconRanks(msg) {
        let tag = playerManager.getIconRank(msg.sender);
        let icon = playerManager.getIconRankIconColor(msg.sender, tag ? tag : "MEMBER");
        for (const player of world.getPlayers()) {
            player.sendMessage(`${icon.icon} ${icon.color}${msg.sender.name} §r§8§l» §r§7${msg.message}`);
        }
    }
    call(msg) {
        if (!this.enabled)
            return;
        let moduleConfig = chatranksModule.modulesDb.get("ChatConfig", {});
        let chatranksStyle = moduleConfig.chatranksStyle ?? 0;
        if (chatranksStyle == 2)
            return this.callIconRanks(msg);
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
