import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/top-arts-science-colleges-chennai";
const H1 = "Top Arts and Science Colleges in Chennai 2025";
const BREADCRUMBS = [{ label: "Top A&S Colleges", href: "/top-arts-science-colleges-chennai" }];
const FAQ_ITEMS = [{ question: "Which arts and science college is best in Chennai?", answer: "Loyola College is consistently ranked #1 among arts and science colleges in Chennai based on NAAC, placements, and academic reputation." }, { question: "What is the admission process?", answer: "Most colleges admit based on +2 marks via direct applications. Top colleges may have entrance tests or merit-based cutoffs." }];

export const metadata: Metadata = {
  title: "Top Arts and Science Colleges in Chennai 2025 | EduMadras",
  description: "Best arts and science colleges in Chennai with rankings, courses, fees & placements.",
  keywords: "top arts and science colleges in chennai",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Top Arts and Science Colleges in Chennai 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Arts & Science", city: "Chennai" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Top Arts and Science Colleges in Chennai 2025" h1={H1} subtitle="Best arts and science colleges in Chennai with rankings, courses, fees & placements." introText="Chennai is home to some of India's finest arts and science colleges offering diverse programs in sciences, humanities, commerce, and computer applications. This comprehensive guide ranks every top institution with verified data." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="" />
    </>
  );
}
