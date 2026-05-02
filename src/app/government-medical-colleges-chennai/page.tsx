import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/government-medical-colleges-chennai";
const H1 = "Government Medical Colleges in Chennai 2025 — NEET Cutoff & Fees";
const BREADCRUMBS = [{ label: "Govt. Medical Chennai", href: "/government-medical-colleges-chennai" }];
const FAQ_ITEMS = [{ question: "Which government medical colleges are in Chennai?", answer: "Madras Medical College, Stanley Medical College, Kilpauk Medical College, and Omandurar Government Medical College are the main government institutions." }, { question: "What is the MBBS fee in government medical colleges?", answer: "Government medical college fees are approximately ₹13,000-30,000 per year — significantly cheaper than private colleges." }];

export const metadata: Metadata = {
  title: "Government Medical Colleges in Chennai 2025 | EduMadras",
  description: "All government medical colleges in Chennai with MBBS fees, NEET cutoffs, seats & facilities.",
  keywords: "government medical colleges in chennai",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Government Medical Colleges in Chennai 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Medical", city: "Chennai", type: "Government" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Government Medical Colleges in Chennai 2025" h1={H1} subtitle="All government medical colleges in Chennai with MBBS fees, NEET cutoffs, seats & facilities." introText="Chennai's government medical colleges offer MBBS education at minimal fees with excellent clinical exposure across government hospitals. Institutions like MMC, Stanley, Kilpauk, and Omandurar provide world-class medical training at highly affordable costs." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Government" />
    </>
  );
}
