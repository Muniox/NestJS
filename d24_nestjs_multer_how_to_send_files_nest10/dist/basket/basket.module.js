"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasketModule = void 0;
const common_1 = require("@nestjs/common");
const basket_controller_1 = require("./basket.controller");
const basket_service_1 = require("./basket.service");
const shop_module_1 = require("../shop/shop.module");
const user_module_1 = require("../user/user.module");
const mail_module_1 = require("../mail/mail.module");
let BasketModule = exports.BasketModule = class BasketModule {
};
exports.BasketModule = BasketModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => shop_module_1.ShopModule),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            mail_module_1.MailModule,
        ],
        controllers: [basket_controller_1.BasketController],
        providers: [basket_service_1.BasketService],
        exports: [basket_service_1.BasketService],
    })
], BasketModule);
//# sourceMappingURL=basket.module.js.map