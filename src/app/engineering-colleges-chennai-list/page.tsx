import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/engineering-colleges-chennai-list";
const H1 = "Engineering Colleges in Chennai — Complete Directory 2025";
const BREADCRUMBS = [{ label: "Full Directory", href: "/engineering-colleges-chennai-list" }];
const FAQ_ITEMS = [{ question: "How many engineering colleges are in Chennai?", answer: "Chennai has approximately 100+ engineering colleges including government, government-aided, and self-financing institutions." }, { question: "How to reach these colleges?", answer: "Most colleges are well-connected by Chennai Metro, MTC buses, and suburban trains. Check individual college pages for detailed directions." }];

export const metadata: Metadata = {
  title: "Engineering Colleges in Chennai — Complete List with Address 2025 | EduMadras",
  description: "Complete list of all engineering colleges in Chennai with address, contact details & location map.",
  keywords: "engineering colleges in chennai list with address",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Engineering Colleges in Chennai — Complete List with Address 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Engineering Colleges in Chennai — Complete List with Address 2025" h1={H1} subtitle="Complete list of all engineering colleges in Chennai with address, contact details & location map." introText="Looking for the complete directory of engineering colleges in Chennai? This page provides every AICTE-approved engineering college in Chennai with verified addresses, phone numbers, email contacts, and location details to help you plan campus visits." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Directory" />
    </>
  );
}
