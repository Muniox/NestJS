"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsePassword = void 0;
const common_1 = require("@nestjs/common");
const UsePassword = (pass) => (0, common_1.SetMetadata)('passwordProtectGoodPassword', pass);
exports.UsePassword = UsePassword;
//# sourceMappingURL=use-password.decorator.js.map