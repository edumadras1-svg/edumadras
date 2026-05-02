import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/government-medical-colleges-chennai-top-10";
const H1 = "Top 10 Government Medical Colleges in Chennai 2025";
const BREADCRUMBS = [{ label: "Top 10 Govt Medical", href: "/government-medical-colleges-chennai-top-10" }];
const FAQ_ITEMS = [{ question: "How many government medical colleges are in Chennai?", answer: "Chennai has 4 major government medical colleges: Madras Medical College, Stanley, Kilpauk, and Omandurar." }, { question: "What is the NEET cutoff for government medical colleges?", answer: "General category requires 600+ NEET marks. OBC: 550+. SC/ST: 450+. Cutoffs vary year to year." }];

export const metadata: Metadata = {
  title: "Top 10 Government Medical Colleges in Chennai 2025 | EduMadras",
  description: "Top 10 government medical colleges in Chennai with NEET cutoffs, fees & facilities.",
  keywords: "top 10 government medical colleges in chennai",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Top 10 Government Medical Colleges in Chennai 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Medical", city: "Chennai", type: "Government", limit: 10 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Top 10 Government Medical Colleges in Chennai 2025" h1={H1} subtitle="Top 10 government medical colleges in Chennai with NEET cutoffs, fees & facilities." introText="Chennai's government medical colleges provide world-class MBBS education at minimal fees with excellent clinical training across government hospitals. This list ranks the top 10 government medical institutions in Chennai." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Government" />
    </>
  );
}
