import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/law-colleges/tamilnadu";
const H1 = "Law Colleges in Tamil Nadu 2025";
const BREADCRUMBS = [{ label: "Law Colleges TN", href: "/law-colleges/tamilnadu" }];
const FAQ_ITEMS = [{ question: "Which are the best law colleges in Tamil Nadu?", answer: "Dr. Ambedkar Government Law College (Chennai), TNDALU affiliated colleges, SASTRA School of Law, and VIT School of Law." }, { question: "What is the admission process for law in TN?", answer: "5-year integrated law: Through CLAT or university-level entrance. 3-year LLB: Based on graduation marks and TNDALU counseling." }];

export const metadata: Metadata = {
  title: "Law Colleges in Tamil Nadu 2025 — Rankings & Admissions | EduMadras",
  description: "Complete list of law colleges in Tamil Nadu with courses, fees, entrance exams & placements.",
  keywords: "law colleges in tamilnadu",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Law Colleges in Tamil Nadu 2025 — Rankings & Admissions | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Law", state: "Tamil Nadu" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Law Colleges in Tamil Nadu 2025 — Rankings & Admissions" h1={H1} subtitle="Complete list of law colleges in Tamil Nadu with courses, fees, entrance exams & placements." introText="Tamil Nadu has a strong legal education tradition with institutions like Dr. Ambedkar Government Law College, SOEL (SASTRA), and several private law schools offering BA LLB, BBA LLB, and LLB programs." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="" />
    </>
  );
}
