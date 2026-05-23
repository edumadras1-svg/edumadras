import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://www.edumadras.com/best-engineering-colleges-andhra-pradesh";
const H1 = "Best Engineering Colleges in Andhra Pradesh 2025 — Ranks, Fees & Placements";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges" }, { label: "Andhra Pradesh Colleges", href: "/best-engineering-colleges-andhra-pradesh" }];
const FAQ_ITEMS = [
  { question: "Which is the No. 1 engineering college in Andhra Pradesh?", answer: "Andhra University College of Engineering (Visakhapatnam) is widely considered the top government engineering college in the state. Among private universities, KL University (Vaddeswaram) and GITAM University (Vizag) are highly reputed with excellent job outcomes." },
  { question: "How can I get admission to top AP engineering colleges?", answer: "Admissions to engineering colleges in Andhra Pradesh are primarily conducted through the AP EAPCET (EAMCET) counseling process. For national level universities like KL University, VIT AP, or SRM AP, you can apply through their respective entrance exams (KLEEE, VITEEE, SRMJEEE)." },
  { question: "What is the fee structure for BTech in Andhra Pradesh?", answer: "Government colleges have subsidised fees (₹10K-40K/year). Reputed private autonomous colleges under EAMCET counseling cost ₹35K-75K/year. Deemed private universities charge between ₹1.5 Lakhs to ₹4.5 Lakhs per year depending on the branch and category." },
  { question: "Are placements good in AP engineering colleges?", answer: "Yes, top colleges see active recruitment from service giants (TCS, Wipro, Infosys, Cognizant) and premium product/SaaS companies (Zoho, Amazon, Microsoft) offering packages ranging from ₹4 LPA up to ₹40+ LPA." },
];

export const metadata: Metadata = {
  title: "Best Engineering Colleges in Andhra Pradesh 2025 — Ranks, Fees & Placements | EduMadras",
  description: "Explore the best engineering colleges in Andhra Pradesh (AP) 2025. Compare tuition fees, EAMCET cutoffs, placement statistics & ranking. Free counseling.",
  keywords: "best engineering colleges in andhra pradesh, top engineering colleges in ap, ap engineering colleges rankings, best btech colleges andhra pradesh",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Best Engineering Colleges in Andhra Pradesh 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", state: "Andhra Pradesh", limit: 50 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Best Engineering Colleges in Andhra Pradesh" h1={H1} subtitle="Every top-rated engineering college in AP offering B.Tech — with verified placement statistics, fees, and AP EAMCET cutoff analysis." introText="Andhra Pradesh is home to top government universities, renowned private universities, and prestigious autonomous engineering colleges. This guide provides a comprehensive list of all engineering colleges in AP, complete with verified data on EAMCET ranks, placement averages, and fee structures from Andhra University, KL University, VIT AP, and more." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Andhra Pradesh / AP" />
    </>
  );
}
