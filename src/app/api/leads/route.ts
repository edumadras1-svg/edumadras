import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// Server-side route handler — saves lead + sends EmailJS notifications
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
    const key = serviceKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, key);

    // Only include college_id if it's a valid UUID
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

    // ---- Send EmailJS notifications (non-blocking) ----
    const emailjsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const emailjsAdminTemplateId = process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID;
    const emailjsAutoReplyTemplateId = process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID;
    const emailjsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (emailjsServiceId && emailjsPublicKey) {
      const templateParams = {
        from_name: name,
        from_email: email || "Not provided",
        phone: phone,
        city: city || "Not provided",
        course: target_course || "Not specified",
        to_email: email,
      };

      // Send admin notification
      if (emailjsAdminTemplateId) {
        fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: emailjsServiceId,
            template_id: emailjsAdminTemplateId,
            user_id: emailjsPublicKey,
            template_params: templateParams,
          }),
        }).catch((err) => console.error("EmailJS admin notification error:", err));
      }

      // Send auto-reply to student
      if (emailjsAutoReplyTemplateId && email) {
        fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: emailjsServiceId,
            template_id: emailjsAutoReplyTemplateId,
            user_id: emailjsPublicKey,
            template_params: templateParams,
          }),
        }).catch((err) => console.error("EmailJS auto-reply error:", err));
      }
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
