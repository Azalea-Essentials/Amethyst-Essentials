import { MinecraftDimensionTypes, Player, world } from "@minecraft/server";
import LZString from "lib/lz-string";
type DecodedHomeString = {
    name: string,
    x: number,
    y: number,
    z: number
}
enum DeleteHomeResponse {
    NotFound = -1,
    Success = 0
};
enum SetHomeResponse {
    InvalidDimension = -2,
    LimitReached = -1,
    Success = 0
};
enum TpToHomeResponse {
    NotFound = -1,
    Success = 0
}
class HomeManager {
    homeLimit: number;
    constructor() {
        this.homeLimit = 3;
        this.load();
    }
    load() {
        let property = world.getDynamicProperty('.hlimit');
        if(property && typeof property == "number") this.homeLimit = property;
    }
    setHomeLimit(limit: number) {
        this.homeLimit = limit;
        world.setDynamicProperty('.hlimit', limit);
    }
    resetHomeLimit() {
        this.setHomeLimit(3);
    }
    decodeHomeString(str: string): DecodedHomeString[] {
        // EXAMPLE: (NAME;X;Y;Z),(NAME;X;Y;Z)
        // Name is encoded in base64
        let homesParsed:DecodedHomeString[] = [];
        let homes = str.split(',');
        for(const home of homes) {
            let homeData = home.substring(1).slice(0,-1).split(';');
            homesParsed.push({
                name: LZString.decompressFromBase64(homeData[0]),
                x: parseFloat(homeData[1]),
                y: parseFloat(homeData[1]),
                z: parseFloat(homeData[1])
            })
        }
        return homesParsed.filter(home => home.name ? true : false);
    }
    encodeHomeString(homes: DecodedHomeString[]) {
        let strArray = [];
        for(const home of homes.filter(home => home.name ? true : false)) {
            strArray.push(`(${LZString.compressToBase64(home.name)};${home.x};${home.y};${home.z})`);
        }
        return strArray.join(',')
    }
    getHomes(player: Player): DecodedHomeString[] {
        let homes = player.getDynamicProperty('homes');
        let homeStr = "";
        if(typeof homes == "string") homeStr = homes;

        let decoded = this.decodeHomeString(homeStr);
        return decoded;
    }
    setHome(player: Player, name: string) {
        // Stops players from setting homes in dimensions other than the overworld.
        if(player.dimension.id != MinecraftDimensionTypes.overworld) return SetHomeResponse.InvalidDimension;

        let decoded = this.getHomes(player);

        if(decoded.length >= this.homeLimit) return SetHomeResponse.LimitReached;

        decoded.push({
            name,
            x: player.location.x,
            y: player.location.y,
            z: player.location.z,
        });

        let encoded = this.encodeHomeString(decoded);
        player.setDynamicProperty('homes', encoded);

        return SetHomeResponse.Success;
    }
    deleteHome(player: Player, name: string) {
        let homes = this.getHomes(player);
        let homeIndex = homes.findIndex(home => home.name == name);
        if(homeIndex < 0) return DeleteHomeResponse.NotFound;
        homes.splice(homeIndex, 1);
        player.setDynamicProperty('homes', this.encodeHomeString(homes));
        return DeleteHomeResponse.Success;
    }
    tpToHome(player: Player, name: string) {
        let homes = this.getHomes(player);
        let home = homes.find(home => home.name == name);
        if(!home) return TpToHomeResponse.NotFound;
        player.teleport({
            x: home.x,
            y: home.y,
            z: home.z
        })
        return TpToHomeResponse.Success
    }
}

export const homes = new HomeManager();
export { TpToHomeResponse, SetHomeResponse, DeleteHomeResponse };