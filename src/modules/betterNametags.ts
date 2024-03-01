import { ChatSendBeforeEvent, EntityHealthComponent, Player, world } from "@minecraft/server";
import { TagPrefixes, playerManager } from "apis/PlayerManager";
import { DatabaseLegacy } from "apis/database";
import configuration from "configuration";

type chatData = {
    sender: Player,
    message: string
}

class BetterNametags {
    modulesDb: DatabaseLegacy;
    moduleKey: string;
    enabled: boolean;
    
    constructor() {
        this.modulesDb = new DatabaseLegacy("Modules");
        this.moduleKey = "BetterNametags";
        this.enabled = this.modulesDb.get(this.moduleKey, "true") == "true" ? true : false;
    }
    enable() {
        this.enabled = true;
        this.modulesDb.set(this.moduleKey, "true")
    }
    disable() {
        this.enabled = false;
        this.modulesDb.set(this.moduleKey, "false")
    }
    call() {
        if(!this.enabled) {
            for(const player of world.getPlayers()) {
                player.nameTag = player.name;
            }
            return;
        }
        let moduleConfig = this.modulesDb.get("ChatConfig", {});
        let chatranksStyle = moduleConfig.chatranksStyle ?? 0;
        for(const player of world.getPlayers()) {
            if(chatranksStyle == 2) {
                let tag = playerManager.getIconRank(player);
                let rank = playerManager.getIconRankIconColor(player, tag ? tag : "MEMBER")
                let health:EntityHealthComponent = player.getComponent('health');
                let healthText = `§r§f(§c${Math.floor(health.currentValue)}§7/§a${health.effectiveMax}§r§f)`
                player.nameTag = `${rank.icon} ${rank.color}${player.name} ${healthText}`;
            } else {
                let ranks = playerManager.getTagsStartingWith(player, TagPrefixes.Rank);
                if(!ranks.length) {
                    if(playerManager.isAdmin(player)) {
                        ranks.push(configuration.modules.chatranks.defaultAdminRank)
                    } else {
                        ranks.push(configuration.modules.chatranks.defaultMemberRank)
                    }
                }
                player.nameTag = `§7[ §e${ranks.join(' §r§7] [ §r§e')} §r§7] §r§f${player.name}`;
            }
        }
    }
}
export const betterNametags = new BetterNametags();