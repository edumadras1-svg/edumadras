import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/aeronautical-engineering-colleges-chennai";
const H1 = "Aeronautical Engineering Colleges in Chennai 2025";
const BREADCRUMBS = [{ label: "Aeronautical Chennai", href: "/aeronautical-engineering-colleges-chennai" }];
const FAQ_ITEMS = [{ question: "Which Chennai colleges offer aeronautical engineering?", answer: "MIT Anna University, Hindustan Institute of Technology, Vel Tech, and Jeppiaar Engineering College offer B.E Aeronautical Engineering." }, { question: "What is the scope of aeronautical engineering from Chennai?", answer: "Excellent career prospects with ISRO, HAL, Boeing, Airbus, and defense organizations. Average packages range from ₹5-12 LPA." }];

export const metadata: Metadata = {
  title: "Aeronautical Engineering Colleges in Chennai 2025 | EduMadras",
  description: "Complete list of aeronautical engineering colleges in Chennai with fees, placements & admissions.",
  keywords: "aeronautical engineering colleges in chennai",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Aeronautical Engineering Colleges in Chennai 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Aeronautical Engineering Colleges in Chennai 2025" h1={H1} subtitle="Complete list of aeronautical engineering colleges in Chennai with fees, placements & admissions." introText="Chennai offers excellent options for aeronautical engineering education with colleges like MIT Anna University, Hindustan Institute of Technology, and Vel Tech offering specialized programs with strong industry connections to ISRO, HAL, and aerospace companies." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Aeronautical" />
    </>
  );
}
