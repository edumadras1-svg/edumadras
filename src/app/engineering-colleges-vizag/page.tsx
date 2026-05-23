import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://www.edumadras.com/engineering-colleges-vizag";
const H1 = "Best Engineering Colleges in Vizag (Visakhapatnam) 2025";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/best-engineering-colleges-andhra-pradesh" }, { label: "Colleges in Vizag", href: "/engineering-colleges-vizag" }];
const FAQ_ITEMS = [
  { question: "Which is the best engineering college in Vizag?", answer: "Andhra University College of Engineering (AUCE) is the highest-ranked government engineering college in Vizag. Among private autonomous colleges, Gayatri Vidya Parishad (GVPCOE), Anil Neerukonda Institute of Technology & Sciences (ANITS), and GITAM University are widely considered the best." },
  { question: "What are the average placements in Vizag engineering colleges?", answer: "Top-tier colleges like Andhra University and GITAM achieve average placement packages of ₹6 LPA to ₹10 LPA. Reputed autonomous colleges (GVP, ANITS) average ₹5 LPA to ₹7 LPA, with major hiring by tech MNCs (TCS, Wipro, Cognizant, Infosys)." },
  { question: "How is the campus life at Visakhapatnam engineering colleges?", answer: "Vizag is a beautiful coastal city and a growing IT hub, offering a great lifestyle, safe environment, excellent transport connectivity, and robust industry-academic exposure." },
];

export const metadata: Metadata = {
  title: "Best Engineering Colleges in Vizag 2025 — Placements & Fees | EduMadras",
  description: "Explore top engineering colleges in Visakhapatnam (Vizag) 2025. Compare tuition fees, EAMCET rank cutoffs, placement averages & ratings.",
  keywords: "engineering colleges in vizag, best engineering colleges Visakhapatnam, top btech colleges vizag, vizag engineering placements",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Best Engineering Colleges in Vizag 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Vizag", limit: 30 });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Engineering Colleges in Vizag" h1={H1} subtitle="Comprehensive guide to engineering colleges in Visakhapatnam — with EAMCET ranks, placement averages, and fee structures." introText="Visakhapatnam is a primary educational and industrial hub in Andhra Pradesh. This guide profiles the top engineering colleges in Vizag — from Andhra University to reputed private autonomous institutions. Compare EAMCET cutoff ranks, annual fees, and campus recruiters." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Vizag / Visakhapatnam" />
    </>
  );
}
