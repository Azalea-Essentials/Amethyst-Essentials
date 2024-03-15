import { Database } from "apis/database"

// just decided to reuse the same code for player shops and admin shops
type ShopItem = {
    type: number,
    itemID?: string,
    categoryReference: number,
    addedBy: number
}
type ShopData = {
    category: string,
    categoryID: number,
    items: ShopItem[],
}
type Review = {
    rating: number,
    moreInfo: string
}
type Shop = {
    name: string,
    title?: string,
    body?: string,
    isFeatured: boolean,
    data: ShopData[],
    reputation: number,
    reviews: Review[],
    owner?: number,
    id?: number
}
class ShopManager {
    private readonly db: Database;
    shops: Shop[];
    constructor() {
        this.db = new Database("Shops");
        this.shops = [];
        this.load();
    }
    load() {
        this.shops = this.db.get("shops", []);
    }
    save() {
        this.db.set("shops", this.shops);
    }
    createShop(data: Shop) {
        this.shops.push(data);
        this.save();
    }
    createShopCategory(id: number, category: ShopData) {
        let shopIndex = this.shops.findIndex(_=>_.id == id);
        if(shopIndex < 0) return;
        this.shops[shopIndex].data.push(category);
    }
}