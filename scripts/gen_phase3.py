#!/usr/bin/env python3
"""Generate Phase 3 SEO pages for EduMadras — Quick Wins (36 keywords)."""
import os
BASE = "/Users/mahesh/PROJECTS/edumadras/src/app"

# Phase 3: Cutoff, Feature, Location, Tier, and Category pages
# College-specific pages (rows 42-48) are already covered by /colleges/[id]
PAGES = [
  {"slug":"engineering-colleges-chennai-140-cutoff","title":"Engineering Colleges in Chennai with 140 Cutoff 2025","h1":"Engineering Colleges in Chennai — 140 Cutoff 2025","desc":"Engineering colleges in Chennai accepting 140 TNEA cutoff. Fees, branches & placements.","kw":"140 cutoff engineering colleges in chennai 2025","stream":"Engineering","city":"Chennai","state":"","type":"","limit":"","intro":"If your TNEA cutoff is around 140, you still have excellent engineering college options in Chennai. This page lists all colleges that admitted students at 140 cutoff marks in the previous year, helping you make an informed choice during TNEA counseling.","faq_q1":"Which Chennai colleges accept 140 cutoff?","faq_a1":"Several quality private engineering colleges in Chennai accept students with 140 TNEA cutoff including colleges in areas like Poonamallee, Avadi, and Tambaram.","faq_q2":"Can I get CSE with 140 cutoff in Chennai?","faq_a2":"CSE seats at 140 cutoff are available in select private colleges. IT and related branches have wider availability at this cutoff range.","bc_label":"140 Cutoff","filter":"140 Cutoff"},
  {"slug":"engineering-colleges-chennai-150-cutoff","title":"Engineering Colleges in Chennai with 150 Cutoff 2025","h1":"Engineering Colleges in Chennai — 150 Cutoff 2025","desc":"Engineering colleges in Chennai accepting 150 TNEA cutoff. Complete list with fees & branches.","kw":"150 cutoff engineering colleges in chennai","stream":"Engineering","city":"Chennai","state":"","type":"","limit":"","intro":"A 150 TNEA cutoff opens doors to many solid engineering colleges in Chennai. This comprehensive list shows all colleges that admitted students at the 150 cutoff range, with branch-wise availability and fee details.","faq_q1":"Which colleges accept 150 cutoff in Chennai?","faq_a1":"At 150 cutoff, you can get admission in colleges like Jeppiaar, Panimalar, Sairam, and several other well-established private engineering colleges.","faq_q2":"What branches are available at 150 cutoff?","faq_a2":"CSE, IT, ECE, EEE, Mechanical, and Civil branches are typically available at various colleges with 150 cutoff.","bc_label":"150 Cutoff","filter":"150 Cutoff"},
  {"slug":"engineering-colleges-chennai-160-cutoff","title":"Engineering Colleges in Chennai with 160 Cutoff 2025","h1":"Engineering Colleges in Chennai — 160 Cutoff 2025","desc":"Engineering colleges in Chennai accepting 160 TNEA cutoff with branch-wise details.","kw":"160 cutoff engineering colleges in chennai","stream":"Engineering","city":"Chennai","state":"","type":"","limit":"","intro":"With a 160 TNEA cutoff, you have access to a wider range of engineering colleges and branches in Chennai. This page provides the complete list of colleges and branches available at the 160 cutoff range.","faq_q1":"Is 160 cutoff good for engineering in Chennai?","faq_a1":"160 is a competitive cutoff that opens doors to many good colleges including some branches at top-tier private institutions.","faq_q2":"Can I get CSE at a good college with 160?","faq_a2":"Yes, CSE and IT seats are available at several reputed colleges like Sairam, Rajalakshmi, and Panimalar at 160 cutoff.","bc_label":"160 Cutoff","filter":"160 Cutoff"},
  {"slug":"engineering-colleges-chennai-cyber-security","title":"Best Engineering Colleges in Chennai for Cyber Security 2025","h1":"Best Engineering Colleges in Chennai for Cyber Security 2025","desc":"Top engineering colleges in Chennai offering cyber security courses. B.Tech/B.E programs, fees & placements.","kw":"best engg colleges in chennai for cyber security","stream":"Engineering","city":"Chennai","state":"","type":"","limit":"","intro":"Cyber security is one of the fastest-growing specializations in engineering. Chennai's top colleges now offer dedicated B.Tech/B.E programs in Cyber Security, Information Security, and related fields with strong placement opportunities in IT security firms.","faq_q1":"Which Chennai colleges offer cyber security engineering?","faq_a1":"SRM, VIT Chennai, Sathyabama, and select Anna University-affiliated colleges offer B.Tech/B.E in Cyber Security or Information Security.","faq_q2":"What is the career scope of cyber security?","faq_a2":"Extremely high demand with starting packages of ₹6-15 LPA. Companies like TCS, Infosys, Wipro, and specialized security firms actively recruit.","bc_label":"Cyber Security","filter":"Cyber Security"},
  {"slug":"engineering-colleges-chennai-for-girls","title":"Best Engineering Colleges in Chennai for Girls 2025","h1":"Best Engineering Colleges in Chennai for Girls 2025","desc":"Top engineering colleges in Chennai for women students. Safe campus, hostels & placement support.","kw":"best engineering colleges in chennai for girls","stream":"Engineering","city":"Chennai","state":"","type":"","limit":"","intro":"Chennai offers several engineering colleges with excellent facilities for women students including dedicated hostels, safe campuses, women empowerment cells, and strong placement support. This guide highlights colleges with the best track record for female students.","faq_q1":"Which Chennai engineering college is best for girls?","faq_a1":"SSN College, SRM, Rajalakshmi, and Anna University CEG are known for excellent safety, hostel facilities, and support systems for women students.","faq_q2":"Are there women-only engineering colleges in Chennai?","faq_a2":"While most engineering colleges are co-educational, some colleges have dedicated women's hostels with enhanced security and mentoring programs.","bc_label":"For Girls","filter":"For Girls"},
  {"slug":"engineering-colleges-chennai-cse-fees","title":"Engineering Colleges in Chennai for CSE with Fees 2025","h1":"Engineering Colleges in Chennai for CSE — Complete Fee Structure 2025","desc":"All engineering colleges in Chennai offering CSE/IT with detailed fee structures and placement data.","kw":"engineering colleges in chennai for cse with fees","stream":"Engineering","city":"Chennai","state":"","type":"","limit":"","intro":"Computer Science Engineering (CSE) is the most sought-after branch in Chennai. This guide provides a complete, verified fee comparison for every engineering college offering CSE/IT in Chennai — from affordable government colleges to premium private institutions.","faq_q1":"What is the CSE fee in Chennai engineering colleges?","faq_a1":"Government: ₹25-50K/year. Top private (SRM, VIT): ₹2-4L/year. Mid-tier private: ₹1-2L/year.","faq_q2":"Which college has the best CSE placements in Chennai?","faq_a2":"IIT Madras leads with ₹20+ LPA. SSN, Anna University CEG, and SRM also have strong CSE placement records.","bc_label":"CSE Fees","filter":"CSE"},
  {"slug":"engineering-colleges-chennai-list","title":"Engineering Colleges in Chennai — Complete List with Address 2025","h1":"Engineering Colleges in Chennai — Complete Directory 2025","desc":"Complete list of all engineering colleges in Chennai with address, contact details & location map.","kw":"engineering colleges in chennai list with address","stream":"Engineering","city":"Chennai","state":"","type":"","limit":"","intro":"Looking for the complete directory of engineering colleges in Chennai? This page provides every AICTE-approved engineering college in Chennai with verified addresses, phone numbers, email contacts, and location details to help you plan campus visits.","faq_q1":"How many engineering colleges are in Chennai?","faq_a1":"Chennai has approximately 100+ engineering colleges including government, government-aided, and self-financing institutions.","faq_q2":"How to reach these colleges?","faq_a2":"Most colleges are well-connected by Chennai Metro, MTC buses, and suburban trains. Check individual college pages for detailed directions.","bc_label":"Full Directory","filter":"Directory"},
  {"slug":"engineering-colleges-chennai-without-jee","title":"Engineering Colleges in Chennai Without JEE 2025","h1":"Engineering Colleges in Chennai Without JEE — Direct Admission 2025","desc":"Engineering colleges in Chennai that don't require JEE. TNEA-based admission, fees & placements.","kw":"engineering colleges in chennai without jee","stream":"Engineering","city":"Chennai","state":"","type":"","limit":"","intro":"Don't have a JEE score? No problem. The vast majority of engineering colleges in Chennai accept students through TNEA counseling based on +2 marks alone. Only IITs and NITs require JEE. This guide lists all non-JEE engineering colleges in Chennai.","faq_q1":"Can I study engineering in Chennai without JEE?","faq_a1":"Yes! Over 95% of Chennai engineering colleges accept TNEA counseling based on +2 marks. Only IIT Madras and NIT require JEE Main/Advanced.","faq_q2":"What is TNEA counseling?","faq_a2":"TNEA (Tamil Nadu Engineering Admissions) is the state-level online counseling process conducted by Anna University based on +2 PCM marks.","bc_label":"Without JEE","filter":"No JEE"},
  {"slug":"tier-1-engineering-colleges-chennai","title":"Tier 1 Engineering Colleges in Chennai 2025","h1":"Tier 1 Engineering Colleges in Chennai 2025","desc":"List of Tier 1 engineering colleges in Chennai with NIRF rankings, placements & fees.","kw":"tier 1 engineering colleges in chennai","stream":"Engineering","city":"Chennai","state":"","type":"","limit":"10","intro":"Tier 1 engineering colleges in Chennai represent the absolute elite — institutions with NIRF rankings, ₹10+ LPA average packages, and global recruiter presence. This curated list identifies the true Tier 1 colleges based on objective metrics.","faq_q1":"What makes a college Tier 1?","faq_a1":"Tier 1 colleges have NIRF rankings in the top 100, average placement packages above ₹10 LPA, strong research output, and NAAC A+ accreditation.","faq_q2":"Which Chennai colleges are Tier 1?","faq_a2":"IIT Madras, Anna University CEG, SSN College, and SRM (main campus) are widely considered Tier 1 engineering colleges in Chennai.","bc_label":"Tier 1","filter":"Tier 1"},
  {"slug":"tier-3-engineering-colleges-chennai","title":"Tier 3 Engineering Colleges in Chennai 2025","h1":"Tier 3 Engineering Colleges in Chennai 2025","desc":"Tier 3 engineering colleges in Chennai — fees, placements & admission process.","kw":"tier 3 engineering colleges in chennai","stream":"Engineering","city":"Chennai","state":"","type":"","limit":"","intro":"Tier 3 engineering colleges in Chennai offer affordable education with decent placement support. While they may not have top NIRF rankings, many provide practical training, industry connections, and placement assistance that deliver good career outcomes for students.","faq_q1":"Are Tier 3 colleges worth it?","faq_a1":"Yes, if you choose the right branch (CSE/IT) and actively participate in skill development. Many Tier 3 college CSE graduates earn ₹4-6 LPA.","faq_q2":"How to succeed in a Tier 3 college?","faq_a2":"Focus on coding skills, certifications, internships, and competitive programming. Your skills matter more than your college tier in the IT industry.","bc_label":"Tier 3","filter":"Tier 3"},
  {"slug":"mba-colleges/tamilnadu","title":"MBA Colleges in Tamil Nadu 2025 — Fees, Rankings & Placements","h1":"MBA Colleges in Tamil Nadu 2025","desc":"Complete list of MBA colleges in Tamil Nadu with fees, rankings, entrance exams & placement data.","kw":"mba colleges in tamilnadu","stream":"Management","city":"","state":"Tamil Nadu","type":"","limit":"","intro":"Tamil Nadu is a growing hub for management education with top B-schools like IIM Trichy, Great Lakes, LIBA, and Anna University Department of Management Studies. This guide covers all MBA/PGDM colleges across the state.","faq_q1":"Which are the best MBA colleges in Tamil Nadu?","faq_a1":"IIM Trichy, Great Lakes (Chennai), LIBA (Chennai), Anna University DoMS, and PSG IM (Coimbatore) are top MBA institutions.","faq_q2":"What is the average MBA package in TN?","faq_a2":"Top B-schools: ₹12-20 LPA. Mid-tier colleges: ₹5-10 LPA. Average across all colleges: ₹4-8 LPA.","bc_label":"MBA Colleges TN","filter":""},
  {"slug":"government-medical-colleges-chennai-top-10","title":"Top 10 Government Medical Colleges in Chennai 2025","h1":"Top 10 Government Medical Colleges in Chennai 2025","desc":"Top 10 government medical colleges in Chennai with NEET cutoffs, fees & facilities.","kw":"top 10 government medical colleges in chennai","stream":"Medical","city":"Chennai","state":"","type":"Government","limit":"10","intro":"Chennai's government medical colleges provide world-class MBBS education at minimal fees with excellent clinical training across government hospitals. This list ranks the top 10 government medical institutions in Chennai.","faq_q1":"How many government medical colleges are in Chennai?","faq_a1":"Chennai has 4 major government medical colleges: Madras Medical College, Stanley, Kilpauk, and Omandurar.","faq_q2":"What is the NEET cutoff for government medical colleges?","faq_a2":"General category requires 600+ NEET marks. OBC: 550+. SC/ST: 450+. Cutoffs vary year to year.","bc_label":"Top 10 Govt Medical","filter":"Government"},
  {"slug":"medical-colleges/tamilnadu","title":"Medical Colleges in Tamil Nadu 2025 — Complete List","h1":"Medical Colleges in Tamil Nadu 2025","desc":"All medical colleges in Tamil Nadu — government & private. NEET cutoffs, MBBS fees & admissions.","kw":"medical colleges in tamilnadu","stream":"Medical","city":"","state":"Tamil Nadu","type":"","limit":"","intro":"Tamil Nadu has one of India's strongest medical education ecosystems with over 50 medical colleges across government and private sectors. This comprehensive guide covers every medical institution in the state.","faq_q1":"How many medical colleges are in Tamil Nadu?","faq_a1":"Tamil Nadu has approximately 50+ medical colleges including government, private, and deemed university institutions across all districts.","faq_q2":"What is the MBBS admission process in TN?","faq_a2":"Admission is through state counseling based on NEET scores conducted by the TN Medical Admissions Committee.","bc_label":"Medical TN","filter":""},
  {"slug":"architecture-colleges-tamilnadu","title":"Architecture Colleges in Tamil Nadu 2025","h1":"Architecture Colleges in Tamil Nadu 2025","desc":"Complete list of architecture colleges in Tamil Nadu with fees, entrance exams & placements.","kw":"architecture colleges in tamilnadu","stream":"Architecture","city":"","state":"Tamil Nadu","type":"","limit":"","intro":"Tamil Nadu offers excellent architecture education through institutions affiliated to Anna University and other universities. From B.Arch programs at SAP Guindy to private colleges across the state, explore all options for architecture studies.","faq_q1":"Which are the best architecture colleges in TN?","faq_a1":"SAP (School of Architecture and Planning) Anna University, Measi Academy, and SRM School of Architecture are top choices.","faq_q2":"What is the eligibility for B.Arch?","faq_a2":"+2 with Maths and qualifying NATA (National Aptitude Test in Architecture) or JEE Main Paper 2 score.","bc_label":"Architecture TN","filter":""},
  {"slug":"hotel-management-colleges-tamilnadu","title":"Hotel Management Colleges in Tamil Nadu 2025","h1":"Hotel Management Colleges in Tamil Nadu 2025","desc":"Hotel management colleges in Tamil Nadu with courses, fees, placements & admission process.","kw":"hotel management colleges in tamilnadu","stream":"Hotel Management","city":"","state":"Tamil Nadu","type":"","limit":"","intro":"Tamil Nadu's tourism and hospitality industry creates strong demand for hotel management graduates. Top institutions across Chennai, Ooty, and other cities offer BHM and related programs with excellent industry placements.","faq_q1":"Which are the best hotel management colleges in TN?","faq_a1":"IHM Chennai, SRM Hotel Management, and Welcomgroup Graduate School of Hotel Administration (Manipal, with TN campus) are top choices.","faq_q2":"What is the career scope after hotel management?","faq_a2":"Hotels, airlines, cruise ships, event management, food industry. Starting salary: ₹3-6 LPA with rapid growth potential.","bc_label":"Hotel Management TN","filter":""},
  {"slug":"law-colleges/tamilnadu","title":"Law Colleges in Tamil Nadu 2025 — Rankings & Admissions","h1":"Law Colleges in Tamil Nadu 2025","desc":"Complete list of law colleges in Tamil Nadu with courses, fees, entrance exams & placements.","kw":"law colleges in tamilnadu","stream":"Law","city":"","state":"Tamil Nadu","type":"","limit":"","intro":"Tamil Nadu has a strong legal education tradition with institutions like Dr. Ambedkar Government Law College, SOEL (SASTRA), and several private law schools offering BA LLB, BBA LLB, and LLB programs.","faq_q1":"Which are the best law colleges in Tamil Nadu?","faq_a1":"Dr. Ambedkar Government Law College (Chennai), TNDALU affiliated colleges, SASTRA School of Law, and VIT School of Law.","faq_q2":"What is the admission process for law in TN?","faq_a2":"5-year integrated law: Through CLAT or university-level entrance. 3-year LLB: Based on graduation marks and TNDALU counseling.","bc_label":"Law Colleges TN","filter":""},
  {"slug":"nursing-colleges-tamilnadu","title":"Nursing Colleges in Tamil Nadu 2025","h1":"Nursing Colleges in Tamil Nadu 2025","desc":"Complete list of nursing colleges in Tamil Nadu with B.Sc Nursing fees, eligibility & admissions.","kw":"nursing colleges in tamilnadu","stream":"Nursing","city":"","state":"Tamil Nadu","type":"","limit":"","intro":"Tamil Nadu is a major hub for nursing education with colleges affiliated to The Tamil Nadu Dr. MGR Medical University. The state offers B.Sc Nursing, GNM, and ANM programs across government and private institutions with strong hospital affiliations.","faq_q1":"How many nursing colleges are in Tamil Nadu?","faq_a1":"Tamil Nadu has over 200 nursing colleges including government and private institutions across all districts.","faq_q2":"What is B.Sc Nursing fee in TN?","faq_a2":"Government: ₹10-20K/year. Private: ₹50K-2L/year. Admission based on +2 marks in science stream.","bc_label":"Nursing TN","filter":""},
  {"slug":"government-pharmacy-colleges-tamilnadu","title":"Government Pharmacy Colleges in Tamil Nadu 2025","h1":"Government Pharmacy Colleges in Tamil Nadu 2025","desc":"Government pharmacy colleges in Tamil Nadu with B.Pharm/D.Pharm fees, eligibility & admissions.","kw":"pharmacy colleges in tamilnadu government","stream":"Pharmacy","city":"","state":"Tamil Nadu","type":"Government","limit":"","intro":"Tamil Nadu's government pharmacy colleges offer affordable B.Pharm and D.Pharm programs with excellent clinical training and industry exposure. These colleges are affiliated to The Tamil Nadu Dr. MGR Medical University.","faq_q1":"Which government pharmacy colleges are in TN?","faq_a1":"Madras Medical College (Pharmacy), Govt. College of Pharmacy (Ramanathapuram), and other district-level government pharmacy institutions.","faq_q2":"What is the fee for government pharmacy colleges?","faq_a2":"Government pharmacy college fees are approximately ₹5,000-15,000 per year — highly affordable compared to private institutions.","bc_label":"Govt Pharmacy TN","filter":"Government"},
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
  const colleges = await fetchCollegesByFilter({{ {filters} }});
  const jsonLdSchemas = buildListingJsonLd({{ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS }});
  return (
    <>
      <HeadJsonLd schemas={{jsonLdSchemas}} />
      <SEOCollegeListing colleges={{colleges}} title="{title}" h1={{H1}} subtitle="{desc}" introText="{intro}" breadcrumbs={{BREADCRUMBS}} faqItems={{FAQ_ITEMS}} pageUrl={{PAGE_URL}} filterLabel="{filter}" />
    </>
  );
}}
'''

for p in PAGES:
    filters = []
    if p["stream"]: filters.append(f'stream: "{p["stream"]}"')
    if p["city"]: filters.append(f'city: "{p["city"]}"')
    if p["state"]: filters.append(f'state: "{p["state"]}"')
    if p["type"]: filters.append(f'type: "{p["type"]}"')
    if p["limit"]: filters.append(f'limit: {p["limit"]}')
    filter_str = ", ".join(filters)
    content = TEMPLATE.format(filters=filter_str, **p)
    dirpath = os.path.join(BASE, p["slug"])
    os.makedirs(dirpath, exist_ok=True)
    filepath = os.path.join(dirpath, "page.tsx")
    with open(filepath, "w") as f:
        f.write(content)
    print(f"Created: {p['slug']}")

# Also generate Location pages (dynamic route)
LOCATIONS = [
    {"area":"avadi","city":"Chennai","kw":"engineering colleges in chennai avadi"},
    {"area":"omr","city":"Chennai","kw":"engineering colleges in chennai omr"},
    {"area":"tambaram","city":"Chennai","kw":"engineering colleges in chennai tambaram"},
    {"area":"poonamallee","city":"Chennai","kw":"engineering colleges in poonamallee chennai"},
    {"area":"vellore","city":"Vellore","kw":"engineering colleges in vellore tamilnadu"},
]

LOC_TEMPLATE = '''import type {{ Metadata }} from "next";
import {{ fetchCollegesByFilter }} from "@/lib/seo/fetchColleges";
import {{ buildListingJsonLd }} from "@/lib/seo/jsonLd";
import {{ HeadJsonLd }} from "@/components/seo/HeadJsonLd";
import {{ SEOCollegeListing }} from "@/components/seo/SEOCollegeListing";

const PAGE_URL = "https://edumadras.com/{slug}";
const H1 = "Engineering Colleges in {area_title} 2025";
const BREADCRUMBS = [{{ label: "Engineering Colleges", href: "/engineering-colleges/{city_lower}" }}, {{ label: "{area_title}", href: "/{slug}" }}];
const FAQ_ITEMS = [{{ question: "Which engineering colleges are in {area_title}?", answer: "There are several AICTE-approved engineering colleges in and around {area_title} offering various branches of B.E/B.Tech programs." }}, {{ question: "How to reach {area_title} engineering colleges?", answer: "{area_title} is well-connected by Chennai Metro, MTC buses, and suburban trains. Most colleges are within 5 km of the {area_title} railway station." }}];

export const metadata: Metadata = {{
  title: "Engineering Colleges in {area_title} 2025 — Fees & Admissions | EduMadras",
  description: "Engineering colleges in {area_title} with fees, placements, branches & admission details. TNEA cutoffs for {area_title} area colleges.",
  keywords: "{kw}",
  alternates: {{ canonical: PAGE_URL }},
  openGraph: {{ title: "Engineering Colleges in {area_title} | EduMadras", url: PAGE_URL, siteName: "EduMadras", type: "website", locale: "en_IN" }},
}};

export default async function Page() {{
  const colleges = await fetchCollegesByFilter({{ stream: "Engineering", city: "{city}" }});
  const jsonLdSchemas = buildListingJsonLd({{ h1: H1, pageUrl: PAGE_URL, colleges, breadcrumbs: BREADCRUMBS, faqItems: FAQ_ITEMS }});
  return (
    <>
      <HeadJsonLd schemas={{jsonLdSchemas}} />
      <SEOCollegeListing colleges={{colleges}} title={{"Engineering Colleges in {area_title}"}} h1={{H1}} subtitle={{"Find the best engineering colleges near {area_title} with verified fees, placements & admission info."}} introText={{"{area_title} is a key educational area with several engineering colleges offering quality technical education. Whether you are looking for affordable government colleges or top-rated private institutions, this guide covers all engineering colleges in and around {area_title} with verified information."}} breadcrumbs={{BREADCRUMBS}} faqItems={{FAQ_ITEMS}} pageUrl={{PAGE_URL}} filterLabel={{"{area_title}"}} />
    </>
  );
}}
'''

for loc in LOCATIONS:
    area_title = loc["area"].title()
    city_lower = loc["city"].lower()
    if loc["city"] == "Vellore":
        slug = f"engineering-colleges/tamilnadu/{loc['area']}"
    else:
        slug = f"engineering-colleges/chennai/{loc['area']}"
    content = LOC_TEMPLATE.format(slug=slug, area_title=area_title, city_lower=city_lower, city=loc["city"], kw=loc["kw"])
    dirpath = os.path.join(BASE, slug)
    os.makedirs(dirpath, exist_ok=True)
    filepath = os.path.join(dirpath, "page.tsx")
    with open(filepath, "w") as f:
        f.write(content)
    print(f"Created location: {slug}")

print(f"\nDone! Created {len(PAGES)} pages + {len(LOCATIONS)} location pages = {len(PAGES)+len(LOCATIONS)} total Phase 3 pages.")
