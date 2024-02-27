import { icons } from "data/icons";

class IconManager {
    isValidIcon(iconID: string): boolean {
        return icons.findIndex(icon=> icon.name == iconID) > -1;
    }
    getIconPathFromID(iconID: string): string | null {
        let iconData = icons.find(icon=> icon.name == iconID);
        if(!iconData) return null;
        return iconData.path;
    }
}

export const iconManager = new IconManager();