import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// Server-side route handler — uses SERVICE_ROLE key to bypass RLS
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, city, target_course, college_id } = body;

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // If no service role key, fall back to anon key
    const key = serviceKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    const supabase = createClient(supabaseUrl, key);

    // Only include college_id if it's a valid UUID (not a placeholder)
    const isValidUuid = college_id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(college_id);

    const { data, error } = await supabase.from("leads").insert([
      {
        college_id: isValidUuid ? college_id : null,
        name,
        email: email || null,
        phone,
        city: city || null,
        target_course: target_course || null,
        status: "Pending",
      },
    ]).select();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
