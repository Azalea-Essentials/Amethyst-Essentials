import { ModalFormData } from "@minecraft/server-ui";
import { chestguis } from "apis/ChestGUIMaker";
import { iconManager } from "apis/IconManager";
import root from "./chestGUIEditorRoot";
let ui = {
    name: "AddChestGUIItem",
    open(player, options) {
        let chest = chestguis.getByID(options.chestGUIId);
        let modal = new ModalFormData();
        modal.title(options.openType == 1 ? "Edit Item" : "Add Item");
        modal.textField(`Icon ID§c*${options.error ? `\n§c${options.error}` : ""}`, `Icon ID`, options.openType == 1 ?
            chest.icons[options.itemIndex].iconID :
            options.defaultIconID ? options.defaultIconID : undefined);
        modal.textField(`Item Name§c*${options.error ? `\n§c${options.error}` : ""}`, `Name`, options.openType == 1 ?
            chest.icons[options.itemIndex].name :
            options.defaultItemName ? options.defaultItemName : undefined);
        modal.textField(`Item Lore${options.error ? `\n§c${options.error}` : ""}`, `Lore (Example: line1,line2)`, options.openType == 1 ?
            chest.icons[options.itemIndex].lore.join(',') :
            options.defaultItemLore ? options.defaultItemLore.join(',') : undefined);
        modal.textField(`Item Command${options.error ? `\n§c${options.error}` : ""}`, `/say Otf5shotzz is a furry`, options.openType == 1 ?
            chest.icons[options.itemIndex].command :
            options.defaultCommand ? options.defaultCommand : undefined);
        modal.slider("Amount", 1, 64, 1, options.openType == 1 ?
            chest.icons[options.itemIndex].amount :
            options.defaultAmount ? options.defaultAmount : undefined);
        modal.slider("Row", 1, chest.rows, 1, options.openType == 1 ?
            chest.icons[options.itemIndex].row :
            options.defaultRow ? options.defaultRow : undefined);
        modal.slider("Column", 1, chest.rows < 1 ? 5 : 9, 1, options.openType == 1 ?
            chest.icons[options.itemIndex].column :
            options.defaultColumn ? options.defaultColumn : undefined);
        modal.show(player).then(res => {
            if (res.canceled)
                return root.open(player);
            let errors = [];
            if (!res.formValues[0])
                errors.push("No Icon ID defined!");
            // @ts-ignore
            if (!iconManager.isValidIcon(res.formValues[0]))
                errors.push("Invalid Icon");
            if (!res.formValues[1])
                errors.push("No Name Defined");
            if (!res.formValues[3])
                errors.push("Please define command");
            if (options.openType != 1 && chest.icons.find(_ => _.row == res.formValues[3] && _.column == res.formValues[4]))
                errors.push("Icon Already Exists In Slot");
            if (errors.length) {
                ui.open(player, {
                    ...options,
                    error: errors.join(', ')
                });
            }
            if (options.openType != 1) {
                // addItemResponse.
                chestguis.addItemToChestGUI(chest.id, {
                    // @ts-ignore
                    iconID: res.formValues[0],
                    // @ts-ignore
                    name: res.formValues[1],
                    // @ts-ignore
                    lore: res.formValues[2].split(',').map(_ => _.trim()),
                    // @ts-ignore
                    amount: res.formValues[3],
                    // @ts-ignore
                    row: res.formValues[4],
                    // @ts-ignore
                    column: res.formValues[5],
                });
                root.open(player);
            }
            else {
                chestguis.replaceItemInChestGUI(options.itemIndex, chest.id, {
                    // @ts-ignore
                    iconID: res.formValues[0],
                    // @ts-ignore
                    name: res.formValues[1],
                    // @ts-ignore
                    lore: res.formValues[2].split(',').map(_ => _.trim()),
                    // @ts-ignore
                    amount: res.formValues[4],
                    // @ts-ignore
                    row: res.formValues[5],
                    // @ts-ignore
                    column: res.formValues[6],
                    // @ts-ignore
                    command: res.formValues[3]
                });
                root.open(player);
            }
        });
    }
};
export default ui;
