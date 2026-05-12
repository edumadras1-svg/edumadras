"use client";

import { TopNavBar } from "@/components/TopNavBar";
import { InlineCTABanner } from "@/components/InlineCTABanner";
import { FAQAccordion } from "@/components/FAQAccordion";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin, Calendar, Phone, Award, Star, Users, BookOpen,
  CheckCircle2, ChevronRight, TrendingUp, Building2, GraduationCap,
  Home as HomeIcon, Briefcase, FileText, HelpCircle
} from "lucide-react";
import { InlineLeadForm } from "@/components/InlineLeadForm";
import { JsonLd } from "@/components/JsonLd";

const fadeInUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };

const SEC_COURSES = [
  { name: "B.E Computer Science & Engineering (CSE)", duration: "4 Years", fee: "₹1.15L–1.30L/yr", eligibility: "TNEA / 10+2 Merit" },
  { name: "B.E CSE (AI & Data Science)", duration: "4 Years", fee: "₹1.20L–1.40L/yr", eligibility: "TNEA / 10+2 Merit" },
  { name: "B.E CSE (AI & Machine Learning)", duration: "4 Years", fee: "₹1.20L–1.40L/yr", eligibility: "TNEA / 10+2 Merit" },
  { name: "B.E CSE (Data Science)", duration: "4 Years", fee: "₹1.20L–1.40L/yr", eligibility: "TNEA / 10+2 Merit" },
  { name: "B.E Information Technology (IT)", duration: "4 Years", fee: "₹1.10L–1.25L/yr", eligibility: "TNEA / 10+2 Merit" },
  { name: "B.E Electronics & Communication (ECE)", duration: "4 Years", fee: "₹1.10L–1.25L/yr", eligibility: "TNEA / 10+2 Merit" },
  { name: "B.E Electrical & Electronics (EEE)", duration: "4 Years", fee: "₹1.00L–1.15L/yr", eligibility: "TNEA / 10+2 Merit" },
  { name: "B.E Mechanical Engineering", duration: "4 Years", fee: "₹95K–1.10L/yr", eligibility: "TNEA / 10+2 Merit" },
  { name: "B.E Civil Engineering", duration: "4 Years", fee: "₹90K–1.05L/yr", eligibility: "TNEA / 10+2 Merit" },
  { name: "MBA", duration: "2 Years", fee: "₹65K–85K/yr", eligibility: "TANCET / CAT / MAT" },
  { name: "MCA", duration: "2 Years", fee: "₹70K–90K/yr", eligibility: "Any UG Degree" },
  { name: "M.E / M.Tech", duration: "2 Years", fee: "₹1.0L/yr", eligibility: "B.E / B.Tech Graduate" },
];

const CUTOFF_DATA = [
  { course: "CSE", oc: "185–195", bc: "170–182", mbc: "160–175", sc: "145–162" },
  { course: "ECE", oc: "178–190", bc: "165–178", mbc: "155–168", sc: "140–158" },
  { course: "Mechanical", oc: "160–175", bc: "148–162", mbc: "138–152", sc: "125–140" },
  { course: "Civil", oc: "155–170", bc: "144–158", mbc: "134–148", sc: "122–136" },
];

const FAQ_ITEMS = [
  { question: "What is the fees structure of Saveetha Engineering College?", answer: "Saveetha Engineering College fees range from approximately ₹90,000 to ₹1,40,000 per year for B.E/B.Tech programmes depending on the specialisation. MBA fees range from ₹65,000 to ₹85,000 per year. Total 4-year engineering cost is approximately ₹3.6 lakhs to ₹5.6 lakhs." },
  { question: "What is the TNEA code for Saveetha Engineering College?", answer: "The TNEA code for Saveetha Engineering College is 1125. Use this code when applying through the TNEA portal (tnea.ac.in)." },
  { question: "What is the highest package at Saveetha Engineering College?", answer: "The highest placement package at Saveetha Engineering College is approximately ₹18–22 LPA. The average package across all departments is ₹4.5–6.5 LPA." },
  { question: "What is the NIRF ranking of Saveetha Engineering College?", answer: "Saveetha Engineering College is ranked in the NIRF 151–200 band for engineering institutions in India." },
  { question: "Does Saveetha Engineering College have a hostel facility?", answer: "Yes. Separate hostel facilities for boys and girls within the campus. Hostel fees are approximately ₹70,000–₹1,10,000 per year including food." },
  { question: "What is the MBA fees structure at Saveetha Engineering College?", answer: "The MBA programme costs approximately ₹65,000–₹85,000 per year, making it a 2-year total investment of ₹1,30,000–₹1,70,000." },
  { question: "What is the TNEA cutoff for Saveetha Engineering College CSE?", answer: "The approximate TNEA cutoff for CSE for OC (General) category is 185–195 marks out of 200. Cutoffs vary by department and community category." },
  { question: "What is the dress code at Saveetha Engineering College?", answer: "Boys: Formal trousers (dark), formal shirt (light colour), formal shoes. Girls: Salwar kameez or churidar with dupatta. ID cards must be worn at all times within campus." },
];

const TABS = ["Overview", "Fees & Courses", "Cutoff", "Placements", "Hostel"];

export default function SaveethaEngineeringCollegePage() {
  const [activeTab, setActiveTab] = useState("Overview");

  const collegeSchema = {
    "@context": "https://schema.org", "@type": "EducationalOrganization",
    name: "Saveetha Engineering College", alternateName: "SEC Chennai",
    url: "https://www.saveetha.ac.in",
    address: { "@type": "PostalAddress", streetAddress: "Thandalam", addressLocality: "Chennai", addressRegion: "Tamil Nadu", postalCode: "602105", addressCountry: "IN" },
    telephone: "+91-44-26810600", foundingDate: "2001",
    description: "Saveetha Engineering College is a private engineering college affiliated to Anna University, Chennai, offering B.E, B.Tech, M.E, M.Tech, and MBA programmes.",
  };

  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map(f => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-teal-100 selection:text-teal-900 pb-24">
      <TopNavBar />
      <JsonLd schema={collegeSchema} />
      <JsonLd schema={faqSchema} />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs font-medium text-gray-500 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            <Link href="/engineering-colleges/chennai" className="hover:text-teal-600 transition-colors">Engineering Colleges Chennai</Link>
            <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            <span className="text-gray-900 font-semibold truncate">Saveetha Engineering College</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">

            {/* Hero Card */}
            <motion.div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100" initial="initial" animate="animate" variants={fadeInUp}>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center justify-center">
                  <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-br from-blue-700 to-teal-600">SEC</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5" /> AICTE Approved
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
                      Anna University Affiliated
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-4xl font-extrabold text-[#1E293B] leading-tight mb-3">
                    Saveetha Engineering College, Chennai — Fees & Placements 2026
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm md:text-base">
                    <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-red-400" /><span>Thandalam, Chennai — 602 105</span></div>
                    <div className="flex items-center gap-1.5 border-l border-gray-200 pl-4"><Calendar className="w-4 h-4 text-blue-400" /><span>Est. 2001</span></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">TNEA Code: <strong className="text-gray-700">1125</strong> · College Type: Private — Self-Financing</p>

                  <div className="mt-5 flex items-center">
                    <a href="tel:+919363699095" className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-emerald-600 p-1.5 pr-6 rounded-full shadow-lg shadow-teal-500/20 transition-all hover:shadow-teal-500/30 hover:-translate-y-0.5">
                      <div className="bg-white rounded-full p-2.5 shadow-inner flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-teal-500/20 rounded-full animate-ping"></div>
                        <Phone className="w-5 h-5 text-teal-600 fill-teal-600/20 relative z-10" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest font-extrabold text-white/90 leading-none">Admission Helpline</span>
                        <span className="text-lg font-black text-white leading-tight mt-0.5">+91 93636 99095</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-50">
                {[
                  { icon: Award, label: "NIRF Band", value: "151–200", color: "amber" },
                  { icon: Star, label: "Placement %", value: "80%+", color: "emerald" },
                  { icon: TrendingUp, label: "Highest Pkg", value: "₹22 LPA", color: "blue" },
                  { icon: Users, label: "Avg Package", value: "₹5.5 LPA", color: "purple" },
                ].map((s, i) => (
                  <div key={i} className={`bg-${s.color}-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center`}>
                    <s.icon className={`w-6 h-6 text-${s.color}-500 mb-2`} />
                    <p className="text-xs text-gray-500 font-medium">{s.label}</p>
                    <p className="text-lg font-bold text-gray-900">{s.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Mobile Lead Form */}
            <div className="block lg:hidden"><InlineLeadForm collegeName="Saveetha Engineering College" collegeId="sec-chennai" /></div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-[52px] z-30">
              <div className="flex overflow-x-auto scrollbar-hide">
                {TABS.map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`flex-1 min-w-[100px] px-4 py-4 text-sm font-bold transition-all relative ${activeTab === tab ? "text-teal-700 bg-teal-50/50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}>
                    {tab}
                    {activeTab === tab && <motion.div layoutId="secActiveTab" className="absolute bottom-0 left-0 right-0 h-1 bg-teal-600 rounded-t-full" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">

              {activeTab === "Overview" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Building2 className="w-6 h-6 text-teal-600" /> About Saveetha Engineering College</h2>
                  <p className="text-gray-600 leading-relaxed">Saveetha Engineering College (SEC) is one of Chennai&apos;s most sought-after private engineering institutions, affiliated to Anna University and approved by AICTE. Located in Thandalam, Chennai, the college offers undergraduate, postgraduate, and doctoral programmes across engineering, technology, and management disciplines.</p>
                  <p className="text-gray-600 leading-relaxed">The college is consistently ranked among the top private engineering institutions in Tamil Nadu. With 100+ companies visiting campus annually and an 80%+ placement rate for CSE & IT departments, SEC provides strong career outcomes for its graduates.</p>

                  <div className="mt-6 bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Facts</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {[
                        ["Full Name", "Saveetha Engineering College"],
                        ["TNEA Code", "1125"],
                        ["Affiliation", "Anna University, Chennai"],
                        ["College Type", "Private — Self-Financing"],
                        ["Contact", "+91-44-26810600"],
                        ["Website", "www.saveetha.ac.in"],
                      ].map(([l, v], i) => (
                        <div key={i}><span className="text-gray-400 font-medium text-xs uppercase">{l}</span><p className="font-semibold text-gray-800">{v}</p></div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 bg-amber-50/50 rounded-2xl p-6 border border-amber-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Why Choose Saveetha Engineering College?</h3>
                    <ul className="space-y-3">
                      {["AICTE Approved & Anna University Affiliated — autonomous curriculum", "80%+ placement rate — CSE & IT departments", "Highest package ₹18–22 LPA from top recruiters", "100+ companies visit campus annually for placements", "Located near Sriperumbudur on Chennai–Bengaluru Highway"].map((t, i) => (
                        <li key={i} className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" /><span className="text-gray-700">{t}</span></li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeTab === "Fees & Courses" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><BookOpen className="w-6 h-6 text-teal-600" /> Saveetha Engineering College Fees Structure 2026</h2>
                  <p className="text-sm text-gray-500">Fees include tuition, lab, and examination charges. Hostel and transport charged separately.</p>
                  <div className="grid gap-4 max-h-[700px] overflow-y-auto pr-2 scrollbar-hide">
                    {SEC_COURSES.map((course, i) => (
                      <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-gray-100 hover:border-teal-200 hover:bg-teal-50/30 transition-all gap-4">
                        <div>
                          <h3 className="font-bold text-gray-900">{course.name}</h3>
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {course.duration}</span>
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md">{course.eligibility}</span>
                          </div>
                        </div>
                        <div className="text-left md:text-right">
                          <div className="text-lg font-black text-teal-700">{course.fee}</div>
                          <button onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-teal-600 font-bold hover:underline mt-1">Get Details →</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "Cutoff" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><FileText className="w-6 h-6 text-teal-600" /> TNEA Cutoff — Saveetha Engineering College (2024–25)</h2>
                  <p className="text-sm text-gray-500">TNEA Code: <strong>1125</strong> · Cutoff marks out of 200 (based on 12th marks)</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="bg-gray-50">
                        {["Course", "OC (General)", "BC", "MBC", "SC"].map(h => <th key={h} className="px-4 py-3 text-left font-bold text-gray-700 first:rounded-tl-xl last:rounded-tr-xl">{h}</th>)}
                      </tr></thead>
                      <tbody>
                        {CUTOFF_DATA.map((row, i) => (
                          <tr key={i} className="border-t border-gray-100 hover:bg-teal-50/30">
                            <td className="px-4 py-3 font-semibold text-gray-900">{row.course}</td>
                            <td className="px-4 py-3 text-gray-600">{row.oc}</td>
                            <td className="px-4 py-3 text-gray-600">{row.bc}</td>
                            <td className="px-4 py-3 text-gray-600">{row.mbc}</td>
                            <td className="px-4 py-3 text-gray-600">{row.sc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Approximate figures based on previous TNEA cycles. Official cutoffs are released by Anna University.</p>
                </motion.div>
              )}

              {activeTab === "Placements" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><TrendingUp className="w-6 h-6 text-teal-600" /> Saveetha Engineering College Placements 2025</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { label: "Highest Package", value: "₹18–22 LPA", color: "teal" },
                      { label: "Average Package", value: "₹4.5–6.5 LPA", color: "blue" },
                      { label: "Placement %", value: "80%+ (CSE/IT)", color: "emerald" },
                    ].map((s, i) => (
                      <div key={i} className={`bg-gradient-to-br from-${s.color}-50 to-${s.color}-100/50 p-6 rounded-2xl border border-${s.color}-100 text-center`}>
                        <p className={`text-2xl font-black text-${s.color}-700`}>{s.value}</p>
                        <p className={`text-sm font-medium text-${s.color}-800 mt-1`}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 bg-amber-50/50 rounded-2xl p-6 border border-amber-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Top Recruiters</h3>
                    <div className="flex flex-wrap gap-2">
                      {["TCS", "Infosys", "Wipro", "Cognizant", "Capgemini", "HCL", "Zoho", "Accenture", "IBM", "L&T Infotech", "NTT Data", "Tech Mahindra"].map(c => (
                        <span key={c} className="px-3 py-1.5 bg-white rounded-full text-sm font-semibold text-gray-700 border border-amber-200 shadow-sm">{c}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "Hostel" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><HomeIcon className="w-6 h-6 text-teal-600" /> Hostel Facilities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      ["Hostel Type", "Separate Boys & Girls Hostels"],
                      ["Accommodation", "2–4 sharing rooms"],
                      ["Hostel Fees", "₹70,000 – ₹1,10,000/yr (incl. food)"],
                      ["Facilities", "Wi-Fi, 24/7 security, reading room, laundry, mess"],
                      ["Mess Type", "Vegetarian & non-vegetarian options"],
                      ["Contact", "+91-44-26810600"],
                    ].map(([l, v], i) => (
                      <div key={i} className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
                        <span className="text-xs text-gray-400 font-bold uppercase">{l}</span>
                        <p className="font-semibold text-gray-800 mt-1">{v}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-6"><HelpCircle className="w-6 h-6 text-teal-600" /> Frequently Asked Questions</h2>
              <FAQAccordion items={FAQ_ITEMS} />
            </div>

            <InlineCTABanner headline="Need help with Saveetha Engineering College admission?" subtext="Talk to our expert counselors for free guidance on fees, cutoff, and seat availability." />
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-4 relative">
            <div className="sticky top-24" id="lead-form">
              <InlineLeadForm collegeName="Saveetha Engineering College" collegeId="sec-chennai" />
              <div className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-3xl border border-amber-200 text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 text-amber-600"><GraduationCap className="w-6 h-6" /></div>
                <h3 className="text-lg font-bold text-amber-900">TNEA Code: 1125</h3>
                <p className="text-sm text-amber-700 mt-2 font-medium">Apply through TNEA portal (tnea.ac.in) for government quota seats using 12th marks.</p>
              </div>
              <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-3xl border border-blue-200 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-600"><Building2 className="w-6 h-6" /></div>
                <h3 className="text-lg font-bold text-blue-900">Campus Location</h3>
                <p className="text-sm text-blue-700 mt-2 font-medium">Thandalam, near Sriperumbudur, off Chennai–Bengaluru Highway (NH48). Nearest Railway Station: Tiruvallur (~15 km).</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
