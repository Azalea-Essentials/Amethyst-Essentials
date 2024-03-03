import { Player } from "@minecraft/server"
import { permissions } from "apis/Permissions"
import { ModalFormData } from "@minecraft/server-ui";
import permissionEditRoot from "./permissionEditRoot";
import permissionsRoot from "./permissionsRoot";
type Response = {
    canceled: boolean,
    formValues: [string,boolean]
}
let permissionsCreateRole = {
    name: "AzaleaRewrite0.1/PermissionsRootCreateRole",
    open(player: Player) {
        let modal = new ModalFormData();
        modal.textField("Tag", "Tag required to get permissions");
        modal.toggle("Is admin");
        modal.show(player).then((res:Response)=>{
            if(res.canceled) return permissionsRoot.open(player);
            permissions.addRole(res.formValues[0], [], res.formValues[1]);
            permissionsRoot.open(player);
        })
    }
}

export default permissionsCreateRole;