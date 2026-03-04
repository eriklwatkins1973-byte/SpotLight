import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  MUX_TOKEN_ID: z.string().optional(),
  MUX_TOKEN_SECRET: z.string().optional(),
  TWELVE_LABS_API_KEY: z.string().optional(),
  TWELVELABS_DEFAULT_INDEX_ID: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional()
});

export const env = envSchema.parse(process.env);

export function hasRequiredEnv(keys: Array<keyof typeof env>) {
  return keys.every((key) => {
    const value = env[key];
    return typeof value === "string" && value.length > 0;
  });
}