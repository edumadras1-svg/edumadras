import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/top-10-arts-science-colleges-chennai";
const H1 = "Top 10 Arts and Science Colleges in Chennai 2025";
const BREADCRUMBS = [{ label: "Top 10 A&S", href: "/top-10-arts-science-colleges-chennai" }];
const FAQ_ITEMS = [{ question: "What are the top 10 arts and science colleges in Chennai?", answer: "Loyola College, Stella Maris College, Presidency College, MCC, Ethiraj College, WCC, and others form the top 10." }, { question: "Which Chennai arts college has the best placements?", answer: "Loyola College and MCC have strong placement cells with companies recruiting for IT, banking, and consulting roles." }];

export const metadata: Metadata = {
  title: "Top 10 Arts and Science Colleges in Chennai 2025 | EduMadras",
  description: "Top 10 arts and science colleges in Chennai ranked by NAAC, placements & academics.",
  keywords: "top 10 arts and science colleges in chennai",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Top 10 Arts and Science Colleges in Chennai 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Arts & Science", city: "Chennai", limit: 10 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Top 10 Arts and Science Colleges in Chennai 2025" h1={H1} subtitle="Top 10 arts and science colleges in Chennai ranked by NAAC, placements & academics." introText="This curated list of the top 10 arts and science colleges in Chennai includes prestigious institutions like Loyola College, Stella Maris, and Presidency College ranked by NAAC accreditation, placement records, and academic excellence." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Top 10" />
    </>
  );
}
