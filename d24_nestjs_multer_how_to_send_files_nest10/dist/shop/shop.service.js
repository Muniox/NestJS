"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopService = void 0;
const common_1 = require("@nestjs/common");
const shop_item_entity_1 = require("./shop-item.entity");
const fs = require("fs");
const path = require("path");
const storage_1 = require("../utils/storage");
let ShopService = exports.ShopService = class ShopService {
    filter(shopItem) {
        const { id, price, name, description } = shopItem;
        return { id, price, name, description };
    }
    async getItems() {
        return (await shop_item_entity_1.ShopItem.find()).map(this.filter);
    }
    async hasItem(name) {
        return (await this.getItems()).some((item) => item.name === name);
    }
    async getPrice(name) {
        return (await this.getItems()).find((item) => item.name === name).price;
    }
    async getOneItem(id) {
        return await shop_item_entity_1.ShopItem.findOneBy({ id });
    }
    async addProduct(req, files) {
        const photo = files?.photo?.[0] ?? null;
        try {
            console.log({ photo });
            const shopItem = new shop_item_entity_1.ShopItem();
            shopItem.name = req.name;
            shopItem.description = req.description;
            shopItem.price = req.price;
            if (photo) {
                shopItem.photoFn = photo.filename;
            }
            await shopItem.save();
            return this.filter(shopItem);
        }
        catch (e) {
            try {
                if (photo) {
                    fs.unlinkSync(path.join((0, storage_1.storageDir)(), 'product-photos', photo.filename));
                }
            }
            catch (e2) { }
            throw e;
        }
    }
    async getPhoto(id, res) {
        try {
            const one = await shop_item_entity_1.ShopItem.findOne({ where: { id } });
            if (!one) {
                throw new Error('No object found!');
            }
            if (!one.photoFn) {
                throw new Error('No photo in this entity');
            }
            res.sendFile(one.photoFn, {
                root: path.join((0, storage_1.storageDir)(), 'profuct-photos/'),
            });
        }
        catch (e) {
            res.json({ error: e.message });
        }
    }
};
exports.ShopService = ShopService = __decorate([
    (0, common_1.Injectable)()
], ShopService);
//# sourceMappingURL=shop.service.js.map