import { world } from '@minecraft/server';
import { commandManager } from './CommandManager';
world.beforeEvents.chatSend.subscribe(msg => {
    if (msg.message.startsWith('!')) {
        msg.cancel = true;
        commandManager.run(msg, "!");
    }
});
