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
const add_product_dto_1 = require("./dto/add-product.dto");
const platform_express_1 = require("@nestjs/platform-express");
const path = require("path");
const storage_1 = require("../utils/storage");
let ShopController = exports.ShopController = class ShopController {
    constructor(shopService) {
        this.shopService = shopService;
    }
    async getShopList() {
        return await this.shopService.getItems();
    }
    test() {
        throw new common_1.ImATeapotException('oh noes!');
    }
    async addProduct(req, files) {
        return await this.shopService.addProduct(req, files);
    }
    async getPhoto(id, res) {
        return this.shopService.getPhoto(id, res);
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "getShopList", null);
__decorate([
    (0, common_1.Get)('/test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "test", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        {
            name: 'photo',
            maxCount: 1,
        },
    ], {
        storage: (0, storage_1.multerStorage)(path.join((0, storage_1.storageDir)(), 'product-photos')),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_product_dto_1.AddProductDto, Object]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "addProduct", null);
__decorate([
    (0, common_1.Get)('/photo/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "getPhoto", null);
exports.ShopController = ShopController = __decorate([
    (0, common_1.Controller)('shop'),
    __param(0, (0, common_1.Inject)(shop_service_1.ShopService)),
    __metadata("design:paramtypes", [shop_service_1.ShopService])
], ShopController);
//# sourceMappingURL=shop.controller.js.map