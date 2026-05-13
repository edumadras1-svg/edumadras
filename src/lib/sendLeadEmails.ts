// Client-side EmailJS helper — sends from the browser (no CORS/server restrictions)
export async function sendLeadEmails(params: {
  name: string;
  email?: string;
  phone: string;
  city?: string;
  target_course?: string;
  college_name?: string;
  father_name?: string;
  father_phone?: string;
}) {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const adminTemplateId = process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID;
  const autoReplyTemplateId = process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !publicKey) return;

  const templateParams = {
    from_name: params.name,
    from_email: params.email || "Not provided",
    phone: params.phone,
    city: params.city || "Not provided",
    course: params.target_course || "Not specified",
    college_name: params.college_name || "General Inquiry (Homepage)",
    father_name: params.father_name || "Not provided",
    father_phone: params.father_phone || "Not provided",
    to_email: params.email,
  };

  // Admin notification
  if (adminTemplateId) {
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: adminTemplateId,
          user_id: publicKey,
          template_params: templateParams,
        }),
      });
      console.log("Admin email:", res.status, await res.text());
    } catch (err) {
      console.error("Admin email failed:", err);
    }
  }

  // Student auto-reply
  if (autoReplyTemplateId && params.email) {
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: autoReplyTemplateId,
          user_id: publicKey,
          template_params: templateParams,
        }),
      });
      console.log("Auto-reply email:", res.status, await res.text());
    } catch (err) {
      console.error("Auto-reply email failed:", err);
    }
  }
}
