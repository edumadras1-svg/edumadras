import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/marine-engineering-colleges-chennai";
const H1 = "Marine Engineering Colleges in Chennai 2025";
const BREADCRUMBS = [{ label: "Marine Chennai", href: "/marine-engineering-colleges-chennai" }];
const FAQ_ITEMS = [{ question: "Which Chennai colleges offer marine engineering?", answer: "Indian Maritime University (IMU), AMET University, and Hindustan Institute are top choices for marine engineering in Chennai." }, { question: "What is the starting salary for marine engineers?", answer: "Marine engineers start at ₹6-12 LPA and can earn ₹30-60 LPA with experience in international shipping companies." }];

export const metadata: Metadata = {
  title: "Marine Engineering Colleges in Chennai 2025 | EduMadras",
  description: "Marine engineering colleges in Chennai with fees, placements, eligibility & admission process.",
  keywords: "marine engineering colleges in chennai",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Marine Engineering Colleges in Chennai 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Marine Engineering Colleges in Chennai 2025" h1={H1} subtitle="Marine engineering colleges in Chennai with fees, placements, eligibility & admission process." introText="Chennai, a major port city, is ideal for marine engineering education. The Indian Maritime University headquarters, AMET University, and other institutions offer comprehensive marine engineering programs with direct industry connections." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Marine" />
    </>
  );
}
