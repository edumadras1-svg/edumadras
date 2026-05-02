import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/top-5-arts-science-colleges-chennai";
const H1 = "Top 5 Arts and Science Colleges in Chennai 2025";
const BREADCRUMBS = [{ label: "Top 5 A&S", href: "/top-5-arts-science-colleges-chennai" }];
const FAQ_ITEMS = [{ question: "Which are the top 5 arts colleges in Chennai?", answer: "Loyola College, Stella Maris College, Presidency College, Madras Christian College, and Ethiraj College are widely considered the top 5." }, { question: "How to get admission in these top colleges?", answer: "Apply directly through college websites based on +2 marks. Some conduct entrance exams. Apply early as seats fill fast." }];

export const metadata: Metadata = {
  title: "Top 5 Arts and Science Colleges in Chennai 2025 | EduMadras",
  description: "The 5 best arts and science colleges in Chennai — NAAC rankings, courses & fees.",
  keywords: "top 5 arts and science colleges in chennai",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Top 5 Arts and Science Colleges in Chennai 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Arts & Science", city: "Chennai", limit: 5 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Top 5 Arts and Science Colleges in Chennai 2025" h1={H1} subtitle="The 5 best arts and science colleges in Chennai — NAAC rankings, courses & fees." introText="Looking for only the very best? These 5 arts and science colleges in Chennai represent the absolute elite — each with NAAC A++ or A+ accreditation, decades of academic excellence, and strong alumni networks." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Top 5" />
    </>
  );
}
