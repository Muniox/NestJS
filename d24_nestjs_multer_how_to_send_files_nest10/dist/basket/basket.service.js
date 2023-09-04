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
exports.BasketService = void 0;
const common_1 = require("@nestjs/common");
const shop_service_1 = require("../shop/shop.service");
const item_in_basket_entity_1 = require("./item-in-basket.entity");
const user_service_1 = require("../user/user.service");
const typeorm_1 = require("typeorm");
const mail_service_1 = require("../mail/mail.service");
const added_to_basket_info_1 = require("../templates/email/added-to-basket-info");
let BasketService = exports.BasketService = class BasketService {
    constructor(shopService, userService, mailService, dataSource) {
        this.shopService = shopService;
        this.userService = userService;
        this.mailService = mailService;
        this.dataSource = dataSource;
    }
    async add(product) {
        const { count, productId, userId } = product;
        const shopItem = await this.shopService.getOneItem(productId);
        const user = await this.userService.getOneUser(userId);
        if (typeof productId !== 'string' ||
            typeof userId !== 'string' ||
            typeof count !== 'number' ||
            productId === '' ||
            userId === '' ||
            count < 1 ||
            !shopItem ||
            !user) {
            return {
                isSuccess: false,
            };
        }
        const item = new item_in_basket_entity_1.ItemInBasket();
        item.count = count;
        await item.save();
        await this.mailService.sendMail(user.email, 'Dziękujemy za dodanie do koszyka!', (0, added_to_basket_info_1.addedToBasketInfoEmailTemplate)());
        item.shopItem = shopItem;
        item.user = user;
        await item.save();
        return {
            isSuccess: true,
            id: item.id,
        };
    }
    async remove(itemInBasketId, userId) {
        const user = await this.userService.getOneUser(userId);
        if (!user) {
            throw new Error('User not found!');
        }
        const item = await item_in_basket_entity_1.ItemInBasket.findOne({
            where: {
                id: itemInBasketId,
                user: (0, typeorm_1.Equal)(user.id),
            },
        });
        if (item) {
            await item.remove();
            return {
                isSuccess: true,
            };
        }
        return {
            isSuccess: false,
        };
    }
    async getAllForUser(userId) {
        const user = await this.userService.getOneUser(userId);
        if (!user) {
            throw new Error('User not found!');
        }
        return await item_in_basket_entity_1.ItemInBasket.find({
            where: { user: (0, typeorm_1.Equal)(user.id) },
            relations: ['shopItem'],
        });
    }
    async clearBasket(userId) {
        const user = await this.userService.getOneUser(userId);
        if (!user) {
            throw new Error('User not found!');
        }
        await item_in_basket_entity_1.ItemInBasket.delete({ user: (0, typeorm_1.Equal)(user.id) });
    }
    async getTotalPrice(userId) {
        const items = await this.getAllForUser(userId);
        return (await Promise.all(items.map(async (item) => item.shopItem.price * item.count * 1.23))).reduce((prev, curr) => prev + curr, 0);
    }
    async getAllForAdmin() {
        return await item_in_basket_entity_1.ItemInBasket.find({
            relations: ['shopItem', 'user'],
        });
    }
    async getStats() {
        const { itemInBasketAvgPrice } = await this.dataSource
            .createQueryBuilder()
            .select('AVG(shopItem.price)', 'itemInBasketAvgPrice')
            .from(item_in_basket_entity_1.ItemInBasket, 'itemInBasket')
            .leftJoinAndSelect('itemInBasket.shopItem', 'shopItem')
            .getRawOne();
        const allitemsInBasket = await this.getAllForAdmin();
        const baskets = {};
        for (const oneItemInBasket of allitemsInBasket) {
            baskets[oneItemInBasket.user.id] = baskets[oneItemInBasket.user.id] | 0;
            baskets[oneItemInBasket.user.id] +=
                oneItemInBasket.shopItem.price * oneItemInBasket.count * 1.23;
        }
        const basketValues = Object.values(baskets);
        const basketAvgTotalPrice = basketValues.reduce((prev, curr) => prev + curr, 0) / basketValues.length;
        return {
            itemInBasketAvgPrice,
            basketAvgTotalPrice,
        };
    }
};
exports.BasketService = BasketService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(shop_service_1.ShopService)),
    __param(1, (0, common_1.Inject)(user_service_1.UserService)),
    __param(2, (0, common_1.Inject)(mail_service_1.MailService)),
    __metadata("design:paramtypes", [shop_service_1.ShopService,
        user_service_1.UserService,
        mail_service_1.MailService,
        typeorm_1.DataSource])
], BasketService);
//# sourceMappingURL=basket.service.js.map