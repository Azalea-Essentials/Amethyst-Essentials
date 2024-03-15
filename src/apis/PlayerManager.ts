import { Player } from "@minecraft/server";
import { Database, DatabaseLegacy } from "./database";

type responseType = "ERROR" | "SUCCESS" | "WARNING" | "TEXT" | "WAIT" | "INFO"
type IconRank = "AZALEA" | "ADMIN" | "OWNER" | "BUILDER" | "HELPER" | "MOD" | "DEV" | "TRIALMOD" | "MEMBER"
enum ResponseTypes {
    Error = "ERROR",
    Success = "SUCCESS",
    Warning = "WARNING",
    PlainText = "TEXT",
    Wait = "WAIT",
    Info = "INFO",
}
enum TagPrefixes {
    Rank = "rank:",
    NameColor = "name-color:",
    BracketColor = "bracket-color:",
    MessageColor = "message-color:",
    IconRank = "icon-rank:"
}
type IconResponse = {
    icon: string,
    color: string
}
function cyrb128(str) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    h1 ^= (h2 ^ h3 ^ h4), h2 ^= h1, h3 ^= h1, h4 ^= h1;
    return [h1>>>0, h2>>>0, h3>>>0, h4>>>0];
}
function sfc32(a, b, c, d): any {
    return function() {
      a |= 0; b |= 0; c |= 0; d |= 0; 
      var t = (a + b | 0) + d | 0;
      d = d + 1 | 0;
      a = b ^ b >>> 9;
      b = c + (c << 3) | 0;
      c = (c << 21 | c >>> 11);
      c = c + t | 0;
      return (t >>> 0) / 4294967296;
    }
}
class PlayerManager {
    constructor() {
    }
    sendResponse(player: Player, type: responseType, text2: string) {
        player.playSound("note.pling")
        let text = "hewwo :3"
        switch(type) {
            case ResponseTypes.Error:
                player.sendMessage(`§l§cERROR §8» §r§7${text.replaceAll('{{ALT}}', '§o§c').replaceAll('{{RESET}}', '§r§7')}`)
                break;
            case ResponseTypes.Success:
                player.sendMessage(`§l§aSUCCESS §8» §r§7${text.replaceAll('{{ALT}}', '§o§a').replaceAll('{{RESET}}', '§r§7')}`)
                break;
            case ResponseTypes.PlainText:
                player.sendMessage(text)
                break;
            case ResponseTypes.Wait:
                player.sendMessage(`§l§dWAIT §8» §r§7${text.replaceAll('{{ALT}}', '§o§d').replaceAll('{{RESET}}', '§r§7')}`)
                break;
            case ResponseTypes.Warning:
                player.sendMessage(`§l§eWARNING §8» §r§7${text.replaceAll('{{ALT}}', '§o§e').replaceAll('{{RESET}}', '§r§7')}`)
                break;
            case ResponseTypes.Info:
                player.sendMessage(`§l§bINFO §8» §r§7${text.replaceAll('{{ALT}}', '§o§b').replaceAll('{{RESET}}', '§r§7')}`)
                break;
        }
    }
    getTagsStartingWith(player: Player, prefix: string): string[] {
        return player.getTags()
            .filter(tag=> tag.startsWith(prefix))
            .map(tag=> tag.substring(prefix.length))
    }
    getFirstTagStartingWith(player: Player, prefix: string): string | null {
        let tags = this.getTagsStartingWith(player, prefix);
        if(tags.length) return tags[0]
        else return null;
    }
    getIconRank(player: Player): string | null {
        return this.getFirstTagStartingWith(player, TagPrefixes.IconRank);
    }
    getIconRankIcon(rank: IconRank | string): IconResponse {
        // type IconRank = "AZALEA" | "ADMIN" | "OWNER" | "BUILDER" | "HELPER" | "MOD" | "DEV" | "TRIALMOD" | "MEMBER"
        let iconRankIDs = ["azalea", "admin", "owner", "builder", "helper", "mod", "dev", "trialmod", "member"];
        let icons = ["\uE300", "\uE302", "\uE303", "\uE304", "\uE305", "\uE306", "\uE307", "\uE308", "\uE309"];
        let iconColors = ["§d", "§b", "§5", "§a", "§6", "§c", "§b", "§9", "§7"]
        let index = iconRankIDs.findIndex(_=>_.toUpperCase() == rank.toUpperCase());
        if(index < 0) return {
            icon: "\uE309",
            color: "§7"
        };
        return {
            icon: icons[index],
            color: iconColors[index]
        }
    }
    getIconRankIconColor(player: Player, rank: IconRank | string): IconResponse {
        // type IconRank = "AZALEA" | "ADMIN" | "OWNER" | "BUILDER" | "HELPER" | "MOD" | "DEV" | "TRIALMOD" | "MEMBER"
        let iconRankIDs = ["azalea", "admin", "owner", "builder", "helper", "mod", "dev", "trialmod", "member"];
        let icons = ["\uE300", "\uE302", "\uE303", "\uE304", "\uE305", "\uE306", "\uE307", "\uE308", "\uE309"];
        let iconColors:any = {
            "gray": ["\uE300", "\uE302", "\uE303", "\uE304", "\uE305", "\uE306", "\uE307", "\uE308", "\uE309"],
            "green": ["\uE310", "\uE312", "\uE313", "\uE314", "\uE315", "\uE316", "\uE317", "\uE318", "\uE319"],
            "blue": ["\uE320", "\uE322", "\uE323", "\uE324", "\uE325", "\uE326", "\uE327", "\uE328", "\uE329"],
            "magenta": ["\uE330", "\uE332", "\uE333", "\uE334", "\uE335", "\uE336", "\uE337", "\uE338", "\uE339"],
            "red": ["\uE340", "\uE342", "\uE343", "\uE344", "\uE345", "\uE346", "\uE347", "\uE348", "\uE349"]
        };
        let nameColors = {
            "gray": "§7",
            "green": "§a",
            "blue": "§b",
            "magenta": "§d",
            "red": "§c"
        };
        let color = this.getFirstTagStartingWith(player, "rank-color:");
        let nameColor = color && nameColors[color] ? nameColors[color] : nameColors.gray;
        let iconColor = color && iconColors[color] ? iconColors[color] : iconColors.gray;
        // let colors = ["gray","green","blue","magenta","red"];
        // let iconColors = ["§d", "§b", "§5", "§a", "§6", "§c", "§b", "§9", "§7"]
        let index = iconRankIDs.findIndex(_=>_.toUpperCase() == rank.toUpperCase());
        if(index < 0) return {
            icon: iconColor[0],
            color: nameColor
        };
        return {
            icon: iconColor[index],
            color: nameColor
        }
    }
    setIconRank(player: Player, rank: IconRank) {
        let tags = this.getTagsStartingWith(player, TagPrefixes.IconRank);
        for(const tag of tags) {
            player.removeTag(tag);
        }
        player.addTag(`${TagPrefixes.IconRank}${rank.toLowerCase()}`);
    }
    isAdmin(player: Player) {
        return player.hasTag("admin") || player.isOp()
    }
    // The most questionable thing in this file
    isFurry(playerName: string) {
        if(playerName.toLowerCase().includes('owo')) return true;
        if(playerName.toLowerCase().includes('uwu')) return true;
        if(playerName.toLowerCase().includes('cat')) return true;
        // if(playerName == "ElainaKawaii941") return true;
        let nums = cyrb128(playerName);
        let num = Math.floor(sfc32(nums[0], nums[1], nums[2], nums[3])() * 4);
        let isFurry = num % 2 == 0 ? true : false;
        return isFurry;
    }
}
export { ResponseTypes, TagPrefixes };
export const playerManager = new PlayerManager();
