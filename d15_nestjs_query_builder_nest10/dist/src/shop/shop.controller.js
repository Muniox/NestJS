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
exports.ShopController = void 0;
const common_1 = require("@nestjs/common");
const shop_service_1 = require("./shop.service");
let ShopController = exports.ShopController = class ShopController {
    onApplicationBootstrap() {
        console.log('Załadowany');
    }
    onApplicationShutdown() {
        console.log('apka zaraz zniknie');
    }
    constructor(shopService) {
        this.shopService = shopService;
    }
    async getListOfProducts(pageNumber) {
        return await this.shopService.getProducts(pageNumber);
    }
    async testFindItem(searchTerm) {
        return await this.shopService.findProducts(searchTerm);
    }
    welcome(siteName) {
        return `Witam na sklepie ${siteName}`;
    }
    async getOneProduct(id) {
        return await this.shopService.getOneProduct(id);
    }
    async removeProduct(id) {
        await this.shopService.removeProduct(id);
    }
    async createNewProduct() {
        return await this.shopService.createDummyProduct();
    }
};
__decorate([
    (0, common_1.Get)('/:pageNumber'),
    __param(0, (0, common_1.Param)('pageNumber', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "getListOfProducts", null);
__decorate([
    (0, common_1.Get)('/find/:searchTerm'),
    __param(0, (0, common_1.Param)('searchTerm')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "testFindItem", null);
__decorate([
    (0, common_1.Get)('/welcome'),
    __param(0, (0, common_1.HostParam)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], ShopController.prototype, "welcome", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "getOneProduct", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "removeProduct", null);
__decorate([
    (0, common_1.Post)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "createNewProduct", null);
exports.ShopController = ShopController = __decorate([
    (0, common_1.Controller)({
        path: 'shop',
    }),
    __param(0, (0, common_1.Inject)(shop_service_1.ShopService)),
    __metadata("design:paramtypes", [shop_service_1.ShopService])
], ShopController);
//# sourceMappingURL=shop.controller.js.map