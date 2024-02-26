import { icons } from "data/icons";
class IconManager {
    isValidIcon(iconID) {
        return icons.findIndex(icon => icon.name == iconID) > -1;
    }
    getIconPathFromID(iconID) {
        let iconData = icons.find(icon => icon.name == iconID);
        if (!iconData)
            return null;
        return iconData.path;
    }
}
export const iconManager = new IconManager();
