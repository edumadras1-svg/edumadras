import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://www.edumadras.com/ai-ml-colleges-chennai";
const H1 = "AI & ML Colleges in Chennai 2025 — Artificial Intelligence & Data Science";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges/chennai" }, { label: "AI & ML Colleges", href: "/ai-ml-colleges-chennai" }];
const FAQ_ITEMS = [
  { question: "Which Chennai colleges offer B.Tech in AI & ML?", answer: "SRM IST, Sathyabama, VIT Chennai, Saveetha Engineering College, Anna University, and Rajalakshmi Engineering College offer B.Tech in Artificial Intelligence & Machine Learning or AI & Data Science. IIT Madras offers AI through its CSE department." },
  { question: "Is B.Tech AI/ML a good choice in 2025?", answer: "Absolutely! AI/ML is the fastest growing engineering branch with the highest starting salaries. Average packages for AI/ML graduates range from ₹8-18 LPA in top colleges. The global AI market is expected to reach $1.8 trillion by 2030." },
  { question: "What is the fee for AI/ML courses in Chennai?", answer: "Fees range from ₹1.5-4 LPA per year. SRM IST charges ₹3-4 LPA, Sathyabama ₹1.5-2.5 LPA, VIT Chennai ₹2.5-3.5 LPA, and Saveetha ₹1.5-2 LPA. Government college fees are minimal at ₹25K-50K/year." },
  { question: "What are the placement prospects for AI/ML in Chennai?", answer: "AI/ML graduates are highly sought after. Top recruiters include Google, Microsoft, Amazon, Zoho, Freshworks, TCS, and Infosys. Starting packages range from ₹6-20 LPA depending on the college and skills." },
  { question: "What is the eligibility for B.Tech AI/ML?", answer: "Minimum 50-60% in 12th standard with Physics, Chemistry, and Mathematics. Admission through TNEA counseling, SRMJEEE, VITEEE, or college-specific entrance exams. Some colleges also accept JEE Main scores." },
];

export const metadata: Metadata = {
  title: "AI & ML Colleges in Chennai 2025 — Artificial Intelligence & Data Science | EduMadras",
  description: "Best AI/ML and Data Science colleges in Chennai 2025. B.Tech Artificial Intelligence fees, placements & admission. Free counseling.",
  keywords: "ai ml colleges in chennai, artificial intelligence colleges chennai, data science colleges chennai, btech ai ml chennai",
  alternates: { canonical: "https://www.edumadras.com/ai-ml-colleges-chennai" },
  openGraph: { title: "AI & ML Colleges in Chennai 2025 | EduMadras", url: "https://www.edumadras.com/ai-ml-colleges-chennai", siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai", limit: 40 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="AI & ML Colleges in Chennai" h1={H1} subtitle="Every college in Chennai offering B.Tech in Artificial Intelligence, Machine Learning & Data Science — the hottest engineering branches of 2025." introText="Artificial Intelligence & Machine Learning (AI/ML) is the fastest-growing engineering branch with the highest demand and starting salaries. Chennai's booming tech ecosystem — with Google, Microsoft, Zoho, and Freshworks having major AI teams here — makes it an ideal city for AI/ML education. This guide lists every college in Chennai offering B.Tech in AI/ML, AI & Data Science, and related specializations with verified fee and placement data." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl="https://www.edumadras.com/ai-ml-colleges-chennai" filterLabel="AI / ML / Data Science" />
    </>
  );
}
