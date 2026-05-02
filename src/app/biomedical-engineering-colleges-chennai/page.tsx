import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/biomedical-engineering-colleges-chennai";
const H1 = "Biomedical Engineering Colleges in Chennai 2025";
const BREADCRUMBS = [{ label: "Biomedical Chennai", href: "/biomedical-engineering-colleges-chennai" }];
const FAQ_ITEMS = [{ question: "Which Chennai colleges offer biomedical engineering?", answer: "SSN College, SRM Institute, Rajalakshmi Engineering College, and Sairam Engineering College offer B.E Biomedical Engineering." }, { question: "What is the career scope of biomedical engineering?", answer: "Growing field with opportunities in medical devices, healthcare IT, hospitals, and pharma companies. Average packages: ₹4-8 LPA." }];

export const metadata: Metadata = {
  title: "Biomedical Engineering Colleges in Chennai 2025 | EduMadras",
  description: "Biomedical engineering colleges in Chennai with fees, placements & course details.",
  keywords: "biomedical engineering colleges in chennai",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Biomedical Engineering Colleges in Chennai 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Biomedical Engineering Colleges in Chennai 2025" h1={H1} subtitle="Biomedical engineering colleges in Chennai with fees, placements & course details." introText="Chennai is a major hub for biomedical engineering education with its proximity to world-class hospitals and medical device companies. Colleges like SSN, Rajalakshmi, and SRM offer specialized BME programs with excellent industry exposure." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Biomedical" />
    </>
  );
}
