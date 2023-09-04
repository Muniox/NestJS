"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyTimeoutInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let MyTimeoutInterceptor = exports.MyTimeoutInterceptor = class MyTimeoutInterceptor {
    async intercept(context, next) {
        return next.handle().pipe((0, rxjs_1.timeout)(5000), (0, rxjs_1.catchError)((err) => {
            if (err instanceof rxjs_1.TimeoutError) {
                throw new common_1.RequestTimeoutException();
            }
            else {
                throw new Error(err);
            }
        }));
    }
};
exports.MyTimeoutInterceptor = MyTimeoutInterceptor = __decorate([
    (0, common_1.Injectable)()
], MyTimeoutInterceptor);
//# sourceMappingURL=my-timeout.interceptor.js.map