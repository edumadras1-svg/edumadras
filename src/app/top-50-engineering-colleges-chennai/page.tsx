import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://www.edumadras.com/top-50-engineering-colleges-chennai";
const H1 = "Top 50 Engineering Colleges in Chennai 2025–2026";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges/chennai" }, { label: "Top 50 Chennai", href: "/top-50-engineering-colleges-chennai" }];
const FAQ_ITEMS = [
  { question: "How many engineering colleges are there in Chennai?", answer: "Chennai has approximately 100+ engineering colleges including government, government-aided, and self-financing institutions affiliated to Anna University. This includes premier institutions like IIT Madras, Anna University CEG, and top private colleges like SRM, Sathyabama, and Saveetha." },
  { question: "What is the cheapest engineering college in Chennai?", answer: "Government engineering colleges like CEG Anna University and MIT Anna University offer the most affordable engineering education at ₹25,000–50,000/year. Government-aided colleges like SSN College of Engineering charge around ₹1–2 LPA. Self-financing colleges range from ₹1.5–4 LPA depending on the branch." },
  { question: "Which engineering college in Chennai has the best placement?", answer: "IIT Madras leads with the highest placement packages (₹1 Cr+ international offers). Among private colleges, SSN College of Engineering, SRM IST, and Sathyabama consistently report 90%+ placement rates with average packages of ₹6–12 LPA." },
  { question: "What is the TNEA cutoff for top engineering colleges in Chennai?", answer: "The TNEA cutoff varies by college and branch. IIT Madras requires JEE Advanced rank. For Anna University CEG, CSE cutoff is typically 195–200. SRM, VIT, and other private universities conduct their own entrance exams (SRMJEEE, VITEEE)." },
  { question: "Can I get admission in Chennai engineering colleges without JEE?", answer: "Yes! Most private engineering colleges in Chennai accept students through TNEA counseling (based on 12th marks), their own entrance exams (SRMJEEE, VITEEE), or management quota. Only IIT Madras and a few NITs require JEE scores." },
  { question: "Which are the best autonomous engineering colleges in Chennai?", answer: "Top autonomous engineering colleges in Chennai include SSN College of Engineering, Sri Sivasubramaniya Nadar College, Rajalakshmi Engineering College, and Jerusalem College of Engineering. Autonomous status allows colleges to design their own curriculum and conduct exams." },
  { question: "What are the top B.Tech branches in Chennai engineering colleges?", answer: "Computer Science and Engineering (CSE), Artificial Intelligence & Data Science (AI/DS), Electronics and Communication Engineering (ECE), and Information Technology (IT) are the most sought-after branches in Chennai engineering colleges in 2025, with CSE consistently having the highest cutoffs and best placement records." },
];

export const metadata: Metadata = {
  title: "Top 50 Engineering Colleges in Chennai 2025–2026 — Complete Rank-Wise List | EduMadras",
  description: "Complete rank-wise list of top 50 engineering colleges in Chennai 2025 with NIRF rankings, fees, placements, cutoffs & admission details. Compare govt, private & autonomous colleges. Free counseling.",
  keywords: "top 50 engineering colleges in chennai, engineering colleges in chennai list, all engineering colleges chennai, best engineering colleges chennai 2025, anna university affiliated colleges",
  alternates: { canonical: "https://www.edumadras.com/top-50-engineering-colleges-chennai" },
  openGraph: { title: "Top 50 Engineering Colleges in Chennai 2025–2026 | EduMadras", url: "https://www.edumadras.com/top-50-engineering-colleges-chennai", siteName: "EduMadras", type: "website", locale: "en_IN" },
};

import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = createServerSupabaseClient();
  
  // 1. Fetch Top 50
  const baseColleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai", limit: 50 });
  
  // 2. Fetch Hindustan and AVIT specifically to ensure they are present
  const { data: specificColleges } = await supabase
    .from("colleges")
    .select("*")
    .or('name.ilike.%Hindustan Institute%,name.ilike.%Aarupadai Veedu%');

  // 3. Merge and remove duplicates
  const allColleges = [...(specificColleges || []), ...baseColleges];
  const uniqueColleges = Array.from(new Map(allColleges.map(c => [c.id, c])).values());
  const colleges = uniqueColleges.slice(0, 52); // Keep them and the top 50

  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Top 50 Engineering Colleges in Chennai" h1={H1} subtitle="The most comprehensive rank-wise list of all 50 top engineering colleges in Chennai — updated for 2025–2026 admissions with NIRF rankings, TNEA cutoffs, fees & placement data." introText="Looking beyond just the top 10? This expanded list of 50 engineering colleges in Chennai covers everything from elite NIRF-ranked institutions like IIT Madras and Anna University CEG to quality autonomous and self-financing colleges with strong industry connections and affordable fees. Whether you're a high-scorer aiming for IIT Madras, looking for top private colleges like SRM or Sathyabama, or searching for a solid college with good placement support at low fees, this comprehensive rank-wise list has you covered with verified data on fees, placements, TNEA cutoffs, and admission criteria for the 2025–2026 academic year." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl="https://www.edumadras.com/top-50-engineering-colleges-chennai" filterLabel="Top 50" />
    </>
  );
}
