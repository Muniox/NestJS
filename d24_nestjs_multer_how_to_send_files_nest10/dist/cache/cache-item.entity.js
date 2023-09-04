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
exports.CacheItem = void 0;
const typeorm_1 = require("typeorm");
let CacheItem = exports.CacheItem = class CacheItem extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CacheItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], CacheItem.prototype, "controllerName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], CacheItem.prototype, "actionName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'longtext',
    }),
    __metadata("design:type", String)
], CacheItem.prototype, "dataJson", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], CacheItem.prototype, "createdAt", void 0);
exports.CacheItem = CacheItem = __decorate([
    (0, typeorm_1.Entity)()
], CacheItem);
//# sourceMappingURL=cache-item.entity.js.map