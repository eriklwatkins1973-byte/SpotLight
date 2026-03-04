import { createClient } from "@supabase/supabase-js";
import { env, hasRequiredEnv } from "@/lib/env";

export function getSupabaseAdminClient() {
  if (
    !hasRequiredEnv([
      "NEXT_PUBLIC_SUPABASE_URL",
      "SUPABASE_SERVICE_ROLE_KEY"
    ])
  ) {
    return null;
  }

  return createClient(env.NEXT_PUBLIC_SUPABASE_URL!, env.SUPABASE_SERVICE_ROLE_KEY!);
}