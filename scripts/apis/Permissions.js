import { Database } from "./database";
class PermissionManager {
    constructor() {
        this.permissionsDB = new Database("Permissions");
        this.roles = [];
        this.initializePermissionSystem();
    }
    initializePermissionSystem() {
        let roles = this.permissionsDB.get("roles", []);
        if (!roles && !roles.length) {
            roles = [
                {
                    tag: "admin",
                    isAdmin: true,
                    permissions: []
                }
            ];
            this.permissionsDB.set("roles", roles);
        }
        this.roles = roles;
    }
    save() {
        this.permissionsDB.set("roles", this.roles);
    }
    addRole(tag, permissions, isAdmin) {
        let index = this.roles.findIndex(role => role.tag == tag);
        if (index >= 0) {
            this.roles.splice(index, 1);
        }
        this.roles.push({
            tag,
            permissions,
            isAdmin
        });
        this.save();
    }
    hasPermission(player, permission) {
        // TODO Add default role permissions.
        let permissions = [];
        for (const role of this.roles) {
            if (!player.hasTag(role.tag))
                continue;
            if (role.isAdmin)
                return true;
            for (const permission of role.permissions) {
                if (!permissions.includes(permission))
                    permissions.push(permission);
            }
        }
        return permissions.includes(permission);
    }
    deleteRole(tag) {
        let roleIndex = this.roles.findIndex(role => role.tag == tag);
        if (roleIndex < 0)
            return null;
        this.roles.splice(roleIndex, 1);
        this.save();
        return 1;
    }
}
export const permissions = new PermissionManager();
