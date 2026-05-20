import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://www.edumadras.com/cse-colleges-chennai";
const H1 = "Computer Science Engineering (CSE) Colleges in Chennai 2025";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges/chennai" }, { label: "CSE Colleges", href: "/cse-colleges-chennai" }];
const FAQ_ITEMS = [
  { question: "Which college is best for CSE in Chennai?", answer: "IIT Madras is the best for CSE in Chennai with NIRF #1 ranking. Among private colleges, SSN College, SRM IST, and Anna University CEG have the strongest CSE programs." },
  { question: "What is the CSE cutoff for top Chennai colleges?", answer: "TNEA cutoffs for CSE: Anna University CEG (195-200), MIT Anna University (190-195), SSN College (185-190). JEE Advanced rank under 1000 for IIT Madras CSE." },
  { question: "What is the fee for CSE in Chennai colleges?", answer: "CSE fees: Government colleges (₹25K-50K/year), SSN (₹2 LPA/year), SRM IST (₹3-4 LPA/year), Sathyabama (₹1.5-2.5 LPA/year)." },
  { question: "What are the placement statistics for CSE in Chennai?", answer: "CSE has the highest placement rate. Top recruiters include Google, Amazon, Microsoft, TCS, and Infosys. Average CSE package in top 20 Chennai colleges is ₹8-15 LPA." },
  { question: "Which Chennai colleges offer CSE with AI/ML specialization?", answer: "SRM IST (CSE with AI/ML, Blockchain), Sathyabama (CSE with AI, Cyber Security), Saveetha (CSE with Data Science), and VIT Chennai (CSE with Cloud Computing)." },
];

export const metadata: Metadata = {
  title: "CSE Colleges in Chennai 2025 — Computer Science Engineering Fees & Placements | EduMadras",
  description: "Best Computer Science Engineering (CSE) colleges in Chennai 2025. Compare CSE fees, cutoffs, placements & admission. Free counseling.",
  keywords: "cse colleges in chennai, computer science engineering colleges chennai, best cse colleges chennai",
  alternates: { canonical: "https://www.edumadras.com/cse-colleges-chennai" },
  openGraph: { title: "CSE Colleges in Chennai 2025 | EduMadras", url: "https://www.edumadras.com/cse-colleges-chennai", siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai", limit: 40 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="CSE Colleges in Chennai" h1={H1} subtitle="Every engineering college in Chennai offering Computer Science Engineering — with CSE-specific cutoffs, fees, and placement data." introText="Computer Science Engineering (CSE) is the most sought-after branch in Chennai. This guide lists every college offering B.Tech/B.E. in Computer Science — from IIT Madras to affordable mid-tier colleges with strong tech placements. Includes CSE-specific data on TNEA cutoffs, fees, and placement packages from Google, Amazon, Microsoft, and TCS." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl="https://www.edumadras.com/cse-colleges-chennai" filterLabel="CSE / Computer Science" />
    </>
  );
}
