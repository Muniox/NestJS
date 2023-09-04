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
exports.MyCacheInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const core_1 = require("@nestjs/core");
const cache_item_entity_1 = require("../cache/cache-item.entity");
let MyCacheInterceptor = exports.MyCacheInterceptor = class MyCacheInterceptor {
    constructor(reflector) {
        this.reflector = reflector;
    }
    async intercept(context, next) {
        const method = context.getHandler();
        const cacheTimeInSec = this.reflector.get('cacheTimeInSec', method);
        const controllerName = context.getClass().name;
        const actionName = method.name;
        const cachedData = await cache_item_entity_1.CacheItem.findOne({
            where: { controllerName, actionName },
        });
        if (cachedData) {
            if (+cachedData.createdAt + cacheTimeInSec * 1000 > +new Date()) {
                console.log('Using cached data.');
                return (0, rxjs_1.of)(JSON.parse(cachedData.dataJson));
            }
            else {
                console.log('Removing old cache data', cachedData.id);
                await cachedData.remove();
            }
        }
        console.log('Generating live data.');
        return next.handle().pipe((0, rxjs_1.tap)(async (data) => {
            const newCachedData = new cache_item_entity_1.CacheItem();
            newCachedData.controllerName = controllerName;
            newCachedData.actionName = actionName;
            newCachedData.dataJson = JSON.stringify(data);
            await newCachedData.save();
        }));
    }
};
exports.MyCacheInterceptor = MyCacheInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], MyCacheInterceptor);
//# sourceMappingURL=my-cache.interceptor.js.map