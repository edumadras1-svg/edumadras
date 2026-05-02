import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/engineering-colleges-chennai-without-jee";
const H1 = "Engineering Colleges in Chennai Without JEE — Direct Admission 2025";
const BREADCRUMBS = [{ label: "Without JEE", href: "/engineering-colleges-chennai-without-jee" }];
const FAQ_ITEMS = [{ question: "Can I study engineering in Chennai without JEE?", answer: "Yes! Over 95% of Chennai engineering colleges accept TNEA counseling based on +2 marks. Only IIT Madras and NIT require JEE Main/Advanced." }, { question: "What is TNEA counseling?", answer: "TNEA (Tamil Nadu Engineering Admissions) is the state-level online counseling process conducted by Anna University based on +2 PCM marks." }];

export const metadata: Metadata = {
  title: "Engineering Colleges in Chennai Without JEE 2025 | EduMadras",
  description: "Engineering colleges in Chennai that don't require JEE. TNEA-based admission, fees & placements.",
  keywords: "engineering colleges in chennai without jee",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Engineering Colleges in Chennai Without JEE 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Engineering Colleges in Chennai Without JEE 2025" h1={H1} subtitle="Engineering colleges in Chennai that don't require JEE. TNEA-based admission, fees & placements." introText="Don't have a JEE score? No problem. The vast majority of engineering colleges in Chennai accept students through TNEA counseling based on +2 marks alone. Only IITs and NITs require JEE. This guide lists all non-JEE engineering colleges in Chennai." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="No JEE" />
    </>
  );
}
