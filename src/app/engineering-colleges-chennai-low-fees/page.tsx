import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/engineering-colleges-chennai-low-fees";
const H1 = "Engineering Colleges in Chennai with Low Fees 2025";
const BREADCRUMBS = [{ label: "Low Fees", href: "/engineering-colleges-chennai-low-fees" }];
const FAQ_ITEMS = [{ question: "Which engineering colleges in Chennai have the lowest fees?", answer: "Government colleges like CEG Anna University (₹25K/yr), MIT Anna University (₹25K/yr), and ACT (₹30K/yr) have the lowest fees." }, { question: "Can I get quality education at low-fee colleges?", answer: "Absolutely. Government colleges like Anna University CEG have better placements than many expensive private colleges." }];

export const metadata: Metadata = {
  title: "Engineering Colleges in Chennai with Low Fees 2025 | EduMadras",
  description: "Affordable engineering colleges in Chennai with low fees. Government & private colleges under ₹1 lakh/year.",
  keywords: "engineering colleges in chennai with low fees",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Engineering Colleges in Chennai with Low Fees 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Engineering Colleges in Chennai with Low Fees 2025" h1={H1} subtitle="Affordable engineering colleges in Chennai with low fees. Government & private colleges under ₹1 lakh/year." introText="Affordable engineering education in Chennai is accessible through government colleges with fees as low as ₹25,000/year and select private colleges under ₹1 lakh/year. This guide lists all budget-friendly engineering colleges with verified fee structures and placement data." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Low Fees" />
    </>
  );
}
