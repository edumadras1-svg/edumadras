import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/engineering-colleges-chennai-cse-fees";
const H1 = "Engineering Colleges in Chennai for CSE — Complete Fee Structure 2025";
const BREADCRUMBS = [{ label: "CSE Fees", href: "/engineering-colleges-chennai-cse-fees" }];
const FAQ_ITEMS = [{ question: "What is the CSE fee in Chennai engineering colleges?", answer: "Government: ₹25-50K/year. Top private (SRM, VIT): ₹2-4L/year. Mid-tier private: ₹1-2L/year." }, { question: "Which college has the best CSE placements in Chennai?", answer: "IIT Madras leads with ₹20+ LPA. SSN, Anna University CEG, and SRM also have strong CSE placement records." }];

export const metadata: Metadata = {
  title: "Engineering Colleges in Chennai for CSE with Fees 2025 | EduMadras",
  description: "All engineering colleges in Chennai offering CSE/IT with detailed fee structures and placement data.",
  keywords: "engineering colleges in chennai for cse with fees",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Engineering Colleges in Chennai for CSE with Fees 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Engineering Colleges in Chennai for CSE with Fees 2025" h1={H1} subtitle="All engineering colleges in Chennai offering CSE/IT with detailed fee structures and placement data." introText="Computer Science Engineering (CSE) is the most sought-after branch in Chennai. This guide provides a complete, verified fee comparison for every engineering college offering CSE/IT in Chennai — from affordable government colleges to premium private institutions." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="CSE" />
    </>
  );
}
