"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopService = void 0;
const common_1 = require("@nestjs/common");
const basket_service_1 = require("../basket/basket.service");
const shop_item_entity_1 = require("./shop-item.entity");
const typeorm_1 = require("typeorm");
let ShopService = exports.ShopService = class ShopService {
    constructor(basketService, dataSource) {
        this.basketService = basketService;
        this.dataSource = dataSource;
    }
    async getProducts(pageNumber = 1) {
        const maxPerPage = 3;
        const currentPage = pageNumber;
        const [items, count] = await shop_item_entity_1.ShopItem.findAndCount({
            skip: maxPerPage * (currentPage - 1),
            take: maxPerPage,
        });
        const pagesCount = Math.ceil(count / maxPerPage);
        console.log(pagesCount);
        return { items, pagesCount };
    }
    async hasProduct(name) {
        return (await this.getProducts()).items.some((item) => item.name === name);
    }
    async getPriceOfProduct(name) {
        return (await this.getProducts()).items.find((item) => item.name === name)
            .price;
    }
    async getOneProduct(id) {
        return shop_item_entity_1.ShopItem.findOneOrFail({ where: { id } });
    }
    async removeProduct(id) {
        await shop_item_entity_1.ShopItem.delete(id);
    }
    async createDummyProduct() {
        const newItem = new shop_item_entity_1.ShopItem();
        newItem.price = 100;
        newItem.name = 'Duży ogórek';
        newItem.description = 'naprawdę duży ogórek';
        await newItem.save();
        return newItem;
    }
    async addBoughtCounter(id) {
        console.log(id);
        await shop_item_entity_1.ShopItem.update({ id }, { wasEverBought: true });
        const item = await shop_item_entity_1.ShopItem.findOneOrFail({ where: { id } });
        item.boughtCounter++;
        await item.save();
    }
    async findProducts(searchTerm) {
        const { count } = await this.dataSource
            .createQueryBuilder()
            .select('COUNT(shopItem.id)', 'count')
            .from(shop_item_entity_1.ShopItem, 'shopItem')
            .getRawOne();
        console.log({ count });
        return await this.dataSource
            .createQueryBuilder()
            .select('shopItem')
            .from(shop_item_entity_1.ShopItem, 'shopItem')
            .where('shopItem.description LIKE :searchTerm', {
            searchTerm: `${searchTerm}`,
        })
            .orderBy('shopItem.id', 'ASC')
            .getMany();
    }
};
exports.ShopService = ShopService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => basket_service_1.BasketService))),
    __metadata("design:paramtypes", [basket_service_1.BasketService,
        typeorm_1.DataSource])
], ShopService);
//# sourceMappingURL=shop.service.js.map