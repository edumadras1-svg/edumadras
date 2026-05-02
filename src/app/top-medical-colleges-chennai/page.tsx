import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/top-medical-colleges-chennai";
const H1 = "Top Medical Colleges in Chennai 2025";
const BREADCRUMBS = [{ label: "Top Medical Chennai", href: "/top-medical-colleges-chennai" }];
const FAQ_ITEMS = [{ question: "How many medical colleges are in Chennai?", answer: "Chennai has approximately 15+ medical colleges including 4 government and several private institutions." }, { question: "Which Chennai medical college has the best hospital?", answer: "Rajiv Gandhi Government General Hospital (MMC) and Sri Ramachandra Hospital are among the best teaching hospitals in Chennai." }];

export const metadata: Metadata = {
  title: "Top Medical Colleges in Chennai 2025 | EduMadras",
  description: "Top medical colleges in Chennai — government & private. NIRF rankings, NEET cutoffs & MBBS fees.",
  keywords: "top medical colleges in chennai",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Top Medical Colleges in Chennai 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Medical", city: "Chennai" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Top Medical Colleges in Chennai 2025" h1={H1} subtitle="Top medical colleges in Chennai — government & private. NIRF rankings, NEET cutoffs & MBBS fees." introText="Chennai is one of India's premier medical education destinations with a mix of historic government colleges and modern private universities. This comprehensive ranking covers all top medical colleges with NIRF scores, NEET cutoffs, and verified fee structures." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="" />
    </>
  );
}
