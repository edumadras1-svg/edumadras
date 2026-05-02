import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/engineering-colleges-chennai-placement";
const H1 = "Top 10 Engineering Colleges in Chennai — Based on Placement 2025";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges/chennai" }, { label: "By Placement", href: "/engineering-colleges-chennai-placement" }];
const FAQ_ITEMS = [{ question: "Which Chennai engineering college has the highest placement package?", answer: "IIT Madras consistently records the highest placements with packages exceeding ₹1 Cr (international). Among private colleges, SSN and SRM have recorded ₹40-50 LPA highest packages." }, { question: "What is the average package in Chennai engineering colleges?", answer: "Top-tier colleges average ₹10-25 LPA. Mid-tier colleges average ₹4-8 LPA. The overall average across all Chennai engineering colleges is approximately ₹5-6 LPA." }];

export const metadata: Metadata = {
  title: "Top 10 Engineering Colleges in Chennai by Placement 2025 | EduMadras",
  description: "Top 10 engineering colleges in Chennai ranked by placement performance. Compare highest packages, average CTC, top recruiters & placement percentages. Free counseling.",
  keywords: "top 10 engg colleges in chennai based on placement, best engineering colleges chennai placement, highest package engineering colleges chennai",
  alternates: { canonical: "https://edumadras.com/engineering-colleges-chennai-placement" },
  openGraph: { title: "Top 10 Engg Colleges Chennai by Placement | EduMadras", url: "https://edumadras.com/engineering-colleges-chennai-placement", siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai", orderBy: "avg_package", limit: 10 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Engineering Colleges Chennai by Placement" h1={H1} subtitle="Chennai's best engineering colleges ranked purely by placement performance — average packages, highest CTC & recruiter quality." introText="Placements are the ultimate test of an engineering college's quality. This data-driven ranking lists the top 10 engineering colleges in Chennai based purely on placement performance — including average package, highest CTC, placement percentage, and the caliber of recruiting companies. If your primary goal is landing a high-paying job after graduation, these are the colleges you should target." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl="https://edumadras.com/engineering-colleges-chennai-placement" filterLabel="Placement Wise" showPlacementColumn={true} />
    </>
  );
}
