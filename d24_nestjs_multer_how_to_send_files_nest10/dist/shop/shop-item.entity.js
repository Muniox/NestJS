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
exports.ShopItem = void 0;
const typeorm_1 = require("typeorm");
const item_in_basket_entity_1 = require("../basket/item-in-basket.entity");
let ShopItem = exports.ShopItem = class ShopItem extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ShopItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 50,
    }),
    __metadata("design:type", String)
], ShopItem.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 1000,
    }),
    __metadata("design:type", String)
], ShopItem.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 7,
        scale: 2,
    }),
    __metadata("design:type", Number)
], ShopItem.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: null,
        nullable: true,
    }),
    __metadata("design:type", String)
], ShopItem.prototype, "photoFn", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => item_in_basket_entity_1.ItemInBasket, (entity) => entity.shopItem),
    __metadata("design:type", Array)
], ShopItem.prototype, "itemsInBasket", void 0);
exports.ShopItem = ShopItem = __decorate([
    (0, typeorm_1.Entity)()
], ShopItem);
//# sourceMappingURL=shop-item.entity.js.map