import { Player } from "@minecraft/server"
import { permissions } from "apis/Permissions"
import { ActionFormData } from "@minecraft/server-ui";
import permissionEditPerms from "./permissionEditPerms";
import permissionsRoot from "./permissionsRoot";

let permissionEditRoot = {
    name: "AzaleaRewrite0.1/PermissionEditRoot",
    open(player: Player, roleTag: string) {
        let role = permissions.roles.find(_=>_.tag == roleTag);
        if(!role) return;
        let canDelete = roleTag == "admin" || roleTag == "default" ? false : true;
        // let canDelete = true;
        let actionForm = new ActionFormData();
        actionForm.title(`Edit role: ${role.tag}`)
        if(canDelete) actionForm.button("§cDelete\n§7Deletes the role");
        actionForm.button("§dEdit Permissions\n§7Edit Role Permissions");
        actionForm.show(player).then(res=>{
            if(res.canceled) return permissionsRoot.open(player);
            let deleteButtonIndex = 0;
            let editButtonIndex = canDelete ? 1 : 0;
            if(canDelete && res.selection == deleteButtonIndex) {
                // Delete
                permissions.deleteRole(roleTag);
                permissionsRoot.open(player);
            } else if(res.selection == editButtonIndex) {
                // Edit
                permissionEditPerms.open(player, roleTag)
            }
        })
    }
}

export default permissionEditRoot;