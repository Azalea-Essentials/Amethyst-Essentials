type Permission = {
    display: string;
    id: string;
}
let permissionList:Permission[] = [
    {
        id: "adminpanel.open",
        display: "Open Admin Panel"
    },
    {
        id: "permissions.edit",
        display: "Edit Permissions"
    },
    {
        id: "chestguis.edit",
        display: "Edit Chest GUIs"
    }
]
export default permissionList;