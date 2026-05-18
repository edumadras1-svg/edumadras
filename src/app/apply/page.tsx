import type { Metadata } from "next";
import { fetchCollegesByFilter } from "@/lib/seo/fetchColleges";
import { ApplyPageClient } from "./ApplyPageClient";

const PAGE_URL = "https://www.edumadras.com/apply";

export const metadata: Metadata = {
  title: "Apply Now — Free College Admission Counseling 2026 | EduMadras",
  description:
    "Get free expert admission counseling for engineering, medical, arts & science colleges in Tamil Nadu. Fill the form and our counselor will guide you through TNEA, NEET & direct admissions.",
  keywords:
    "free college counseling, college admission help, TNEA counseling, NEET admission guidance, engineering college admission Tamil Nadu, EduMadras apply, education consultant Tamil Nadu",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Apply Now — Free College Admission Counseling 2026 | EduMadras",
    description:
      "Get free expert admission counseling for engineering, medical, arts & science colleges in Tamil Nadu.",
    url: PAGE_URL,
    siteName: "EduMadras",
    type: "website",
    locale: "en_IN",
  },
};

export default async function ApplyPage() {
  const colleges = await fetchCollegesByFilter({ limit: 6 });

  return <ApplyPageClient colleges={colleges} />;
}
