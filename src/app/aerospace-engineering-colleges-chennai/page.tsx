import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/aerospace-engineering-colleges-chennai";
const H1 = "Aerospace Engineering Colleges in Chennai 2025";
const BREADCRUMBS = [{ label: "Aerospace Chennai", href: "/aerospace-engineering-colleges-chennai" }];
const FAQ_ITEMS = [{ question: "What is the difference between aeronautical and aerospace engineering?", answer: "Aerospace covers both atmospheric (aeronautical) and space (astronautical) engineering. Aeronautical focuses only on aircraft within Earth's atmosphere." }, { question: "Which Chennai college is best for aerospace?", answer: "MIT Anna University and IIT Madras (at PG level) are the top choices for aerospace engineering in Chennai." }];

export const metadata: Metadata = {
  title: "Aerospace Engineering Colleges in Chennai 2025 | EduMadras",
  description: "Aerospace engineering colleges in Chennai — fees, placements, eligibility & admission process.",
  keywords: "aerospace engineering colleges in chennai",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Aerospace Engineering Colleges in Chennai 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Aerospace Engineering Colleges in Chennai 2025" h1={H1} subtitle="Aerospace engineering colleges in Chennai — fees, placements, eligibility & admission process." introText="Aerospace engineering in Chennai combines aeronautical and astronautical engineering disciplines. Top institutions offer cutting-edge programs with research opportunities in satellite technology, propulsion systems, and aircraft design." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Aerospace" />
    </>
  );
}
