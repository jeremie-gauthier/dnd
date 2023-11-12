import Joi from 'joi';

export default () => ({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
});

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production').default('development'),
  PORT: Joi.number().default(3000),
});
