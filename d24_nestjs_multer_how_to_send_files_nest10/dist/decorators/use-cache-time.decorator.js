"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCacheTime = void 0;
const common_1 = require("@nestjs/common");
const UseCacheTime = (cacheTimeInSec) => (0, common_1.SetMetadata)('cacheTimeInSec', cacheTimeInSec);
exports.UseCacheTime = UseCacheTime;
//# sourceMappingURL=use-cache-time.decorator.js.map