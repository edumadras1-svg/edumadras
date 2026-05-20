import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://www.edumadras.com/civil-engineering-colleges-chennai";
const H1 = "Civil Engineering Colleges in Chennai 2025–2026";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges/chennai" }, { label: "Civil Engineering", href: "/civil-engineering-colleges-chennai" }];
const FAQ_ITEMS = [
  { question: "Which is the best college for Civil Engineering in Chennai?", answer: "IIT Madras and Anna University CEG are the top civil engineering colleges in Chennai. Both have excellent infrastructure labs, research output, and strong placements with companies like L&T, Shapoorji Pallonji, and government organizations like TNPWD." },
  { question: "What is the scope of Civil Engineering in 2025?", answer: "Civil Engineering has strong scope with India's infrastructure boom — Smart Cities Mission, metro rail expansions, highway construction (Bharatmala), and sustainable building practices. Tamil Nadu has major infrastructure projects creating consistent demand." },
  { question: "What is the average placement for Civil Engineering in Chennai?", answer: "Top colleges average ₹4-8 LPA for civil engineering. L&T Construction is the biggest recruiter offering ₹5-8 LPA. Government jobs (TNPSC AE/JE) are also popular with ₹5-7 LPA starting salary." },
  { question: "Is Civil Engineering still relevant?", answer: "Absolutely. With India spending $1.4 trillion on infrastructure, civil engineers are in high demand. New areas like sustainable construction, green buildings, smart infrastructure, and urban planning are creating premium career opportunities." },
  { question: "What government jobs can Civil Engineering graduates get?", answer: "Civil engineers can apply for TNPSC AE/JE, PWD, CPWD, Railways, TNHB, CMDA, and various municipal corporations. Government jobs offer ₹5-10 LPA with job security and benefits." },
];

export const metadata: Metadata = {
  title: "Civil Engineering Colleges in Chennai 2025 — Fees, Placements & Cutoffs | EduMadras",
  description: "Best Civil Engineering colleges in Chennai 2025. Compare fees, placements, cutoffs. IIT Madras, Anna University & more. Free counseling.",
  keywords: "civil engineering colleges in chennai, best civil engineering colleges chennai, civil engineering colleges chennai fees",
  alternates: { canonical: "https://www.edumadras.com/civil-engineering-colleges-chennai" },
  openGraph: { title: "Civil Engineering Colleges in Chennai 2025 | EduMadras", url: "https://www.edumadras.com/civil-engineering-colleges-chennai", siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai", limit: 40 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Civil Engineering Colleges in Chennai" h1={H1} subtitle="Complete list of Civil Engineering colleges in Chennai — with placement data from India's infrastructure boom." introText="Civil Engineering is experiencing renewed demand as India invests over $1.4 trillion in infrastructure development. Chennai, with its metro rail expansion, Smart City projects, and major highway construction, is an excellent city for civil engineering education. From IIT Madras to Anna University CEG and strong private options, this guide covers all civil engineering colleges in Chennai with verified placement and fee data." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl="https://www.edumadras.com/civil-engineering-colleges-chennai" filterLabel="Civil Engineering" />
    </>
  );
}
