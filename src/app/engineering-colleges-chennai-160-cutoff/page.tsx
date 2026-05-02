import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/engineering-colleges-chennai-160-cutoff";
const H1 = "Engineering Colleges in Chennai — 160 Cutoff 2025";
const BREADCRUMBS = [{ label: "160 Cutoff", href: "/engineering-colleges-chennai-160-cutoff" }];
const FAQ_ITEMS = [{ question: "Is 160 cutoff good for engineering in Chennai?", answer: "160 is a competitive cutoff that opens doors to many good colleges including some branches at top-tier private institutions." }, { question: "Can I get CSE at a good college with 160?", answer: "Yes, CSE and IT seats are available at several reputed colleges like Sairam, Rajalakshmi, and Panimalar at 160 cutoff." }];

export const metadata: Metadata = {
  title: "Engineering Colleges in Chennai with 160 Cutoff 2025 | EduMadras",
  description: "Engineering colleges in Chennai accepting 160 TNEA cutoff with branch-wise details.",
  keywords: "160 cutoff engineering colleges in chennai",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Engineering Colleges in Chennai with 160 Cutoff 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Engineering Colleges in Chennai with 160 Cutoff 2025" h1={H1} subtitle="Engineering colleges in Chennai accepting 160 TNEA cutoff with branch-wise details." introText="With a 160 TNEA cutoff, you have access to a wider range of engineering colleges and branches in Chennai. This page provides the complete list of colleges and branches available at the 160 cutoff range." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="160 Cutoff" />
    </>
  );
}
