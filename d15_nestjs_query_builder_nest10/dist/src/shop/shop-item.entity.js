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
var ShopItem_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopItem = void 0;
const typeorm_1 = require("typeorm");
const shop_item_details_entity_1 = require("./shop-item-details.entity");
const shop_set_entity_1 = require("./shop-set.entity");
let ShopItem = exports.ShopItem = ShopItem_1 = class ShopItem extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ShopItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: '',
        length: 25,
    }),
    __metadata("design:type", String)
], ShopItem.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        default: '',
        nullable: true,
    }),
    __metadata("design:type", String)
], ShopItem.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 6,
        scale: 2,
    }),
    __metadata("design:type", Number)
], ShopItem.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], ShopItem.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ShopItem.prototype, "boughtCounter", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], ShopItem.prototype, "wasEverBought", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => shop_item_details_entity_1.ShopItemsDetails),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", shop_item_details_entity_1.ShopItemsDetails)
], ShopItem.prototype, "details", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ShopItem_1, (entity) => entity.subShopItems),
    __metadata("design:type", ShopItem)
], ShopItem.prototype, "mainShopItem", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ShopItem_1, (entity) => entity.mainShopItem),
    __metadata("design:type", Array)
], ShopItem.prototype, "subShopItems", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => shop_set_entity_1.ShopSet, (entity) => entity.items),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], ShopItem.prototype, "sets", void 0);
exports.ShopItem = ShopItem = ShopItem_1 = __decorate([
    (0, typeorm_1.Entity)()
], ShopItem);
//# sourceMappingURL=shop-item.entity.js.map