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
exports.DiscountCodeController = void 0;
const common_1 = require("@nestjs/common");
const discount_code_service_1 = require("./discount-code.service");
const create_discount_code_dto_1 = require("./dto/create-discount-code.dto");
const update_discount_code_dto_1 = require("./dto/update-discount-code.dto");
let DiscountCodeController = exports.DiscountCodeController = class DiscountCodeController {
    constructor(discountCodeService) {
        this.discountCodeService = discountCodeService;
    }
    create(createDiscountCodeDto) {
        return this.discountCodeService.create(createDiscountCodeDto);
    }
    findAll() {
        return this.discountCodeService.findAll();
    }
    findOne(id) {
        return this.discountCodeService.findOne(+id);
    }
    update(id, updateDiscountCodeDto) {
        return this.discountCodeService.update(+id, updateDiscountCodeDto);
    }
    remove(id) {
        return this.discountCodeService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_discount_code_dto_1.CreateDiscountCodeDto]),
    __metadata("design:returntype", void 0)
], DiscountCodeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DiscountCodeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DiscountCodeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_discount_code_dto_1.UpdateDiscountCodeDto]),
    __metadata("design:returntype", void 0)
], DiscountCodeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DiscountCodeController.prototype, "remove", null);
exports.DiscountCodeController = DiscountCodeController = __decorate([
    (0, common_1.Controller)('discount-code'),
    __metadata("design:paramtypes", [discount_code_service_1.DiscountCodeService])
], DiscountCodeController);
//# sourceMappingURL=discount-code.controller.js.map