import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/engineering-colleges-chennai-150-cutoff";
const H1 = "Engineering Colleges in Chennai — 150 Cutoff 2025";
const BREADCRUMBS = [{ label: "150 Cutoff", href: "/engineering-colleges-chennai-150-cutoff" }];
const FAQ_ITEMS = [{ question: "Which colleges accept 150 cutoff in Chennai?", answer: "At 150 cutoff, you can get admission in colleges like Jeppiaar, Panimalar, Sairam, and several other well-established private engineering colleges." }, { question: "What branches are available at 150 cutoff?", answer: "CSE, IT, ECE, EEE, Mechanical, and Civil branches are typically available at various colleges with 150 cutoff." }];

export const metadata: Metadata = {
  title: "Engineering Colleges in Chennai with 150 Cutoff 2025 | EduMadras",
  description: "Engineering colleges in Chennai accepting 150 TNEA cutoff. Complete list with fees & branches.",
  keywords: "150 cutoff engineering colleges in chennai",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Engineering Colleges in Chennai with 150 Cutoff 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Engineering Colleges in Chennai with 150 Cutoff 2025" h1={H1} subtitle="Engineering colleges in Chennai accepting 150 TNEA cutoff. Complete list with fees & branches." introText="A 150 TNEA cutoff opens doors to many solid engineering colleges in Chennai. This comprehensive list shows all colleges that admitted students at the 150 cutoff range, with branch-wise availability and fee details." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="150 Cutoff" />
    </>
  );
}
