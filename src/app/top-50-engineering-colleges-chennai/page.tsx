import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/top-50-engineering-colleges-chennai";
const H1 = "Top 50 Engineering Colleges in Chennai 2025";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges/chennai" }, { label: "Top 50 Chennai", href: "/top-50-engineering-colleges-chennai" }];
const FAQ_ITEMS = [{ question: "How many engineering colleges are there in Chennai?", answer: "Chennai has approximately 100+ engineering colleges including government, government-aided, and self-financing institutions affiliated to Anna University." }, { question: "What is the cheapest engineering college in Chennai?", answer: "Government engineering colleges like CEG Anna University and MIT Anna University offer the most affordable engineering education at ₹25,000-50,000/year." }];

export const metadata: Metadata = {
  title: "Top 50 Engineering Colleges in Chennai 2025 — Complete List | EduMadras",
  description: "Complete list of top 50 engineering colleges in Chennai with NIRF rankings, fees, placements & cutoffs. Compare govt & private colleges. Free admission counseling.",
  keywords: "top 50 engineering colleges in chennai, engineering colleges in chennai list, all engineering colleges chennai",
  alternates: { canonical: "https://edumadras.com/top-50-engineering-colleges-chennai" },
  openGraph: { title: "Top 50 Engineering Colleges in Chennai 2025 | EduMadras", url: "https://edumadras.com/top-50-engineering-colleges-chennai", siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai", limit: 50 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Top 50 Engineering Colleges in Chennai" h1={H1} subtitle="The most comprehensive rank-wise list of engineering colleges in Chennai — covering all 50 top institutions." introText="Looking beyond just the top 10? This expanded list of 50 engineering colleges in Chennai covers everything from elite NIRF-ranked institutions to quality colleges with strong industry connections and affordable fees. Whether you're a high-scorer aiming for IIT Madras or looking for a solid college with good placement support, this list has you covered with verified data on fees, placements, and admission criteria." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl="https://edumadras.com/top-50-engineering-colleges-chennai" filterLabel="Top 50" />
    </>
  );
}
