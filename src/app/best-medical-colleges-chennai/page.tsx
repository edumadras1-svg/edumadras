import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/best-medical-colleges-chennai";
const H1 = "Best Medical Colleges in Chennai 2025";
const BREADCRUMBS = [{ label: "Best Medical Chennai", href: "/best-medical-colleges-chennai" }];
const FAQ_ITEMS = [{ question: "Which is the best medical college in Chennai?", answer: "Madras Medical College (MMC) is the most prestigious government medical college. Sri Ramachandra and SRM Medical are top private choices." }, { question: "What NEET score is needed for medical colleges in Chennai?", answer: "Government colleges require 550-650+ NEET marks. Private colleges accept from 400+ depending on quota and category." }];

export const metadata: Metadata = {
  title: "Best Medical Colleges in Chennai 2025 — Rankings & NEET Cutoff | EduMadras",
  description: "Best medical colleges in Chennai ranked by NIRF. Compare NEET cutoffs, MBBS fees & placement records.",
  keywords: "best medical colleges in chennai",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Best Medical Colleges in Chennai 2025 — Rankings & NEET Cutoff | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Medical", city: "Chennai" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Best Medical Colleges in Chennai 2025 — Rankings & NEET Cutoff" h1={H1} subtitle="Best medical colleges in Chennai ranked by NIRF. Compare NEET cutoffs, MBBS fees & placement records." introText="Chennai is home to India's most prestigious medical institutions. From the historic Madras Medical College to modern private universities, the city offers diverse MBBS programs with excellent clinical training opportunities across government and private hospitals." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="" />
    </>
  );
}
