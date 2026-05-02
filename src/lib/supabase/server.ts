import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client for Server Components, generateMetadata, sitemap, etc.
// Reads from the same NEXT_PUBLIC_ env vars in your .env.local — no extra config needed.
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("⚠️ Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
  }

  return createClient(supabaseUrl!, supabaseAnonKey!);
}
