import { world, system } from '@minecraft/server';
import { commandManager } from './apis/CommandManager';
import './importer';
import config from 'uis/config';
import { chatranksModule } from 'modules/chatranks';
import { betterNametags } from 'modules/betterNametags';
import { chatOverrideInteraction } from 'apis/interactions/ChatOverrideInteraction';
system.runInterval(() => {
    betterNametags.call();
}, 20);
world.beforeEvents.chatSend.subscribe(msg => {
    let overrideInteraction = chatOverrideInteraction.chatOverrideRun(msg.sender, msg);
    if (overrideInteraction == true) {
        msg.cancel = true;
        return;
    }
    ;
    if (msg.message.startsWith('!')) {
        msg.cancel = true;
        commandManager.run(msg, "!");
    }
    else {
        if (chatranksModule.enabled)
            msg.cancel = true;
        chatranksModule.call(msg);
    }
});
world.beforeEvents.itemUse.subscribe(e => {
    if (e.itemStack.typeId == "azalea:config_ui") {
        system.run(() => {
            config.open(e.source);
        });
    }
});
