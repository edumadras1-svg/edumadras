import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/private-medical-colleges-chennai";
const H1 = "Private Medical Colleges in Chennai 2025";
const BREADCRUMBS = [{ label: "Private Medical", href: "/private-medical-colleges-chennai" }];
const FAQ_ITEMS = [{ question: "Which are the best private medical colleges in Chennai?", answer: "Sri Ramachandra, SRM Medical College, Saveetha Medical College, and Chettinad Medical College are top-rated private institutions." }, { question: "Is private medical college worth the fees?", answer: "Top private colleges like Sri Ramachandra have excellent clinical training and global recognition. Consider ROI, clinical exposure, and hospital quality." }];

export const metadata: Metadata = {
  title: "Private Medical Colleges in Chennai 2025 | EduMadras",
  description: "Complete list of private medical colleges in Chennai with fees, NEET cutoffs & placements.",
  keywords: "private medical colleges in chennai",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Private Medical Colleges in Chennai 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Medical", city: "Chennai", type: "Private" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Private Medical Colleges in Chennai 2025" h1={H1} subtitle="Complete list of private medical colleges in Chennai with fees, NEET cutoffs & placements." introText="Chennai's private medical colleges offer quality MBBS education with modern infrastructure and hospital affiliations. While fees are higher than government colleges, many private institutions provide excellent clinical exposure and placement support." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Private" />
    </>
  );
}
