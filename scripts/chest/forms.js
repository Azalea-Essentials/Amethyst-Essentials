var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ChestFormData_titleText, _ChestFormData_buttonArray;
import { ActionFormData } from '@minecraft/server-ui';
import { typeIdToDataId, typeIdToID } from "./typeIDs";
const number_of_1_16_100_items = 0;
const sizes = new Map([
    ['single', ['§c§h§e§s§t§2§7§r', 27]], ['small', ['§c§h§e§s§t§2§7§r', 27]],
    ['double', ['§c§h§e§s§t§5§4§r', 54]], ['large', ['§c§h§e§s§t§5§4§r', 54]],
    ['5', ['§c§h§e§s§t§0§5§r', 5]],
    ['9', ['§c§h§e§s§t§0§9§r', 9]],
    ['18', ['§c§h§e§s§t§1§8§r', 18]],
    ['27', ['§c§h§e§s§t§2§7§r', 27]],
    ['36', ['§c§h§e§s§t§3§6§r', 36]],
    ['45', ['§c§h§e§s§t§4§5§r', 45]],
    ['54', ['§c§h§e§s§t§5§4§r', 54]]
]);
class ChestFormData {
    constructor(size = 'small') {
        _ChestFormData_titleText.set(this, void 0);
        _ChestFormData_buttonArray.set(this, void 0);
        const sizing = sizes.get(size) ?? ['§c§h§e§s§t§2§7§r', 27];
        /** @internal */
        __classPrivateFieldSet(this, _ChestFormData_titleText, sizing[0], "f");
        /** @internal */
        __classPrivateFieldSet(this, _ChestFormData_buttonArray, [], "f");
        // @ts-ignore
        for (let i = 0; i < sizing[1]; i++)
            __classPrivateFieldGet(this, _ChestFormData_buttonArray, "f").push(['', undefined]);
        // @ts-ignore
        this.slotCount = sizing[1];
    }
    title(text) {
        __classPrivateFieldSet(this, _ChestFormData_titleText, __classPrivateFieldGet(this, _ChestFormData_titleText, "f") + text, "f");
        return this;
    }
    button(slot, itemName, itemDesc, texture, stackSize = 1, enchanted = false) {
        const ID = typeIdToDataId.get(texture) ?? typeIdToID.get(texture);
        __classPrivateFieldGet(this, _ChestFormData_buttonArray, "f").splice(slot, 1, [`stack#${Math.min(Math.max(stackSize, 1) || 1, 99).toString().padStart(2, '0')}§r${itemName ?? ''}§r${itemDesc?.length ? `\n§r${itemDesc.join('\n§r')}` : ''}`,
            // @ts-ignore
            (((ID + (ID < 256 ? 0 : number_of_1_16_100_items)) * 65536) + (!!enchanted * 32768)) || texture
        ]);
        return this;
    }
    pattern(pattern, key) {
        for (let i = 0; i < pattern.length; i++) {
            const row = pattern[i];
            for (let j = 0; j < row.length; j++) {
                const letter = row.charAt(j);
                if (key[letter]) {
                    const slot = j + i * 9;
                    const data = key[letter];
                    const ID = typeIdToDataId.get(data.texture) ?? typeIdToID.get(data.texture);
                    __classPrivateFieldGet(this, _ChestFormData_buttonArray, "f").splice(slot, 1, [`stack#${Math.min(Math.max(data?.stackAmount ?? 1, 1) || 1, 99).toString().padStart(2, '0')}§r${data?.itemName ?? ''}§r${data?.itemDesc?.length ? `\n§r${data?.itemDesc.join('\n§r')}` : ''}`,
                        // @ts-ignore
                        (((ID + (ID < 256 ? 0 : number_of_1_16_100_items)) * 65536) + (!!data?.enchanted * 32768)) || data.texture
                    ]);
                }
            }
        }
        return this;
    }
    show(player) {
        const form = new ActionFormData()
            .title(__classPrivateFieldGet(this, _ChestFormData_titleText, "f"));
        __classPrivateFieldGet(this, _ChestFormData_buttonArray, "f").forEach(button => {
            form.button(button[0], button[1]?.toString());
        });
        return form.show(player);
    }
}
_ChestFormData_titleText = new WeakMap(), _ChestFormData_buttonArray = new WeakMap();
export { ChestFormData };
