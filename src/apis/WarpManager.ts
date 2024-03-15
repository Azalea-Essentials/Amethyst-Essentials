import { Player, Vector2, Vector3, world } from "@minecraft/server";
import { Database } from "./database";

type Warp = {
    tag: string;
    name: string;
    coords: Vector3;
    rotation?: Vector2;
    dimension: string;
}
class WarpManager {
    private readonly warpsDb: Database;
    warps: Warp[];
    constructor() {
        this.warpsDb = new Database("Warps");
        this.warps = [];
        this.load();
    }
    load() {
        this.warps = this.warpsDb.get("list");
    }
    save() {
        this.warpsDb.set("list", this.warps);
    }
    createWarp(data: Warp) {
        let index = this.warps.findIndex(warp => warp.name.toLowerCase() == data.name.toLowerCase())
        if(index >= 0) {
            this.warps.splice(index, 1);
        }
        this.warps.push(data);
        this.save();
    }
    getWarp(name: string): Warp {
        return this.warps.find(warp => warp.name.toLowerCase() == name.toLowerCase())
    }
    teleport(player: Player, name: string) {
        let warp = this.getWarp(name);
        if(!warp) return;

        player.teleport(warp.coords, {
            "dimension": world.getDimension(warp.dimension),
            "rotation": warp.rotation ?? undefined
        })
    }

    createAtPlayer(player: Player, name: string, persistRotation: boolean = false) {
        this.createWarp({
            coords: player.location,
            rotation: persistRotation ? player.getRotation() : undefined,
            name,
            tag: "",
            dimension: player.dimension.id
        });
    }
}
export const warps = new WarpManager();