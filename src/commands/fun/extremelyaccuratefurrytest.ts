import { ChatSendBeforeEvent, Player, world } from "@minecraft/server";
import { commandManager } from "../../apis/CommandManager";
import { ResponseTypes, playerManager } from "apis/PlayerManager";
import { chatranksModule } from "modules/chatranks";
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
let commandName = "furrytest";

commandManager.register(commandName, {
    admin: true,
    author: "TRASH",
    category: "Commands to make people hate you",
    description: "lmfao",
    tags: ["SPEAKAS", "TROLLING"],
    private: false,
    callback(msg: ChatSendBeforeEvent, args: string[]) {
        let player:Player;
        for(const player2 of world.getPlayers()) {
            if(player2.name.toLocaleLowerCase() == args.join(' ').toLowerCase()) player = player2;
        }
        if(!player) return;
        let nums = cyrb128(player.name);
        let sum = 0;
        for(const num of nums) {
            sum++;
        }
        let num = Math.floor(sfc32(nums[0], nums[1], nums[2], nums[3])() * 4);
        // msg.sender.sendMessage(`${num}`)
        let isFurry = num % 2 == 0 ? true : false;
        playerManager.sendResponse(msg.sender, ResponseTypes.Success, isFurry ? `${player.name} §ais{{RESET}} a furry!` : `${player.name} §cIS NOT {{RESET}}a furry`)
        
    }
});