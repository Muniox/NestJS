"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envValidationObjectSchema = void 0;
const Joi = require("joi");
exports.envValidationObjectSchema = Joi.object({
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_DATABASE: Joi.string().required(),
    DB_SYNCHRONIZE: Joi.boolean().required(),
    DB_LOGGING: Joi.boolean().required(),
});
//# sourceMappingURL=env-validation.config.js.map