import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/engineering-colleges-chennai-cyber-security";
const H1 = "Best Engineering Colleges in Chennai for Cyber Security 2025";
const BREADCRUMBS = [{ label: "Cyber Security", href: "/engineering-colleges-chennai-cyber-security" }];
const FAQ_ITEMS = [{ question: "Which Chennai colleges offer cyber security engineering?", answer: "SRM, VIT Chennai, Sathyabama, and select Anna University-affiliated colleges offer B.Tech/B.E in Cyber Security or Information Security." }, { question: "What is the career scope of cyber security?", answer: "Extremely high demand with starting packages of ₹6-15 LPA. Companies like TCS, Infosys, Wipro, and specialized security firms actively recruit." }];

export const metadata: Metadata = {
  title: "Best Engineering Colleges in Chennai for Cyber Security 2025 | EduMadras",
  description: "Top engineering colleges in Chennai offering cyber security courses. B.Tech/B.E programs, fees & placements.",
  keywords: "best engg colleges in chennai for cyber security",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Best Engineering Colleges in Chennai for Cyber Security 2025 | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title="Best Engineering Colleges in Chennai for Cyber Security 2025" h1={H1} subtitle="Top engineering colleges in Chennai offering cyber security courses. B.Tech/B.E programs, fees & placements." introText="Cyber security is one of the fastest-growing specializations in engineering. Chennai's top colleges now offer dedicated B.Tech/B.E programs in Cyber Security, Information Security, and related fields with strong placement opportunities in IT security firms." breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel="Cyber Security" />
    </>
  );
}
