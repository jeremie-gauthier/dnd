import z from "zod";

export default () => ({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
});

const validationSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.coerce.number().default(3000),
  AUTH0_AUDIENCE: z.string(),
  AUTH0_ISSUER: z.string(),
  DATABASE_URL: z.string(),
  REDIS_HOST: z.string().default("localhost"),
  REDIS_PORT: z.coerce.number().default(6379),
});

export const validate = (config: Record<string, unknown>) => {
  const parsedSchema = validationSchema.parse(config);
  return parsedSchema;
};
