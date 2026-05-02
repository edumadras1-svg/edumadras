import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/marine-engineering-colleges-tamilnadu";
const H1 = "Marine Engineering Colleges in Tamil Nadu 2025";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges/tamilnadu" }, { label: "Marine", href: "/marine-engineering-colleges-tamilnadu" }];
const FAQ_ITEMS = [{ question: "Which colleges offer marine engineering in Tamil Nadu?", answer: "Indian Maritime University (Chennai), AMET University, Coimbatore Marine College, and several other institutions across Tamil Nadu offer B.E/B.Tech in Marine Engineering." }, { question: "What is the salary after marine engineering?", answer: "Marine engineers earn excellent salaries starting from ₹6-12 LPA for freshers. With experience, senior marine engineers can earn ₹30-60 LPA in international shipping companies." }, { question: "What is the eligibility for marine engineering?", answer: "+2 with Physics, Chemistry & Maths with minimum 60% aggregate. Good eyesight and physical fitness are mandatory. Admission through IMU CET or TNEA." }];

export const metadata: Metadata = {
  title: "Marine Engineering Colleges in Tamil Nadu 2025 — Fees & Admissions | EduMadras",
  description: "Complete list of marine engineering colleges in Tamil Nadu. Compare fees, placements, eligibility & courses for B.E/B.Tech Marine Engineering. Free counseling.",
  keywords: "marine engineering colleges in tamilnadu, marine engineering colleges tamilnadu fees, best marine engineering colleges tamilnadu",
  alternates: { canonical: "https://edumadras.com/marine-engineering-colleges-tamilnadu" },
  openGraph: { title: "Marine Engineering Colleges in Tamil Nadu | EduMadras", url: "https://edumadras.com/marine-engineering-colleges-tamilnadu", siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", state: "Tamil Nadu" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Marine Engineering Colleges in Tamil Nadu" h1={H1} subtitle="Top colleges offering B.E/B.Tech in Marine Engineering across Tamil Nadu with fees & placement data." introText="Tamil Nadu, with its extensive coastline and proximity to major ports, is an ideal state for marine engineering education. Institutions like the Indian Maritime University (Chennai), AMET University, and other colleges offer comprehensive marine engineering programs with strong industry connections to shipping companies, port authorities, and offshore engineering firms. This guide covers all marine engineering colleges in Tamil Nadu with verified fee structures, placement records, and admission criteria for the 2026 academic year." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl="https://edumadras.com/marine-engineering-colleges-tamilnadu" filterLabel="Marine" />
    </>
  );
}
