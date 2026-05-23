import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://www.edumadras.com/it-engineering-colleges-andhra-pradesh";
const H1 = "Best IT Engineering Colleges in Andhra Pradesh 2025";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/best-engineering-colleges-andhra-pradesh" }, { label: "IT Colleges AP", href: "/it-engineering-colleges-andhra-pradesh" }];
const FAQ_ITEMS = [
  { question: "Which is the best college for IT (Information Technology) in Andhra Pradesh?", answer: "Top colleges for Information Technology include KL University (Vaddeswaram), GITAM University (Visakhapatnam), VR Siddhartha Engineering College (Vijayawada), and Gayatri Vidya Parishad College of Engineering (Visakhapatnam)." },
  { question: "Is IT a good branch to choose in AP engineering colleges?", answer: "Yes, Information Technology remains one of the top 3 most-placed branches in AP. IT graduates are recruited by major service and product companies including TCS, Wipro, Infosys, Capgemini, and Cognizant with average packages ranging from ₹4.5 LPA to ₹10+ LPA." },
  { question: "What is the difference between CSE and IT in AP colleges?", answer: "CSE focuses more on core computer science theory (algorithms, OS, compilers), while IT emphasizes practical application development, networking, databases, and enterprise systems. Both branches have nearly identical placement opportunities in the software industry." },
  { question: "What is the EAMCET cutoff for IT branch in AP?", answer: "IT branch cutoffs are slightly more accessible than CSE. In top autonomous colleges, IT seats typically fill between ranks 5,000–15,000 in AP EAMCET counseling, making it an excellent value-for-rank choice." },
];

export const metadata: Metadata = {
  title: "IT Colleges in Andhra Pradesh 2025 — Information Technology Fees & Placements | EduMadras",
  description: "Best Information Technology (IT) engineering colleges in Andhra Pradesh 2025. Compare IT branch fees, EAMCET cutoffs, placement packages & top recruiters.",
  keywords: "IT colleges in Andhra Pradesh, information technology colleges AP, best IT engineering colleges AP, IT placements AP, IT vs CSE AP",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "IT Engineering Colleges in Andhra Pradesh 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", state: "Andhra Pradesh", limit: 40 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="IT Colleges in Andhra Pradesh" h1={H1} subtitle="Complete directory of AP engineering colleges offering Information Technology — with EAMCET cutoffs, fees, and placement records." introText="Information Technology (IT) is one of the most versatile and consistently high-placement engineering branches in Andhra Pradesh. IT graduates gain practical skills in software development, database management, networking, and enterprise systems — making them highly employable across India's booming tech sector. This directory profiles every top IT-offering institution in AP with verified placement data." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="IT / Information Technology" />
    </>
  );
}
