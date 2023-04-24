import * as Joi from 'joi';

enum Environment {
  Development = 'development',
  Production = 'production',
}

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(...Object.values(Environment))
    .default(Environment.Development),
  PORT: Joi.number().default(4000),
  JWT_SECRET_KEY: Joi.string().required(),
});
