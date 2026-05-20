import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://www.edumadras.com/ece-colleges-chennai";
const H1 = "ECE Colleges in Chennai 2025 — Electronics & Communication Engineering";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges/chennai" }, { label: "ECE Colleges", href: "/ece-colleges-chennai" }];
const FAQ_ITEMS = [
  { question: "Which is the best ECE college in Chennai?", answer: "IIT Madras leads for ECE with cutting-edge research in VLSI, embedded systems, and semiconductor design. SSN College, Anna University CEG, and SRM IST also have top-ranked ECE departments with strong placements." },
  { question: "What is the scope of ECE in 2025?", answer: "ECE is booming with India's semiconductor push (India Semiconductor Mission), 5G rollout, IoT growth, and embedded systems demand. Companies like Texas Instruments, Qualcomm, Intel, and Samsung actively recruit ECE graduates from Chennai colleges." },
  { question: "What is the average ECE placement in Chennai colleges?", answer: "Top colleges average ₹6-12 LPA for ECE. Core companies like Texas Instruments, Qualcomm offer ₹12-25 LPA. IT companies offer ₹4-8 LPA. ECE graduates also get placed in software roles at ₹5-15 LPA." },
  { question: "What is the TNEA cutoff for ECE in Chennai?", answer: "TNEA cutoffs for ECE: Anna University CEG (185-192), MIT Anna University (180-185), SSN College (178-183). ECE cutoffs are typically 5-10 marks lower than CSE at most colleges." },
  { question: "Can ECE students get IT/software jobs?", answer: "Yes! Many ECE graduates from Chennai colleges get placed in IT/software companies. Companies like TCS, Infosys, Cognizant, and Wipro recruit ECE students. Having programming skills alongside ECE knowledge makes graduates highly versatile." },
];

export const metadata: Metadata = {
  title: "ECE Colleges in Chennai 2025 — Electronics & Communication Engineering | EduMadras",
  description: "Best Electronics & Communication Engineering (ECE) colleges in Chennai 2025. Compare fees, placements, cutoffs. Free admission counseling.",
  keywords: "ece colleges in chennai, electronics and communication engineering colleges chennai, best ece colleges chennai",
  alternates: { canonical: "https://www.edumadras.com/ece-colleges-chennai" },
  openGraph: { title: "ECE Colleges in Chennai 2025 | EduMadras", url: "https://www.edumadras.com/ece-colleges-chennai", siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai", limit: 40 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="ECE Colleges in Chennai" h1={H1} subtitle="Complete list of colleges offering Electronics & Communication Engineering in Chennai — with ECE-specific placements, cutoffs & fees." introText="Electronics & Communication Engineering (ECE) is one of the most versatile engineering branches in Chennai, opening doors to both core electronics (VLSI, semiconductors, embedded systems) and IT/software careers. With India's semiconductor mission creating massive demand and companies like Texas Instruments, Qualcomm, and Samsung having offices in Chennai, ECE graduates have exceptional career prospects. This guide covers every ECE college in Chennai with verified placement data and cutoff details." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl="https://www.edumadras.com/ece-colleges-chennai" filterLabel="ECE" />
    </>
  );
}
