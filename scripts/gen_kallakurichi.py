#!/usr/bin/env python3
"""Generate Kallakurichi SEO pages for EduMadras with lead-gen bridge content."""
import os

BASE = "/Users/mahesh/PROJECTS/edumadras/src/app"

PAGES = [
  {
    "slug": "engineering-colleges/kallakurichi",
    "title": "Engineering Colleges in Kallakurichi 2025 — Admissions & Fees",
    "h1": "Top Engineering Colleges for Kallakurichi Students 2025",
    "desc": "Looking for engineering colleges in Kallakurichi? Explore top recommended engineering colleges for Kallakurichi students with better placements and IT exposure.",
    "kw": "engineering colleges in kallakurichi, best engineering colleges in kallakurichi",
    "stream": "Engineering",
    "intro": "While Kallakurichi offers local engineering options like AKT Engineering College, thousands of ambitious students from the district move to Chennai and surrounding educational hubs every year. These top-tier institutions offer superior IT placements, world-class infrastructure, and global exposure. Explore the best recommended engineering colleges for Kallakurichi students below.",
    "faq_q1": "Why do Kallakurichi students prefer Chennai engineering colleges?",
    "faq_a1": "Chennai offers proximity to major IT parks (Tidel Park, SIPCOT), significantly higher average placement packages (₹5-12 LPA), and superior industry exposure compared to local district colleges.",
    "faq_q2": "Which are the best engineering colleges near Kallakurichi?",
    "faq_a2": "Top institutions like Saveetha, SRM, and SSN are highly preferred by Kallakurichi students for their excellent hostel facilities and safe campus environments.",
    "bc_label": "Kallakurichi",
    "filter_label": "Recommended for Kallakurichi"
  },
  {
    "slug": "arts-science-colleges/kallakurichi",
    "title": "Arts and Science Colleges in Kallakurichi 2025",
    "h1": "Top Arts & Science Colleges for Kallakurichi Students",
    "desc": "Find the best arts and science colleges in and around Kallakurichi. Compare courses, fees, and placements for top institutions.",
    "kw": "arts and science colleges in kallakurichi, colleges in kallakurichi",
    "stream": "Arts & Science",
    "intro": "Searching for arts and science colleges in Kallakurichi? While local institutions serve the immediate area, top colleges in major cities offer advanced specialized degrees in Data Science, AI, and Commerce with massive placement drives. Discover the top-ranked arts and science colleges that warmly welcome students from Kallakurichi.",
    "faq_q1": "Are there good arts and science colleges near Kallakurichi?",
    "faq_a1": "Yes, while Kallakurichi has local arts colleges, students seeking top-tier MNC placements often choose premier colleges in Chennai, Salem, and Coimbatore.",
    "faq_q2": "Do these top colleges offer hostel facilities for Kallakurichi students?",
    "faq_a2": "Absolutely. All the top recommended colleges listed here provide safe, secure, and fully equipped hostels specifically designed for out-of-town students.",
    "bc_label": "Kallakurichi",
    "filter_label": "Top Choices"
  },
  {
    "slug": "medical-colleges/kallakurichi",
    "title": "Medical Colleges in Kallakurichi 2025 — Govt & Private",
    "h1": "Medical Colleges in Kallakurichi & Top Alternatives 2025",
    "desc": "Medical colleges in Kallakurichi including Govt Medical College. View fees, NEET cutoffs, and top alternative medical colleges.",
    "kw": "medical colleges in kallakurichi, govt medical college kallakurichi",
    "stream": "Medical",
    "intro": "Kallakurichi is home to the Government Medical College, a primary choice for local students. However, with intense NEET competition, it's crucial to have alternatives. Explore the top medical institutions and health science universities that are highly sought after by students from the Kallakurichi district.",
    "faq_q1": "What is the cutoff for Govt Medical College Kallakurichi?",
    "faq_a1": "The NEET cutoff for Govt Medical College Kallakurichi typically ranges between 580-620 for the general category, varying by specific quotas.",
    "faq_q2": "What are the best alternative medical colleges?",
    "faq_a2": "Top private medical colleges and deemed universities in Chennai and Pondicherry are popular alternatives offering world-class hospital infrastructure and clinical exposure.",
    "bc_label": "Kallakurichi",
    "filter_label": "Medical Institutions"
  },
  {
    "slug": "colleges-in-kallakurichi",
    "title": "Colleges in Kallakurichi 2025 — Top Degree & Engineering Colleges",
    "h1": "Top Colleges in Kallakurichi & Premium Alternatives",
    "desc": "Comprehensive guide to colleges in Kallakurichi. Discover the best local institutions and top premium alternatives for Kallakurichi students.",
    "kw": "colleges in kallakurichi, best colleges in kallakurichi",
    "stream": "",
    "intro": "Finding the right college in Kallakurichi can be challenging as a newly formed district. While local institutions like Govt Medical College and AKT Engineering are growing, the best career opportunities often lie in established educational hubs. We've curated a list of premium colleges that offer the highest ROI and actively recruit students from Kallakurichi.",
    "faq_q1": "Which is the best college in Kallakurichi?",
    "faq_a1": "Government Medical College and AKT Engineering College are the most prominent local institutions in Kallakurichi district.",
    "faq_q2": "Why should Kallakurichi students consider studying outside the district?",
    "faq_a2": "Studying in established educational hubs like Chennai provides exposure to multinational companies, diverse peer groups, better internships, and significantly higher starting salaries.",
    "bc_label": "Kallakurichi Colleges",
    "filter_label": "Premium Options"
  }
]

TEMPLATE = '''import type {{ Metadata }} from "next";
import {{ fetchCollegesByFilter }} from "@/lib/seo/fetchColleges";
import {{ buildListingJsonLd }} from "@/lib/seo/jsonLd";
import {{ HeadJsonLd }} from "@/components/seo/HeadJsonLd";
import {{ SEOCollegeListing }} from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/{slug}";
const H1 = "{h1}";
const BREADCRUMBS = [{{ label: "{bc_label}", href: "/{slug}" }}];
const FAQ_ITEMS = [{{ question: "{faq_q1}", answer: "{faq_a1}" }}, {{ question: "{faq_q2}", answer: "{faq_a2}" }}];

export const metadata: Metadata = {{
  title: "{title} | EduMadras",
  description: "{desc}",
  keywords: "{kw}",
  alternates: {{ canonical: PAGE_URL }},
  openGraph: {{ title: "{title} | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" }},
}};

export default async function Page() {{
  // Notice we do NOT filter by city="Kallakurichi" so we show our top colleges.
  // We filter by stream if provided to show relevant premium colleges.
  const colleges = await fetchCollegesByFilter({{ {filters} }});
  const jsonLdSchemas = buildListingJsonLd({{ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS }});
  
  return (
    <>
      <HeadJsonLd schemas={{jsonLdSchemas}} />
      <SEOCollegeListing 
        colleges={{colleges}} 
        title="{title}" 
        h1={{H1}} 
        subtitle="{desc}" 
        introText="{intro}" 
        breadcrumbs={{BREADCRUMBS}} 
        faqItems={{FAQ_ITEMS}} 
        pageUrl={{PAGE_URL}} 
        filterLabel="{filter_label}" 
      />
    </>
  );
}}
'''

for p in PAGES:
    filters = []
    if p["stream"]: filters.append(f'stream: "{p["stream"]}"')
    # Adding a limit so it shows the top 20 best colleges in our DB
    filters.append('limit: 20')
    filter_str = ", ".join(filters)

    content = TEMPLATE.format(filters=filter_str, **p)
    dirpath = os.path.join(BASE, p["slug"])
    os.makedirs(dirpath, exist_ok=True)
    filepath = os.path.join(dirpath, "page.tsx")
    with open(filepath, "w") as f:
        f.write(content)
    print(f"Created: {p['slug']}")

print(f"\\nDone! Created {len(PAGES)} Kallakurichi bridge pages.")
