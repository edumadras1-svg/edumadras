import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://www.edumadras.com/engineering-colleges-vijayawada";
const H1 = "Best Engineering Colleges in Vijayawada 2025 — Ranks & Placements";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/best-engineering-colleges-andhra-pradesh" }, { label: "Colleges in Vijayawada", href: "/engineering-colleges-vijayawada" }];
const FAQ_ITEMS = [
  { question: "Which engineering college is best in Vijayawada?", answer: "Velagapudi Ramakrishna Siddhartha Engineering College (VRSEC) is widely considered the best private autonomous engineering college in Vijayawada. Other top colleges include Prasad V. Potluri Siddhartha Institute of Technology (PVPSIT), SRK Institute of Technology, and Andhra Loyola College." },
  { question: "What is the average placement package in Vijayawada colleges?", answer: "Top autonomous colleges in Vijayawada (like VRSEC) achieve average placement packages of ₹5.5 LPA to ₹8 LPA. Other private institutions average between ₹4 LPA and ₹6 LPA, with major hiring by tech giants like TCS, Infosys, Capgemini, and Cognizant." },
  { question: "How can I apply for engineering in Vijayawada?", answer: "Admissions are primarily processed through the AP EAMCET state counseling convener quota. You can also apply directly under Category-B management quota." },
];

export const metadata: Metadata = {
  title: "Best Engineering Colleges in Vijayawada 2025 — Placements & Fees | EduMadras",
  description: "Explore top engineering colleges in Vijayawada 2025. Compare tuition fees, EAMCET cutoff ranks, placement averages & facilities. Free counseling.",
  keywords: "engineering colleges in vijayawada, best engineering colleges vijayawada, top btech colleges vijayawada, vijayawada engineering placements",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Best Engineering Colleges in Vijayawada 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Vijayawada", limit: 30 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Engineering Colleges in Vijayawada" h1={H1} subtitle="Comprehensive directory of engineering colleges in Vijayawada — with EAMCET ranks, packages, and fee structures." introText="Vijayawada is a primary educational hub in Andhra Pradesh. This guide profiles the top engineering colleges in Vijayawada — from VRSEC to reputed private autonomous institutions. Compare EAMCET cutoff ranks, annual fees, and campus recruiters." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Vijayawada" />
    </>
  );
}
