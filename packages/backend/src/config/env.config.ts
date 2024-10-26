import { registerAs } from "@nestjs/config";
import z from "zod";

const validationSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.coerce.number().default(3000),
  FRONTEND_URL: z.string().default("http://localhost:5173"),
  AUTH0_AUDIENCE: z.string(),
  AUTH0_ISSUER: z.string(),
  AUTH0_CUSTOM_SECRET: z.string(),
  DATABASE_URL: z.string(),
  REDIS_HOST: z.string().default("localhost"),
  REDIS_PORT: z.coerce.number().default(6379),
});

export type EnvSchema = z.infer<typeof validationSchema>;

export const validate = (config: Record<string, unknown>) => {
  const parsedSchema = validationSchema.parse(config);
  return parsedSchema;
};

export default registerAs("env", () => ({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  FRONTEND_URL: process.env.FRONTEND_URL,
  AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
  AUTH0_ISSUER: process.env.AUTH0_ISSUER,
  AUTH0_CUSTOM_SECRET: process.env.AUTH0_CUSTOM_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
}));
