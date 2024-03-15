import { ChatSendBeforeEvent, Player } from "@minecraft/server";
import { commandManager } from "apis/CommandManager";
import { DeleteHomeResponse, SetHomeResponse, TpToHomeResponse, homes } from "apis/HomeManager";
import { permissions } from "apis/Permissions";
import { ResponseTypes, playerManager } from "apis/PlayerManager";
commandManager.register("homes", {
    admin: false,
    author: "TRASH",
    category: "Warps",
    description: "Homes!",
    private: false,
    tags: ["HOMES", "WARPS"],
    callback(msg: ChatSendBeforeEvent, args: string[]) {
        if(!permissions.hasPermission(msg.sender, "homes.tp"))
            return playerManager.sendResponse(msg.sender, ResponseTypes.Error, "You need the homes permission to use this command!")
        playerManager.sendResponse(msg.sender, ResponseTypes.Info, "Do {{ALT}}!home set <name>{{RESET}} to set a home, {{ALT}}!home delete <name>{{RESET}} to delete a home, and {{ALT}}!home tp <name>{{RESET}} to teleport to a home.");
        playerManager.sendResponse(msg.sender, ResponseTypes.Info, "Do {{ALT}}!home list{{RESET}} to view your homes.");
    }
})
commandManager.registerSubcommand("homes", "set", (msg: ChatSendBeforeEvent, args: string[])=>{
    let name = args.length ? args.join(' ') : "default";
    let response = homes.setHome(msg.sender, name);

    if(response == SetHomeResponse.Success) playerManager.sendResponse(msg.sender, ResponseTypes.Success, "Successfully set home!")
    else if(response == SetHomeResponse.LimitReached) playerManager.sendResponse(msg.sender, ResponseTypes.Error, `You have reached your limit of {{ALT}}${homes.homeLimit}{{RESET}} homes!`);
    else if(response == SetHomeResponse.InvalidDimension) playerManager.sendResponse(msg.sender, ResponseTypes.Error, `You must be in the overworld to set a home!`);
})
commandManager.registerSubcommand("homes", "delete", (msg: ChatSendBeforeEvent, args: string[])=>{
    let name = args.length ? args.join(' ') : "default";
    let response = homes.deleteHome(msg.sender, name);

    if(response == DeleteHomeResponse.Success) playerManager.sendResponse(msg.sender, ResponseTypes.Success, "Successfully deleted home!")
    else if(response == DeleteHomeResponse.NotFound) playerManager.sendResponse(msg.sender, ResponseTypes.Error, `Home not found!`);
})
commandManager.registerSubcommand("homes", "tp", (msg: ChatSendBeforeEvent, args: string[])=>{
    let name = args.length ? args.join(' ') : "default";
    let response = homes.tpToHome(msg.sender, name);

    if(response == TpToHomeResponse.Success) playerManager.sendResponse(msg.sender, ResponseTypes.Success, "Successfully teleported to home!")
    else if(response == TpToHomeResponse.NotFound) playerManager.sendResponse(msg.sender, ResponseTypes.Error, `Home not found!`);
})
commandManager.registerSubcommand("homes", "list", (msg: ChatSendBeforeEvent, args: string[])=>{
    let homesList = homes.getHomes(msg.sender);
    let text = [];
    text.push(`§8-------§7>§8- §5My Homes §8-§7<§8-------`)
    if(homesList.length) {
        for(const home of homesList) {
            text.push(`§d${home.name} §7§o(${Math.floor(home.x)}, ${Math.floor(home.y)}, ${Math.floor(home.z)})`)
        }
    } else {
        text.push(`§c§oYou have no homes...`);
    }
    playerManager.sendResponse(msg.sender, ResponseTypes.PlainText, text.join('\n§r'))
})