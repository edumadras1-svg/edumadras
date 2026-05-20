import type { Metadata } from "next";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import CollegeDetailClient from "./CollegeDetailClient";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = createServerSupabaseClient();
  
  const { data: college } = await supabase
    .from("colleges")
    .select("name, city, state, type, stream")
    .eq("id", id)
    .single();

  if (!college) {
    return {
      title: "College Not Found | EduMadras",
      description: "The requested college could not be found."
    };
  }

  const title = `${college.name} - Fees, Placements, Courses, Admission 2026`;
  const description = `Get complete details about ${college.name} located in ${college.city}, ${college.state}. Find latest fee structures, placement records, cutoffs, and admission process for 2026.`;

  return {
    title,
    description,
    keywords: [
      college.name,
      `${college.name} admission 2026`,
      `${college.name} fees`,
      `${college.name} placement`,
      `${college.name} cutoff`,
      `${college.stream} colleges in ${college.city}`
    ].join(", "),
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://www.edumadras.com/colleges/${id}`,
      siteName: "EduMadras",
    },
    alternates: {
      canonical: `https://www.edumadras.com/colleges/${id}`
    }
  };
}

export default function CollegeDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  return <CollegeDetailClient params={params} />;
}
