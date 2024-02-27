import { ModalFormData } from "@minecraft/server-ui";
import { chestguis, makeChestGUI } from "apis/ChestGUIMaker";
import chestGUIEditorRoot from "./chestGUIEditorRoot";
let create = {
    name: "AzaleaRewrite0.1/ChestGUIs/Create",
    open(player, error) {
        let modal = new ModalFormData();
        modal.title("Create Chest GUI");
        modal.slider("Rows", 1, 6, 1, 3);
        modal.toggle("Hopper Mode?", false);
        modal.textField("Title§c*", "UI Title (Required)");
        modal.textField("Tag§c*", "UI Tag (Required)");
        modal.textField("Exit Message", "Sends a message when the player exits");
        modal.dropdown(`Theme${error ? `\n§c${error}` : ``}`, [
            "Default",
            "Ocean",
            "Nether",
            "Why",
            "Green",
            "Blue"
        ], 0);
        modal.show(player).then((res) => {
            if (res.canceled)
                return chestGUIEditorRoot.open(player);
            let response = chestguis.makeChestGUI({
                rows: res.formValues[1] ? 5 / 9 : res.formValues[0],
                exitMessage: res.formValues[4],
                icons: [],
                id: Date.now(),
                tag: res.formValues[3],
                title: res.formValues[2],
                theme: res.formValues[5]
            });
            if (response == makeChestGUI.AdminTagNotAllowed)
                return create.open(player, "Admin tag is not allowed!");
            if (response == makeChestGUI.DuplicateGUI)
                return create.open(player, "Duplicate GUI");
            chestGUIEditorRoot.open(player);
        });
    }
};
export default create;
