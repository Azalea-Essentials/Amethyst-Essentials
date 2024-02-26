var ResponseTypes;
(function (ResponseTypes) {
    ResponseTypes["Error"] = "ERROR";
    ResponseTypes["Success"] = "SUCCESS";
    ResponseTypes["Warning"] = "WARNING";
    ResponseTypes["PlainText"] = "TEXT";
    ResponseTypes["Wait"] = "WAIT";
    ResponseTypes["Info"] = "INFO";
})(ResponseTypes || (ResponseTypes = {}));
var TagPrefixes;
(function (TagPrefixes) {
    TagPrefixes["Rank"] = "rank:";
    TagPrefixes["NameColor"] = "name-color:";
    TagPrefixes["BracketColor"] = "bracket-color:";
    TagPrefixes["MessageColor"] = "message-color:";
    TagPrefixes["IconRank"] = "icon-rank:";
})(TagPrefixes || (TagPrefixes = {}));
class PlayerManager {
    sendResponse(player, type, text) {
        player.playSound("note.pling");
        switch (type) {
            case ResponseTypes.Error:
                player.sendMessage(`§l§cERROR §8» §r§7${text.replaceAll('{{ALT}}', '§o§c').replaceAll('{{RESET}}', '§r§7')}`);
                break;
            case ResponseTypes.Success:
                player.sendMessage(`§l§aSUCCESS §8» §r§7${text.replaceAll('{{ALT}}', '§o§a').replaceAll('{{RESET}}', '§r§7')}`);
                break;
            case ResponseTypes.PlainText:
                player.sendMessage(text);
                break;
            case ResponseTypes.Wait:
                player.sendMessage(`§l§dWAIT §8» §r§7${text.replaceAll('{{ALT}}', '§o§d').replaceAll('{{RESET}}', '§r§7')}`);
                break;
            case ResponseTypes.Warning:
                player.sendMessage(`§l§eWARNING §8» §r§7${text.replaceAll('{{ALT}}', '§o§e').replaceAll('{{RESET}}', '§r§7')}`);
                break;
            case ResponseTypes.Info:
                player.sendMessage(`§l§bINFO §8» §r§7${text.replaceAll('{{ALT}}', '§o§b').replaceAll('{{RESET}}', '§r§7')}`);
                break;
        }
    }
    getTagsStartingWith(player, prefix) {
        return player.getTags()
            .filter(tag => tag.startsWith(prefix))
            .map(tag => tag.substring(prefix.length));
    }
    getFirstTagStartingWith(player, prefix) {
        let tags = this.getTagsStartingWith(player, prefix);
        if (tags.length)
            return tags[0];
        else
            return null;
    }
    getIconRank(player) {
        return this.getFirstTagStartingWith(player, TagPrefixes.IconRank);
    }
    getIconRankIcon(rank) {
        // type IconRank = "AZALEA" | "ADMIN" | "OWNER" | "BUILDER" | "HELPER" | "MOD" | "DEV" | "TRIALMOD" | "MEMBER"
        let iconRankIDs = ["azalea", "admin", "owner", "builder", "helper", "mod", "dev", "trialmod", "member"];
        let icons = ["\uE300", "\uE302", "\uE303", "\uE304", "\uE305", "\uE306", "\uE307", "\uE308", "\uE309"];
        let iconColors = ["§d", "§b", "§5", "§a", "§6", "§c", "§b", "§9", "§7"];
        let index = iconRankIDs.findIndex(_ => _.toUpperCase() == rank.toUpperCase());
        if (index < 0)
            return {
                icon: "\uE309",
                color: "§7"
            };
        return {
            icon: icons[index],
            color: iconColors[index]
        };
    }
    setIconRank(player, rank) {
        let tags = this.getTagsStartingWith(player, TagPrefixes.IconRank);
        for (const tag of tags) {
            player.removeTag(tag);
        }
        player.addTag(`${TagPrefixes.IconRank}${rank.toLowerCase()}`);
    }
    isAdmin(player) {
        return player.hasTag("admin") || player.isOp();
    }
}
export { ResponseTypes, TagPrefixes };
export const playerManager = new PlayerManager();
