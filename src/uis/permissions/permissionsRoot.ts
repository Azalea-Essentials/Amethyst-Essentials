import { Player } from "@minecraft/server"
import { permissions } from "apis/Permissions"
import { ActionFormData } from "@minecraft/server-ui";
import permissionEditRoot from "./permissionEditRoot";
import permissionsCreateRole from "./permissionsCreateRole";
import config from "uis/config";

let permissionsRoot = {
    name: "AzaleaRewrite0.1/PermissionsRoot",
    open(player: Player) {
        let actionForm = new ActionFormData();
        actionForm.button("§eNew Role\n§7Creates a new role");
        actionForm.title("Permissions")
        for(const role of permissions.roles) {
            actionForm.button(`§a${role.tag}§r§7${role.isAdmin ? "\n§7Admin Role" : "\n§7Non-Admin Role"}`);
        }
        actionForm.show(player).then(res=>{
            if(res.canceled) return config.open(player);
            if(res.selection == 0) {
                permissionsCreateRole.open(player);
            } else {
                let index = res.selection - 1;
                let role = permissions.roles[index];
                if(role.tag == "admin") {
                    let noEditAdminMessage = new ActionFormData();
                    noEditAdminMessage.title("Not Allowed");
                    noEditAdminMessage.body("You are not allowed to edit this role right now because it is a special role.")
                    noEditAdminMessage.button("§bBack");
                    noEditAdminMessage.show(player).then(res=>{
                        permissionsRoot.open(player);
                    })
                    return;
                }
                permissionEditRoot.open(player, role.tag);
            }
        })
    }
}

export default permissionsRoot;