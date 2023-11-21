import z from 'zod';

export default () => ({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
});

const validationSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
});

export const validate = (config: Record<string, unknown>) => {
  const parsedSchema = validationSchema.parse(config);
  return parsedSchema;
};
