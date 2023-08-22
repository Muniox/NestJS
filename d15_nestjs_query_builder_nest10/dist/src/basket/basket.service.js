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
exports.BasketService = void 0;
const common_1 = require("@nestjs/common");
const shop_service_1 = require("../shop/shop.service");
let BasketService = exports.BasketService = class BasketService {
    constructor(shopService) {
        this.shopService = shopService;
        this.items = [];
    }
    add(item) {
        const { count, name, id } = item;
        if (typeof name !== 'string' ||
            typeof count !== 'number' ||
            name === '' ||
            count < 1 ||
            !this.shopService.hasProduct(name)) {
            return {
                isSuccess: false,
            };
        }
        this.items.push(item);
        this.shopService.addBoughtCounter(id);
        return {
            isSuccess: true,
            index: this.items.indexOf(item),
        };
    }
    remove(index) {
        const { items } = this;
        if (index < 0 || index >= items.length) {
            return {
                isSuccess: false,
            };
        }
        items.splice(index, 1);
        return {
            isSuccess: true,
        };
    }
    list() {
        return this.items;
    }
    async getTotalPrice() {
        if (!this.items.every((item) => this.shopService.hasProduct(item.name))) {
            return {
                isSuccess: false,
                alternativeBasket: this.items.filter((item) => this.shopService.hasProduct(item.name)),
            };
        }
        return (await Promise.all(this.items.map(async (item) => (await this.shopService.getPriceOfProduct(item.name)) *
            item.count *
            1.23))).reduce((prev, curr) => prev + curr, 0);
    }
    async countPromo() {
        return (await this.getTotalPrice()) > 10 ? 1 : 0;
    }
};
exports.BasketService = BasketService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => shop_service_1.ShopService))),
    __metadata("design:paramtypes", [shop_service_1.ShopService])
], BasketService);
//# sourceMappingURL=basket.service.js.map