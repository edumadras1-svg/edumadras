import { supabase } from "@/lib/supabase/client";
import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  
  const { data: college } = await supabase
    .from("colleges")
    .select("name")
    .eq("id", id)
    .single();
  
  if (!college) {
    return {
      title: "College Not Found | EduMadras",
    };
  }

  const title = `${college.name} Admissions 2026 — Fees, Courses & Cutoff | EduMadras`;
  const description = `Explore ${college.name} — fees, courses, placement stats, cutoffs and more. Get expert counselling on EduMadras.`;

  return {
    title,
    description,
  };
}

export default function CollegeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
