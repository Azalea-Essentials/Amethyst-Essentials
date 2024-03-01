import { world, ChatSendBeforeEvent, system } from '@minecraft/server';
import { commandManager } from './apis/CommandManager';
import { ResponseTypes, playerManager } from 'apis/PlayerManager';
import './importer';
import config from 'uis/config';
import { chatranksModule } from 'modules/chatranks';
import { betterNametags } from 'modules/betterNametags';
system.runInterval(()=>{
    betterNametags.call();
},20);
world.beforeEvents.chatSend.subscribe(msg=>{
    if(msg.message.startsWith('!')) {
        msg.cancel = true;
        commandManager.run(msg, "!")
    } else {
        if(chatranksModule.enabled) msg.cancel = true;
        chatranksModule.call(msg);
    }
})

world.beforeEvents.itemUse.subscribe(e=>{
    if(e.itemStack.typeId == "azalea:config_ui") {
        system.run(()=>{
            config.open(e.source);

        })
    }
})