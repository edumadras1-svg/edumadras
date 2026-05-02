import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/top-20-arts-science-colleges-tamilnadu";
const H1 = "Top 20 Arts and Science Colleges in Tamil Nadu 2025";
const BREADCRUMBS = [{ label: "Top 20 A&S TN", href: "/top-20-arts-science-colleges-tamilnadu" }];
const FAQ_ITEMS = [{ question: "How many arts and science colleges are in Tamil Nadu?", answer: "Tamil Nadu has over 700 arts and science colleges across government, aided, and self-financing categories." }, { question: "Which district has the most arts colleges in TN?", answer: "Chennai has the highest concentration, followed by Coimbatore, Madurai, and Tiruchirappalli." }];

export const metadata: Metadata = {
  title: "Top 20 Arts and Science Colleges in Tamil Nadu 2025 | EduMadras",
  description: "Top 20 arts and science colleges in Tamil Nadu with NAAC rankings, courses & fees.",
  keywords: "top 20 arts and science colleges in tamilnadu",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Top 20 Arts and Science Colleges in Tamil Nadu 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Arts & Science", state: "Tamil Nadu", limit: 20 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Top 20 Arts and Science Colleges in Tamil Nadu 2025" h1={H1} subtitle="Top 20 arts and science colleges in Tamil Nadu with NAAC rankings, courses & fees." introText="This expanded list of 20 arts and science colleges covers top institutions across all major cities in Tamil Nadu. From Loyola College in Chennai to PSG CAS in Coimbatore, find verified data on courses, fees, and campus facilities." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Top 20" />
    </>
  );
}
