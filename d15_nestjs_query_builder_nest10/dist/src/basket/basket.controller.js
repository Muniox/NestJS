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
exports.BasketController = void 0;
const common_1 = require("@nestjs/common");
const add_product_dto_1 = require("./dto/add-product.dto");
const basket_service_1 = require("./basket.service");
let BasketController = exports.BasketController = class BasketController {
    constructor(basketService) {
        this.basketService = basketService;
    }
    addProductToBasket(item) {
        return this.basketService.add(item);
    }
    removeProductFromBasket(index) {
        return this.basketService.remove(index);
    }
    listProductsInBasket() {
        return this.basketService.list();
    }
    async totalPrice() {
        return await this.basketService.getTotalPrice();
    }
};
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_product_dto_1.AddProductDto]),
    __metadata("design:returntype", Object)
], BasketController.prototype, "addProductToBasket", null);
__decorate([
    (0, common_1.Delete)('/:index'),
    __param(0, (0, common_1.Param)('index', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], BasketController.prototype, "removeProductFromBasket", null);
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], BasketController.prototype, "listProductsInBasket", null);
__decorate([
    (0, common_1.Get)('/total-price'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BasketController.prototype, "totalPrice", null);
exports.BasketController = BasketController = __decorate([
    (0, common_1.Controller)('basket'),
    __param(0, (0, common_1.Inject)(basket_service_1.BasketService)),
    __metadata("design:paramtypes", [basket_service_1.BasketService])
], BasketController);
//# sourceMappingURL=basket.controller.js.map