import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://www.edumadras.com/eee-colleges-chennai";
const H1 = "EEE Colleges in Chennai 2025 — Electrical & Electronics Engineering";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges/chennai" }, { label: "EEE Colleges", href: "/eee-colleges-chennai" }];
const FAQ_ITEMS = [
  { question: "Which is the best EEE college in Chennai?", answer: "IIT Madras and Anna University CEG are the top EEE colleges in Chennai. SRM IST and SSN College also have strong EEE departments with industry partnerships in power, renewable energy, and smart grid technologies." },
  { question: "What is the scope of EEE in 2025?", answer: "EEE has excellent scope with India's push for renewable energy, electric vehicles, smart grids, and power infrastructure. The Electric Vehicle sector alone is projected to create 10 million jobs by 2030." },
  { question: "What is the average placement for EEE in Chennai?", answer: "Top EEE colleges in Chennai average ₹5-10 LPA. Core companies like L&T, Schneider Electric, ABB, and Siemens recruit EEE graduates. Many also get placed in IT companies at ₹4-7 LPA." },
  { question: "Is EEE better than ECE?", answer: "Both are excellent choices. EEE focuses on power systems, electrical machines, and energy. ECE focuses on electronics, communications, and semiconductors. EEE has better core job prospects in power sector; ECE has more IT crossover opportunities." },
  { question: "What are the top companies recruiting EEE graduates in Chennai?", answer: "Top recruiters include L&T, Schneider Electric, ABB, Siemens, BHEL, TNEB, Ashok Leyland, Hyundai, and TCS. The renewable energy sector (Tata Power Solar, Adani Green) is also actively recruiting." },
];

export const metadata: Metadata = {
  title: "EEE Colleges in Chennai 2025 — Electrical & Electronics Engineering | EduMadras",
  description: "Best Electrical & Electronics Engineering (EEE) colleges in Chennai 2025. Compare fees, placements, cutoffs. Free admission counseling.",
  keywords: "eee colleges in chennai, electrical engineering colleges chennai, best eee colleges chennai",
  alternates: { canonical: "https://www.edumadras.com/eee-colleges-chennai" },
  openGraph: { title: "EEE Colleges in Chennai 2025 | EduMadras", url: "https://www.edumadras.com/eee-colleges-chennai", siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai", limit: 40 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="EEE Colleges in Chennai" h1={H1} subtitle="All Electrical & Electronics Engineering colleges in Chennai — with EEE-specific placements, cutoffs & fee details." introText="Electrical & Electronics Engineering (EEE) is experiencing a renaissance in Chennai with India's massive push for renewable energy, electric vehicles, and smart grid infrastructure. Chennai's strong industrial base with companies like L&T, Schneider Electric, ABB, and the city's growing EV ecosystem makes it an ideal destination for EEE. This guide covers every college offering EEE in Chennai." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl="https://www.edumadras.com/eee-colleges-chennai" filterLabel="EEE" />
    </>
  );
}
