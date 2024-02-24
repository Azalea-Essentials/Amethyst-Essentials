var ResponseTypes;
(function (ResponseTypes) {
    ResponseTypes["Error"] = "ERROR";
    ResponseTypes["Success"] = "SUCCESS";
    ResponseTypes["Warning"] = "WARNING";
    ResponseTypes["PlainText"] = "TEXT";
    ResponseTypes["Wait"] = "WAIT";
    ResponseTypes["Info"] = "INFO";
})(ResponseTypes || (ResponseTypes = {}));
class PlayerManager {
    sendResponse(player, type, text) {
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
}
export { ResponseTypes };
export const playerManager = new PlayerManager();
