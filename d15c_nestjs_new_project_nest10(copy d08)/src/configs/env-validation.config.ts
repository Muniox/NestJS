import * as Joi from 'joi';
//TODO Validation will be added later
//zmienić z powrotem na joi!
export const envValidationObjectSchema = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_SYNCHRONIZE: Joi.boolean().required(),
  DB_LOGGING: Joi.boolean().required(),
});
