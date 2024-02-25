import { world, ChatSendBeforeEvent, system } from '@minecraft/server';
import { commandManager } from './apis/CommandManager';
import { ResponseTypes, playerManager } from 'apis/PlayerManager';
import './importer';
import config from 'uis/config';

world.beforeEvents.chatSend.subscribe(msg=>{
    if(msg.message.startsWith('!')) {
        msg.cancel = true;
        commandManager.run(msg, "!")
    }
})

world.beforeEvents.itemUse.subscribe(e=>{
    if(e.itemStack.typeId == "minecraft:stick") {
        system.run(()=>{
            config.open(e.source);

        })
    }
})