import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/medical-colleges/kallakurichi";
const H1 = "Medical Colleges in Kallakurichi & Top Alternatives 2025";
const BREADCRUMBS = [{ label: "Kallakurichi", href: "/medical-colleges/kallakurichi" }];
const FAQ_ITEMS = [{ question: "What is the cutoff for Govt Medical College Kallakurichi?", answer: "The NEET cutoff for Govt Medical College Kallakurichi typically ranges between 580-620 for the general category, varying by specific quotas." }, { question: "What are the best alternative medical colleges?", answer: "Top private medical colleges and deemed universities in Chennai and Pondicherry are popular alternatives offering world-class hospital infrastructure and clinical exposure." }];

export const metadata: Metadata = {
  title: "Medical Colleges in Kallakurichi 2025 — Govt & Private | EduMadras",
  description: "Medical colleges in Kallakurichi including Govt Medical College. View fees, NEET cutoffs, and top alternative medical colleges.",
  keywords: "medical colleges in kallakurichi, govt medical college kallakurichi",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Medical Colleges in Kallakurichi 2025 — Govt & Private | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  // Notice we do NOT filter by city="Kallakurichi" so we show our top colleges.
  // We filter by stream if provided to show relevant premium colleges.
  const colleges = await fetchCollegesByFilter({ stream: "Medical", limit: 20 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing 
        colleges={colleges} 
        title="Medical Colleges in Kallakurichi 2025 — Govt & Private" 
        h1={H1} 
        subtitle="Medical colleges in Kallakurichi including Govt Medical College. View fees, NEET cutoffs, and top alternative medical colleges." 
        introText="Kallakurichi is home to the Government Medical College, a primary choice for local students. However, with intense NEET competition, it's crucial to have alternatives. Explore the top medical institutions and health science universities that are highly sought after by students from the Kallakurichi district." 
        breadcrumbs={BREADCRUMBS} 
        faqItems={FAQ_ITEMS} 
        pageUrl={PAGE_URL} 
        filterLabel="Medical Institutions" 
      />
    </>
  );
}
