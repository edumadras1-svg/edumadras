import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://www.edumadras.com/100-percent-placement-colleges-chennai";
const H1 = "Engineering Colleges in Chennai with 100% Placement — 2025 List";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges/chennai" }, { label: "100% Placement", href: "/100-percent-placement-colleges-chennai" }];
const FAQ_ITEMS = [
  { question: "Which Chennai engineering colleges have 100% placement?", answer: "Colleges like IIT Madras, SSN College of Engineering, and Anna University CEG consistently report near 100% placement rates for their CS and ECE branches. SRM IST and Sathyabama also report 90-100% placement in select departments." },
  { question: "Are 100% placement claims by colleges always genuine?", answer: "Not always. Some colleges count mass recruiters, contract roles, or internships as placements. Always verify by checking the average package (should be ₹4+ LPA), the recruiter list, and whether the figure includes all branches or only select ones. Ask for branch-wise data." },
  { question: "What is the average package in colleges with 100% placement in Chennai?", answer: "Colleges with genuine 100% placement records typically offer average packages of ₹6–20 LPA. IIT Madras averages ₹20+ LPA, SSN averages ₹8–10 LPA, while SRM IST averages ₹6–8 LPA across all branches." },
  { question: "Do government colleges in Chennai have better placement rates than private?", answer: "Government colleges like Anna University CEG have excellent placement rates (90%+) with lower fees. However, top private colleges like SSN, SRM, and VIT also achieve 95-100% placement with a wider range of recruiters and higher packages in some branches." },
  { question: "How can I verify a college's 100% placement claim?", answer: "Check NIRF data (which requires verified placement stats), ask for audited placement reports, speak to alumni on LinkedIn, check Glassdoor reviews, and verify recruiter names independently. Genuine colleges publish branch-wise placement data openly." },
  { question: "Which branches get 100% placement most easily in Chennai?", answer: "Computer Science (CSE), Information Technology (IT), and AI/ML branches have the highest placement rates across Chennai colleges. ECE follows closely. Mechanical, Civil, and EEE have lower placement rates, typically 60-80% even in top colleges." },
];

export const metadata: Metadata = {
  title: "Colleges with 100% Placement in Chennai 2025 — Full List | EduMadras",
  description: "Discover engineering colleges in Chennai with 100% placement records. Compare packages, top recruiters & placement guarantees. Free admission counseling.",
  keywords: "100 percent placement colleges in chennai, colleges with full placement chennai, guaranteed placement engineering colleges chennai, 100% placement colleges chennai",
  alternates: { canonical: "https://www.edumadras.com/100-percent-placement-colleges-chennai" },
  openGraph: { title: "100% Placement Engineering Colleges Chennai 2025 | EduMadras", url: "https://www.edumadras.com/100-percent-placement-colleges-chennai", siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai", orderBy: "avg_package", limit: 15 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="100% Placement Colleges Chennai" h1={H1} subtitle="Chennai engineering colleges with the highest placement rates — verified data from NIRF, college audits & alumni feedback." introText="Looking for engineering colleges in Chennai that guarantee placements? While no college can legally guarantee 100% placement, several institutions consistently achieve 95-100% placement rates year after year. This data-driven list ranks Chennai's top engineering colleges by placement percentage, average package, and recruiter quality. We've cross-verified each college's placement claims against NIRF submissions, alumni feedback, and public recruiter data to help you make an informed decision for the 2025–2026 academic year." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl="https://www.edumadras.com/100-percent-placement-colleges-chennai" filterLabel="100% Placement" showPlacementColumn={true} />
    </>
  );
}
