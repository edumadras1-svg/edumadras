import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/medical-colleges/chennai";
const H1 = "Best Medical Colleges in Chennai 2025 — NEET Cutoff & Fees";
const BREADCRUMBS = [{ label: "Medical Colleges", href: "/medical-colleges/chennai" }, { label: "Chennai", href: "/medical-colleges/chennai" }];
const FAQ_ITEMS = [
  { question: "How many medical colleges are there in Chennai?", answer: "Chennai has approximately 15+ medical colleges including government institutions like Madras Medical College, Stanley Medical College, and Kilpauk Medical College, plus top private institutions." },
  { question: "What is the NEET cutoff for medical colleges in Chennai?", answer: "Government medical college NEET cutoffs in Chennai typically range from 550-650+ marks. Private colleges accept scores from 400+ depending on the category and management quota." },
  { question: "What is the MBBS fee in Chennai government medical colleges?", answer: "Government medical college MBBS fees in Chennai are approximately ₹13,000–₹30,000 per year. Private medical college fees range from ₹10–25 lakhs per year." },
  { question: "Which is the best medical college in Chennai?", answer: "Madras Medical College (MMC) is the oldest and most prestigious government medical college in Chennai. Sri Ramachandra and SRM Medical College are top private choices." },
];

export const metadata: Metadata = {
  title: "Medical Colleges in Chennai 2025 — Fees, NEET Cutoff & Admissions | EduMadras",
  description: "Complete list of medical colleges in Chennai — government & private. Compare MBBS fees, NEET cutoffs, seats, placement records & hostel facilities. Free counseling for MBBS admissions 2026.",
  keywords: "medical colleges in chennai, best medical colleges in chennai, government medical colleges in chennai, private medical colleges chennai, mbbs colleges chennai",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Medical Colleges in Chennai 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Medical", city: "Chennai" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Medical Colleges in Chennai" h1={H1} subtitle="Government & private medical colleges in Chennai with MBBS fees, NEET cutoffs, and admission guidance." introText="Chennai is a premier destination for medical education in India, home to iconic institutions like Madras Medical College, Stanley Medical College, and Sri Ramachandra Institute. With both government colleges offering affordable MBBS programs and top private institutions with excellent clinical exposure, Chennai provides diverse options for aspiring doctors. This page lists all medical colleges in Chennai with verified NEET cutoffs, fee structures, seat counts, and admission details for the 2026 academic year." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Chennai" />
    </>
  );
}
