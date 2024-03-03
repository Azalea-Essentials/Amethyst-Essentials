import { Player } from "@minecraft/server"
import { permissions } from "apis/Permissions"
import { ModalFormData } from "@minecraft/server-ui";
import permissionList from "data/permissionList";
import permissionEditRoot from "./permissionEditRoot";

let permissionEditPerms = {
    name: "AzaleaRewrite0.1/PermissionEditPerms",
    open(player: Player, roleTag: string) {
        let role = permissions.roles.find(_=>_.tag == roleTag);
        if(!role) return;
        let modalForm = new ModalFormData();
        for(const permission of permissionList) {
            modalForm.toggle(permission.display, role.isAdmin ? true : role.permissions.includes(permission.id));
        }
        modalForm.show(player).then(res=>{
            if(res.canceled) return permissionEditRoot.open(player, roleTag)
            let isAdmin = false;
            if(res.formValues.every(value=>value==true?true:false)) isAdmin = true;
            let permissionListNew = [];
            for(let i = 0;i < res.formValues.length;i++) {
                let value = res.formValues[i];
                if(value == true) permissionListNew.push(permissionList[i].id);
            }
            permissions.setRolePermission(roleTag, isAdmin, isAdmin ? role.permissions : permissionListNew);
        })
    }
}

export default permissionEditPerms;