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
const add_item_dto_1 = require("./dto/add-item.dto");
const basket_service_1 = require("./basket.service");
const Password_protect_guard_1 = require("../guards/Password-protect.guard");
const use_password_decorator_1 = require("../decorators/use-password.decorator");
const my_timeout_interceptor_1 = require("../interceptors/my-timeout.interceptor");
const my_cache_interceptor_1 = require("../interceptors/my-cache.interceptor");
const use_cache_time_decorator_1 = require("../decorators/use-cache-time.decorator");
let BasketController = exports.BasketController = class BasketController {
    constructor(basketService) {
        this.basketService = basketService;
    }
    async addProductToBasket(item) {
        return await this.basketService.add(item);
    }
    async clearBasket(userId) {
        await this.basketService.clearBasket(userId);
    }
    async removeProduct(itemInBasketId, userId) {
        return await this.basketService.remove(itemInBasketId, userId);
    }
    async getBasketForAdmin() {
        return await this.basketService.getAllForAdmin();
    }
    async getStats() {
        return await this.basketService.getStats();
    }
    async getBasket(userId) {
        return await this.basketService.getAllForUser(userId);
    }
    async getTotalBasketPrice(userId) {
        return await this.basketService.getTotalPrice(userId);
    }
};
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_item_dto_1.AddItemDto]),
    __metadata("design:returntype", Promise)
], BasketController.prototype, "addProductToBasket", null);
__decorate([
    (0, common_1.Delete)('/all/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BasketController.prototype, "clearBasket", null);
__decorate([
    (0, common_1.Delete)('/:itemInBasketId/:userId'),
    __param(0, (0, common_1.Param)('itemInBasketId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BasketController.prototype, "removeProduct", null);
__decorate([
    (0, common_1.Get)('/admin'),
    (0, common_1.UseGuards)(Password_protect_guard_1.PasswordProtectGuard),
    (0, use_password_decorator_1.UsePassword)('admin1'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BasketController.prototype, "getBasketForAdmin", null);
__decorate([
    (0, common_1.Get)('/stats'),
    (0, common_1.UseGuards)(Password_protect_guard_1.PasswordProtectGuard),
    (0, use_password_decorator_1.UsePassword)('passforstats'),
    (0, use_cache_time_decorator_1.UseCacheTime)(60),
    (0, common_1.UseInterceptors)(my_timeout_interceptor_1.MyTimeoutInterceptor, my_cache_interceptor_1.MyCacheInterceptor),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BasketController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BasketController.prototype, "getBasket", null);
__decorate([
    (0, common_1.Get)('/total-price/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BasketController.prototype, "getTotalBasketPrice", null);
exports.BasketController = BasketController = __decorate([
    (0, common_1.Controller)('basket'),
    __param(0, (0, common_1.Inject)(basket_service_1.BasketService)),
    __metadata("design:paramtypes", [basket_service_1.BasketService])
], BasketController);
//# sourceMappingURL=basket.controller.js.map