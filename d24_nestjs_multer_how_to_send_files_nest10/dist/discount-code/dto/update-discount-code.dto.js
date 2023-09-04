"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDiscountCodeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_discount_code_dto_1 = require("./create-discount-code.dto");
class UpdateDiscountCodeDto extends (0, mapped_types_1.PartialType)(create_discount_code_dto_1.CreateDiscountCodeDto) {
}
exports.UpdateDiscountCodeDto = UpdateDiscountCodeDto;
//# sourceMappingURL=update-discount-code.dto.js.map