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
                  <img src="data:image/jpeg;base64,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" alt="Saveetha Engineering College Logo" className="w-full h-full object-contain" />
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
