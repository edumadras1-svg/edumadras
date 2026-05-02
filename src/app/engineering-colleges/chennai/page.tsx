import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/engineering-colleges/chennai";
const H1 = "Best Engineering Colleges in Chennai 2025";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges/chennai" }, { label: "Chennai", href: "/engineering-colleges/chennai" }];
const FAQ_ITEMS = [
  { question: "Which is the best engineering college in Chennai?", answer: "IIT Madras is the top-ranked engineering college in Chennai, consistently holding the #1 NIRF rank. Other top colleges include Anna University (CEG), SSN College of Engineering, and SRM Institute of Science and Technology." },
  { question: "What is the average fee for engineering colleges in Chennai?", answer: "Government engineering colleges in Chennai charge ₹25,000–₹50,000/year. Private colleges range from ₹1–4 lakhs/year depending on the institution and course." },
  { question: "Which Chennai engineering colleges have the best placements?", answer: "IIT Madras, SSN College, CEG Anna University, and SRM have excellent placement records with average packages ranging from ₹8–25 LPA." },
  { question: "Can I get admission without JEE in Chennai engineering colleges?", answer: "Yes! Most Tamil Nadu engineering colleges accept TNEA counseling based on +2 marks. Only IITs and NITs require JEE scores. Contact our counselors for guidance." },
];

export const metadata: Metadata = {
  title: "Best Engineering Colleges in Chennai 2025 — Fees, Rankings & Placements | EduMadras",
  description: "Explore the best engineering colleges in Chennai. Compare NIRF rankings, fee structures, placement records, cutoffs & courses. Get free expert counseling for admissions 2026.",
  keywords: "best engineering colleges in chennai, top engineering colleges in chennai, engineering colleges chennai, engineering colleges in chennai fees, engineering colleges chennai placement",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Best Engineering Colleges in Chennai 2025 | EduMadras", description: "Complete guide to engineering colleges in Chennai — rankings, fees, placements & admission process.", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Best Engineering Colleges in Chennai" h1={H1} subtitle="Complete guide to top engineering institutions in Chennai — NIRF rankings, fees, placements & admissions." introText="Chennai is India's engineering education capital, home to prestigious institutions like IIT Madras, Anna University, and SSN College of Engineering. Whether you're looking for government colleges with affordable fees or top private institutions with excellent placements, Chennai offers a diverse range of engineering colleges across all branches. Below is a comprehensive, rank-wise list of the best engineering colleges in Chennai with verified fee structures, placement statistics, and admission details for the 2026 academic year." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Chennai" />
    </>
  );
}
