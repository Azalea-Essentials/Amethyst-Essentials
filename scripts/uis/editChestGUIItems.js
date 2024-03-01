import { chestguis } from "apis/ChestGUIMaker";
import { iconManager } from "apis/IconManager";
import { ChestFormData } from "chest/forms";
import addChestGUIItem from "./addChestGUIItem";
import root from "./chestGUIEditorRoot";
export default {
    name: "AzaleaRewrite0.1/ChestGUIs/Edit",
    open(player, id) {
        let chest = chestguis.getByID(id);
        let chestForm = new ChestFormData("single");
        chestForm.title(chest.title);
        // Fill all slots with an add icon button.
        for (let i = 0; i < chest.rows * 9; i++) {
            chestForm.button(i, "§l§eAdd Icon", ["Adds an icon to the gui"], "textures/blocks/glass_lime", 1);
        }
        // Will overwrite all other icons
        for (const icon of chest.icons) {
            chestForm.button(chestguis.convertRowAndColumnToSlot({ row: icon.row, col: icon.column }), icon.name, icon.lore ? icon.lore : [], iconManager.getIconPathFromID(icon.iconID), icon.amount, false);
        }
        chestForm.show(player).then(res => {
            if (res.canceled)
                root.open(player);
            let rowcol = chestguis.convertSlotToRowColumn(res.selection);
            let iconIndex = chest.icons.findIndex(icon => icon.row == rowcol.row && icon.column == rowcol.col);
            if (iconIndex >= 0) {
            }
            else {
                addChestGUIItem.open(player, {
                    chestGUIId: chest.id,
                    openType: 0,
                    defaultRow: rowcol.row,
                    defaultColumn: rowcol.col
                });
            }
        });
    }
};
