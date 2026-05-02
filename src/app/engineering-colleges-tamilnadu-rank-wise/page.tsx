import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/engineering-colleges-tamilnadu-rank-wise";
const H1 = "Engineering Colleges in Tamil Nadu — Rank Wise 2025";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges/tamilnadu" }, { label: "Rank Wise", href: "/engineering-colleges-tamilnadu-rank-wise" }];
const FAQ_ITEMS = [{ question: "What is the ranking criteria for TN engineering colleges?", answer: "NIRF ranks based on Teaching (30%), Research (30%), Graduation Outcomes (20%), Outreach (10%), and Perception (10%). TNEA also ranks colleges by student preference and cutoff scores." }, { question: "Which government engineering college has the best ranking in TN?", answer: "Anna University CEG and MIT campuses are the highest-ranked government engineering colleges in Tamil Nadu after IIT Madras and NIT Trichy (central govt)." }];

export const metadata: Metadata = {
  title: "Engineering Colleges in Tamil Nadu Rank Wise 2025 | EduMadras",
  description: "Complete rank-wise list of engineering colleges in Tamil Nadu. NIRF rankings, TNEA cutoffs, fees & placement data. Free admission counseling.",
  keywords: "engineering colleges in tamilnadu rank wise, top engineering colleges tamilnadu rank wise, tamilnadu engineering ranking",
  alternates: { canonical: "https://edumadras.com/engineering-colleges-tamilnadu-rank-wise" },
  openGraph: { title: "Engineering Colleges TN Rank Wise 2025 | EduMadras", url: "https://edumadras.com/engineering-colleges-tamilnadu-rank-wise", siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", state: "Tamil Nadu" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Engineering Colleges TN Rank Wise" h1={H1} subtitle="All engineering colleges in Tamil Nadu sorted by NIRF ranking for easy comparison." introText="Finding the right engineering college requires understanding where each institution ranks. This comprehensive rank-wise listing of all engineering colleges in Tamil Nadu — sorted by NIRF scores — gives you instant clarity on which colleges are Tier-1, Tier-2, and Tier-3. Use this to make data-driven decisions about your engineering admission in Tamil Nadu." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl="https://edumadras.com/engineering-colleges-tamilnadu-rank-wise" filterLabel="Rank Wise" />
    </>
  );
}
