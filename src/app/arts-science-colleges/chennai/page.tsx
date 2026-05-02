import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/arts-science-colleges/chennai";
const H1 = "Best Arts and Science Colleges in Chennai 2025";
const BREADCRUMBS = [{ label: "Arts & Science Colleges", href: "/arts-science-colleges/chennai" }, { label: "Chennai", href: "/arts-science-colleges/chennai" }];
const FAQ_ITEMS = [
  { question: "Which is the best arts and science college in Chennai?", answer: "Loyola College, Presidency College, Stella Maris College, and Madras Christian College are consistently ranked among the best arts and science colleges in Chennai." },
  { question: "What are the fees for arts and science colleges in Chennai?", answer: "Government colleges charge ₹500–₹5,000/year. Aided colleges range from ₹5,000–₹25,000/year. Self-financing colleges charge ₹20,000–₹1 lakh/year depending on the course." },
  { question: "What courses are offered in arts and science colleges?", answer: "Common courses include B.Sc (Physics, Chemistry, Maths, CS, IT), B.A (English, History, Economics), B.Com, BCA, BBA, and various PG programs like M.Sc, M.A, M.Com, and MBA." },
  { question: "How to get admission in arts and science colleges in Chennai?", answer: "Most colleges admit students based on +2 marks through direct applications. Some top colleges conduct entrance tests. Apply early as seats fill quickly. Contact our counselors for guidance." },
];

export const metadata: Metadata = {
  title: "Arts and Science Colleges in Chennai 2025 — Fees, Rankings & Courses | EduMadras",
  description: "Complete list of arts and science colleges in Chennai — government, aided & self-financing. Compare UG/PG courses, fees, affiliations & campus facilities. Free counseling.",
  keywords: "arts and science colleges in chennai, best arts and science colleges in chennai, government arts science colleges chennai, top arts science colleges chennai",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Arts & Science Colleges in Chennai 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Arts & Science", city: "Chennai" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Arts and Science Colleges in Chennai" h1={H1} subtitle="Government, aided & private arts and science colleges in Chennai with courses, fees & admission details." introText="Chennai offers a rich landscape of arts and science education with prestigious institutions like Loyola College, Stella Maris College, Presidency College, and Madras Christian College. These colleges offer diverse UG and PG programs in sciences, humanities, commerce, and computer applications. Whether you're looking for a government college with minimal fees or a top-ranked private institution, this comprehensive guide covers all arts and science colleges in Chennai with verified information for the 2026 admission cycle." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Chennai" />
    </>
  );
}
