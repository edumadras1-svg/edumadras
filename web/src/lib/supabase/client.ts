import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials missing. Data fetching may fail.");
}

// Fallback to a dummy URL if missing, to prevent Next.js from throwing 'supabaseUrl is required' on startup
export const supabase = createClient(
  supabaseUrl || "https://dummy-project.supabase.co", 
  supabaseAnonKey || "dummy-key"
);
