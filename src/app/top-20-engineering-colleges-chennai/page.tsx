import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://www.edumadras.com/top-20-engineering-colleges-chennai";
const H1 = "Top 20 Engineering Colleges in Chennai 2025–2026";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges/chennai" }, { label: "Top 20 Chennai", href: "/top-20-engineering-colleges-chennai" }];
const FAQ_ITEMS = [
  { question: "What are the top 20 engineering colleges in Chennai?", answer: "The top 20 engineering colleges in Chennai include IIT Madras (#1 NIRF), Anna University CEG, SSN College of Engineering, SRM IST, Sathyabama, MIT Anna University, College of Engineering Guindy, Madras Institute of Technology, Rajalakshmi Engineering College, Saveetha Engineering College, Hindustan Institute of Technology, and more." },
  { question: "How are the top 20 engineering colleges ranked?", answer: "Our ranking considers multiple factors: NIRF ranking (30%), placement performance — average and highest packages (25%), faculty quality and student-to-faculty ratio (15%), infrastructure and lab facilities (15%), research output (10%), and industry partnerships (5%)." },
  { question: "Which top 20 college in Chennai has the lowest fees?", answer: "Government colleges like Anna University CEG (₹25K–50K/year) and MIT Anna University have the lowest fees. Among top-ranked private colleges, SSN College (₹1.5–2 LPA) offers the best value with excellent placement records averaging ₹8–10 LPA." },
  { question: "What is the average placement package in top 20 Chennai colleges?", answer: "The average placement package across the top 20 engineering colleges in Chennai ranges from ₹6–20 LPA. IIT Madras averages ₹20+ LPA, SSN College averages ₹8–10 LPA, SRM IST averages ₹6–8 LPA, and Sathyabama averages ₹4–6 LPA." },
  { question: "Do top 20 Chennai colleges offer scholarships?", answer: "Yes! Most top 20 colleges offer merit-based scholarships. IIT Madras offers MCM scholarships. SRM offers up to 100% tuition waiver. Sathyabama offers scholarships for JEE/TNEA toppers. Government fee waivers are available for BC/MBC/SC/ST categories." },
  { question: "Which top 20 college is best for Computer Science in Chennai?", answer: "For Computer Science, IIT Madras is unmatched. Among private colleges, SSN, SRM IST, and Anna University CEG have the strongest CSE programs with dedicated AI/ML labs, coding clubs, and partnerships with tech companies like Google, Microsoft, and Amazon." },
];

export const metadata: Metadata = {
  title: "Top 20 Engineering Colleges in Chennai 2025 — Rank-Wise List | EduMadras",
  description: "Top 20 engineering colleges in Chennai 2025 ranked by NIRF, placements & fees. IIT Madras, SRM, SSN, Sathyabama & more. Compare & get free admission counseling.",
  keywords: "top 20 engineering colleges in chennai, top 20 engineering colleges chennai 2025, best 20 engineering colleges chennai, top twenty engineering colleges chennai",
  alternates: { canonical: "https://www.edumadras.com/top-20-engineering-colleges-chennai" },
  openGraph: { title: "Top 20 Engineering Colleges in Chennai 2025 | EduMadras", url: "https://www.edumadras.com/top-20-engineering-colleges-chennai", siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai", limit: 20 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Top 20 Engineering Colleges in Chennai" h1={H1} subtitle="The definitive top 20 engineering colleges in Chennai — ranked by NIRF, placements, faculty quality & infrastructure." introText="Already know the top 10 but want more options? This curated list of the top 20 engineering colleges in Chennai expands your choices to include excellent colleges that just miss the top 10 but offer outstanding value — often with better placement-to-fee ratios. From IIT Madras and Anna University CEG at the top to strong performers like Rajalakshmi Engineering College and Saveetha Engineering College, every college on this list has been evaluated on NIRF ranking, placement records, faculty credentials, and infrastructure quality for the 2025–2026 academic year." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl="https://www.edumadras.com/top-20-engineering-colleges-chennai" filterLabel="Top 20" />
    </>
  );
}
