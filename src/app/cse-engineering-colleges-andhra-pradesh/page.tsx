import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://www.edumadras.com/cse-engineering-colleges-andhra-pradesh";
const H1 = "Computer Science Engineering (CSE) Colleges in Andhra Pradesh 2025";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/best-engineering-colleges-andhra-pradesh" }, { label: "CSE Colleges AP", href: "/cse-engineering-colleges-andhra-pradesh" }];
const FAQ_ITEMS = [
  { question: "Which is the best college for CSE in Andhra Pradesh?", answer: "Top colleges for Computer Science Engineering (CSE) include Andhra University College of Engineering, KL University, GITAM University, GMR Institute of Technology, and Gayatri Vidya Parishad (GVP)." },
  { question: "What is the EAMCET rank cutoff for CSE in AP colleges?", answer: "For premium colleges like Andhra University, the CSE cutoff rank under EAMCET counseling is typically below 2,000. In top autonomous private colleges, CSE seats are highly competitive and fill up under 8,000 rank." },
  { question: "Are placements strong for CSE in Andhra Pradesh?", answer: "Yes, CSE has the highest placement record in the state. Graduates are recruited by top tech giants like Microsoft, Amazon, Infosys, Wipro, and TCS, with average packages ranging between ₹6 LPA and ₹15+ LPA." },
  { question: "Do AP colleges offer specialized CSE courses?", answer: "Yes, many reputed universities in AP offer specialized CSE branches, such as CSE with AI & Machine Learning, Data Science, Cyber Security, and Internet of Things (IoT)." },
];

export const metadata: Metadata = {
  title: "CSE Colleges in Andhra Pradesh 2025 — Computer Science Engineering Fees & Placements | EduMadras",
  description: "Best Computer Science Engineering (CSE) colleges in Andhra Pradesh 2025. Compare CSE fees, EAMCET ranks, placement packages & admission criteria.",
  keywords: "cse colleges in Andhra Pradesh, computer science engineering colleges AP, best CSE colleges AP, cse placements AP",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "CSE Colleges in Andhra Pradesh 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", state: "Andhra Pradesh", limit: 40 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="CSE Colleges in Andhra Pradesh" h1={H1} subtitle="Comprehensive directory of AP engineering colleges offering Computer Science Engineering — with cutoffs, fee comparisons, and placements." introText="Computer Science Engineering (CSE) is the most sought-after stream in Andhra Pradesh. This guide profiles every top institution in AP offering CSE — from premier government universities to reputed autonomous colleges with top placements. Find CSE-specific EAMCET cutoffs, packages, and detailed curricula." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="CSE / Computer Science" />
    </>
  );
}
