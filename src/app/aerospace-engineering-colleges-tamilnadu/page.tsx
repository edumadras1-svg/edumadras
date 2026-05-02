import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/aerospace-engineering-colleges-tamilnadu";
const H1 = "Aerospace Engineering Colleges in Tamil Nadu 2025";
const BREADCRUMBS = [{ label: "Aerospace TN", href: "/aerospace-engineering-colleges-tamilnadu" }];
const FAQ_ITEMS = [{ question: "Which TN colleges offer aerospace engineering?", answer: "MIT Anna University, Kumaraguru College (Coimbatore), Hindusthan College, and others offer B.E/B.Tech in Aerospace Engineering." }, { question: "Is aerospace engineering a good career in India?", answer: "Yes — with ISRO expansion, defense modernization, and private space companies, demand for aerospace engineers is growing rapidly." }];

export const metadata: Metadata = {
  title: "Aerospace Engineering Colleges in Tamil Nadu 2025 | EduMadras",
  description: "Complete list of aerospace engineering colleges in Tamil Nadu with fees, placements & admissions.",
  keywords: "aerospace engineering colleges in tamilnadu",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Aerospace Engineering Colleges in Tamil Nadu 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", state: "Tamil Nadu" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Aerospace Engineering Colleges in Tamil Nadu 2025" h1={H1} subtitle="Complete list of aerospace engineering colleges in Tamil Nadu with fees, placements & admissions." introText="Tamil Nadu offers strong aerospace engineering programs across multiple cities. From IIT Madras research labs to dedicated aerospace departments at MIT Anna University and private colleges, the state provides excellent foundation for careers in aerospace and defense." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Aerospace" />
    </>
  );
}
