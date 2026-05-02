import { createServerSupabaseClient } from "@/lib/supabase/server";

// Shared data fetcher for SEO listing pages
export async function fetchCollegesByFilter(filters: {
  stream?: string;
  city?: string;
  state?: string;
  type?: string;
  limit?: number;
  orderBy?: string;
}) {
  const supabase = createServerSupabaseClient();
  let query = supabase.from("colleges").select("*");

  if (filters.stream) query = query.eq("stream", filters.stream);
  if (filters.city) query = query.ilike("city", filters.city);
  if (filters.state) query = query.ilike("state", filters.state);
  if (filters.type) query = query.eq("type", filters.type);

  query = query.order(filters.orderBy || "rank", { ascending: true, nullsFirst: false });

  if (filters.limit) query = query.limit(filters.limit);

  const { data, error } = await query;
  if (error) console.error("SEO page fetch error:", error);
  return data || [];
}
