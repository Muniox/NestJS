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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemInBasket = void 0;
const typeorm_1 = require("typeorm");
const shop_item_entity_1 = require("../shop/shop-item.entity");
const user_entity_1 = require("../user/user.entity");
let ItemInBasket = exports.ItemInBasket = class ItemInBasket extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ItemInBasket.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ItemInBasket.prototype, "count", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => shop_item_entity_1.ShopItem, (entity) => entity.itemsInBasket),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", shop_item_entity_1.ShopItem)
], ItemInBasket.prototype, "shopItem", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (entity) => entity.itemsInBasket),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], ItemInBasket.prototype, "user", void 0);
exports.ItemInBasket = ItemInBasket = __decorate([
    (0, typeorm_1.Entity)()
], ItemInBasket);
//# sourceMappingURL=item-in-basket.entity.js.map