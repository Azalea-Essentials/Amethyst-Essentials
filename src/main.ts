import { world, ChatSendBeforeEvent } from '@minecraft/server';
import { commandManager } from './CommandManager';
import { ResponseTypes, playerManager } from 'PlayerManager';

world.beforeEvents.chatSend.subscribe(msg=>{
    if(msg.message.startsWith('!')) {
        msg.cancel = true;
        commandManager.run(msg, "!")
    }
})