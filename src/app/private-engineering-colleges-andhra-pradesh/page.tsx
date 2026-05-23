import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://www.edumadras.com/private-engineering-colleges-andhra-pradesh";
const H1 = "Best Private Engineering Colleges in Andhra Pradesh 2025";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/best-engineering-colleges-andhra-pradesh" }, { label: "Private Colleges AP", href: "/private-engineering-colleges-andhra-pradesh" }];
const FAQ_ITEMS = [
  { question: "Which is the best private engineering college in Andhra Pradesh?", answer: "KL University (Koneru Lakshmaiah Education Foundation) in Vaddeswaram is highly rated. Other top private options include GMR Institute of Technology (Rajam), Gayatri Vidya Parishad (Vizag), Velagapudi Ramakrishna Siddhartha Engineering College (Vijayawada), and Sree Vidyanikethan (Tirupati)." },
  { question: "Do private engineering colleges in AP accept EAMCET scores?", answer: "Yes, 70% of seats in private colleges are allocated through the Category-A EAMCET state counseling convener quota. The remaining 30% of seats are filled under the Category-B management quota based on JEE Main or class 12 marks." },
  { question: "What is the fee structure for private colleges in AP?", answer: "Fees for private colleges under the convener quota are standardized by the state government, typically ranging from ₹35,000 to ₹70,000 per year. For management quota (Category-B) or deemed universities, fees range from ₹1.5 Lakhs to ₹4.5 Lakhs per year." },
  { question: "Do private universities in AP offer direct admission?", answer: "Yes, private deemed universities (such as GITAM, KL, VIT AP) have dedicated direct admission streams based on their private entrance tests or standard class 12 board marks." },
];

export const metadata: Metadata = {
  title: "Best Private Engineering Colleges in Andhra Pradesh 2025 | EduMadras",
  description: "Compare top private engineering colleges and universities in Andhra Pradesh (AP) 2025. Compare tuition fees, EAMCET rankings, packages & direct admission options.",
  keywords: "private engineering colleges in Andhra Pradesh, best private btech colleges AP, private engineering colleges AP EAMCET",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Best Private Engineering Colleges in Andhra Pradesh 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", state: "Andhra Pradesh", type: "Private", limit: 40 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Private Engineering Colleges in AP" h1={H1} subtitle="Comprehensive listing of all top private and autonomous engineering colleges in Andhra Pradesh — EAMCET and Management Quota data." introText="Andhra Pradesh has a vast network of top-performing private engineering colleges that offer state-of-the-art infrastructure, flexible autonomous curricula, and proactive corporate placement training. This guide outlines the best private institutions in AP, detailing EAMCET rankings, packages, and direct admission guidelines." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Private / Deemed" />
    </>
  );
}
