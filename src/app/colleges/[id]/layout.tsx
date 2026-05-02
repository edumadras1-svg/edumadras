import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

const BASE_URL = "https://edumadras.com";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const supabase = createServerSupabaseClient();

  const { data: college } = await supabase
    .from("colleges")
    .select("name, city, state, stream, description, logo_url, banner_url, rating, rank, avg_package, highest_package, type, approvals, established_year")
    .eq("id", id)
    .single();

  if (!college) {
    return {
      title: "College Not Found | EduMadras",
      description: "The college you are looking for could not be found on EduMadras.",
    };
  }

  const collegeName = college.name;
  const location = [college.city, college.state].filter(Boolean).join(", ");
  const stream = college.stream || "General";
  const approvals = (college.approvals || []).join(", ");

  const title = `${collegeName} — Admissions 2026, Fees, Courses, Cutoff & Placements | EduMadras`;
  const description = `Explore ${collegeName}, ${location}. Check courses, fee structure, placement record (Avg: ₹${college.avg_package || "N/A"} LPA), NIRF ranking #${college.rank || "N/A"}, admission process & cutoffs. ${approvals ? `Approved by ${approvals}.` : ""} Get free expert counseling on EduMadras.`;
  const pageUrl = `${BASE_URL}/colleges/${id}`;
  const ogImage = college.banner_url || college.logo_url || `${BASE_URL}/og-default.png`;

  return {
    title,
    description,
    keywords: [
      collegeName,
      `${collegeName} admission 2026`,
      `${collegeName} fees`,
      `${collegeName} courses`,
      `${collegeName} placement`,
      `${collegeName} cutoff`,
      `${collegeName} ranking`,
      `${stream} colleges in ${college.city || "India"}`,
      `best ${stream} colleges`,
      `${collegeName} review`,
      "EduMadras",
    ].join(", "),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${collegeName} — Admissions 2026 | EduMadras`,
      description,
      url: pageUrl,
      siteName: "EduMadras",
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${collegeName} campus`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${collegeName} — Admissions 2026`,
      description: description.slice(0, 200),
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default function CollegeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
