type PermissionList = {
    permissionID: string,
    display: string,
    note?: string,
    numberID: number
}
let list:PermissionList[] = [
    {
        permissionID: "configui.open",
        display: "Open Config UI",
        note: "This just allows the player to open the base Config UI. Extra Config UI features will need to be enabled separately",
        numberID: 0
    }
]
export default list;