import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/engineering-colleges-chennai-140-cutoff";
const H1 = "Engineering Colleges in Chennai — 140 Cutoff 2025";
const BREADCRUMBS = [{ label: "140 Cutoff", href: "/engineering-colleges-chennai-140-cutoff" }];
const FAQ_ITEMS = [{ question: "Which Chennai colleges accept 140 cutoff?", answer: "Several quality private engineering colleges in Chennai accept students with 140 TNEA cutoff including colleges in areas like Poonamallee, Avadi, and Tambaram." }, { question: "Can I get CSE with 140 cutoff in Chennai?", answer: "CSE seats at 140 cutoff are available in select private colleges. IT and related branches have wider availability at this cutoff range." }];

export const metadata: Metadata = {
  title: "Engineering Colleges in Chennai with 140 Cutoff 2025 | EduMadras",
  description: "Engineering colleges in Chennai accepting 140 TNEA cutoff. Fees, branches & placements.",
  keywords: "140 cutoff engineering colleges in chennai 2025",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Engineering Colleges in Chennai with 140 Cutoff 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Engineering Colleges in Chennai with 140 Cutoff 2025" h1={H1} subtitle="Engineering colleges in Chennai accepting 140 TNEA cutoff. Fees, branches & placements." introText="If your TNEA cutoff is around 140, you still have excellent engineering college options in Chennai. This page lists all colleges that admitted students at 140 cutoff marks in the previous year, helping you make an informed choice during TNEA counseling." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="140 Cutoff" />
    </>
  );
}
