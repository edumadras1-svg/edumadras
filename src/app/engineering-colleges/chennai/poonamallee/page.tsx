import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { buildListingJsonLd } from "@/lib/seo/jsonLd";
import { HeadJsonLd } from "@/components/seo/HeadJsonLd";
import { SEOCollegeListing } from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/engineering-colleges/chennai/poonamallee";
const H1 = "Engineering Colleges in Poonamallee 2025";
const BREADCRUMBS = [{ label: "Engineering Colleges", href: "/engineering-colleges/chennai" }, { label: "Poonamallee", href: "/engineering-colleges/chennai/poonamallee" }];
const FAQ_ITEMS = [{ question: "Which engineering colleges are in Poonamallee?", answer: "There are several AICTE-approved engineering colleges in and around Poonamallee offering various branches of B.E/B.Tech programs." }, { question: "How to reach Poonamallee engineering colleges?", answer: "Poonamallee is well-connected by Chennai Metro, MTC buses, and suburban trains. Most colleges are within 5 km of the Poonamallee railway station." }];

export const metadata: Metadata = {
  title: "Engineering Colleges in Poonamallee 2025 — Fees & Admissions | EduMadras",
  description: "Engineering colleges in Poonamallee with fees, placements, branches & admission details. TNEA cutoffs for Poonamallee area colleges.",
  keywords: "engineering colleges in poonamallee chennai",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Engineering Colleges in Poonamallee | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" },
};

export default async function Page() {
  const colleges = await fetchCollegesByFilter({ stream: "Engineering", city: "Chennai" });
  const jsonLdSchemas = buildListingJsonLd({ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS });
  return (
    <>
      <HeadJsonLd schemas={jsonLdSchemas} />
      <SEOCollegeListing colleges={colleges} title={"Engineering Colleges in Poonamallee"} h1={H1} subtitle={"Find the best engineering colleges near Poonamallee with verified fees, placements & admission info."} introText={"Poonamallee is a key educational area with several engineering colleges offering quality technical education. Whether you are looking for affordable government colleges or top-rated private institutions, this guide covers all engineering colleges in and around Poonamallee with verified information."} breadcrumbs={BREADCRUMBS} faqItems={FAQ_ITEMS} pageUrl={PAGE_URL} filterLabel={"Poonamallee"} />
    </>
  );
}
