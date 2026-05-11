"use client";

import { TopNavBar } from "@/components/TopNavBar";
import { InlineCTABanner } from "@/components/InlineCTABanner";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Phone,
  Award,
  Star,
  Users,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Building2,
  GraduationCap
} from "lucide-react";
import { InlineLeadForm } from "@/components/InlineLeadForm";
import { JsonLd } from "@/components/JsonLd";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const HITS_COURSES = [
  { name: "B.Tech Aeronautical Engineering", duration: "4 Years", fee: "₹4.0L/yr" },
  { name: "B.Tech Aerospace Engineering", duration: "4 Years", fee: "₹4.0L/yr" },
  { name: "B.Tech Computer Science Engineering", duration: "4 Years", fee: "₹2.9L/yr" },
  { name: "B.Tech AI & DS", duration: "4 Years", fee: "₹2.9L/yr" },
  { name: "B.Tech Information Technology", duration: "4 Years", fee: "₹2.9L/yr" },
  { name: "B.Tech CSE (AI & ML) with IBM", duration: "4 Years", fee: "₹3.5L/yr" },
  { name: "B.Tech CSE (Cyber Security) with IBM", duration: "4 Years", fee: "₹3.5L/yr" },
  { name: "B.Tech CSE IOT/Blockchain/CCV with IBM", duration: "4 Years", fee: "₹3.5L/yr" },
  { name: "B.Tech CSE (Gen AI) with Google", duration: "4 Years", fee: "₹3.2L/yr" },
  { name: "B.Tech CSE (Cloud Security) with Google", duration: "4 Years", fee: "₹3.2L/yr" },
  { name: "B.Tech CSE (Full Stack Development)", duration: "4 Years", fee: "₹3.6L/yr" },
  { name: "B.Tech Auto-Electric Mobility", duration: "4 Years", fee: "₹3.1L/yr" },
  { name: "B.Tech Automobile Engineering", duration: "4 Years", fee: "₹1.9L/yr" },
  { name: "B.Tech Civil Engineering", duration: "4 Years", fee: "₹1.9L/yr" },
  { name: "B.Tech Bio-Technology", duration: "4 Years", fee: "₹1.9L/yr" },
  { name: "B.Tech Electrical and Electronics Engineering", duration: "4 Years", fee: "₹1.9L/yr" },
  { name: "B.Tech Mechanical Engineering", duration: "4 Years", fee: "₹1.9L/yr" },
  { name: "B.Tech Mechatronics Engineering", duration: "4 Years", fee: "₹1.9L/yr" },
  { name: "B.Tech Biomedical Engineering", duration: "4 Years", fee: "₹1.9L/yr" },
  { name: "B.Tech Robotics and Artificial Intelligence", duration: "4 Years", fee: "₹1.9L/yr" },
  { name: "B.Tech Electronics and Communication Engineering", duration: "4 Years", fee: "₹1.9L/yr" },
  { name: "B.Arch", duration: "5 Years", fee: "₹1.9L/yr" },
  { name: "B.Des (Fashion & Apparel Design)", duration: "4 Years", fee: "₹1.9L/yr" },
  { name: "B.Des (Communication Design)", duration: "4 Years", fee: "₹1.9L/yr" },
  { name: "B.Des (Graphic Design)", duration: "4 Years", fee: "₹2.5L/yr" },
  { name: "B.Com & Specialization", duration: "3 Years", fee: "₹93K/yr" },
  { name: "B.Com General", duration: "3 Years", fee: "₹82K/yr" },
  { name: "B.A English", duration: "3 Years", fee: "₹79K/yr" },
  { name: "B.A Economics", duration: "3 Years", fee: "₹79K/yr" },
  { name: "B.A Political & International Relations", duration: "3 Years", fee: "₹75K/yr" },
  { name: "B.A (Law, Eco, PS)", duration: "3 Years", fee: "₹79K/yr" },
  { name: "B.Sc Interior Design", duration: "3 Years", fee: "₹79K/yr" },
  { name: "B.Sc Fashion Design", duration: "3 Years", fee: "₹87K/yr" },
  { name: "B.Sc Visual Communication", duration: "3 Years", fee: "₹98K/yr" },
  { name: "BVA & Specialization", duration: "4 Years", fee: "₹1.1L/yr" },
  { name: "BCA", duration: "3 Years", fee: "₹1.1L/yr" },
  { name: "BCA (Cyber Security)", duration: "3 Years", fee: "₹1.2L/yr" },
  { name: "B.Sc Computer Science", duration: "3 Years", fee: "₹95K/yr" },
  { name: "B.Sc CS (Gaming Design)", duration: "3 Years", fee: "₹95K/yr" },
  { name: "B.Sc AI & DA", duration: "3 Years", fee: "₹95K/yr" },
  { name: "B.Sc Data Science", duration: "3 Years", fee: "₹1.1L/yr" },
  { name: "B.Sc UAS", duration: "3 Years", fee: "₹75K/yr" },
  { name: "B.Sc Food Tech", duration: "3 Years", fee: "₹79K/yr" },
  { name: "B.Sc Maths & DS", duration: "3 Years", fee: "₹79K/yr" },
  { name: "B.Sc Psychology", duration: "3 Years", fee: "₹79K/yr" },
  { name: "M.Sc Maths Integrated", duration: "5 Years", fee: "₹79K/yr" },
  { name: "B.Sc Physical Education", duration: "3 Years", fee: "₹75K/yr" },
  { name: "B.Sc Chemistry", duration: "3 Years", fee: "₹75K/yr" },
  { name: "BBA", duration: "3 Years", fee: "₹1.4L/yr" },
  { name: "BBA Aviation Management", duration: "3 Years", fee: "₹1.7L/yr" },
  { name: "BBA Digital Marketing", duration: "3 Years", fee: "₹1.4L/yr" },
  { name: "BBA Banking & FT", duration: "3 Years", fee: "₹1.4L/yr" },
  { name: "BBA Logistics", duration: "3 Years", fee: "₹1.4L/yr" },
  { name: "BBA Retail and Franchise Management", duration: "3 Years", fee: "₹1.4L/yr" },
  { name: "BBA Hospital Management", duration: "3 Years", fee: "₹1.4L/yr" },
  { name: "MBA Aviation Management", duration: "2 Years", fee: "₹3.7L/yr" },
  { name: "MBA Business Analytics", duration: "2 Years", fee: "₹3.7L/yr" },
  { name: "MBA Finance, Marketing and HR", duration: "2 Years", fee: "₹3.3L/yr" },
  { name: "MBA Logistics & Supply Chain", duration: "2 Years", fee: "₹3.3L/yr" },
  { name: "MBA Hospital Management", duration: "2 Years", fee: "₹3.3L/yr" },
  { name: "MBA Media and Entertainment", duration: "2 Years", fee: "₹3.3L/yr" },
  { name: "MBA Hotel and Tourism Management", duration: "2 Years", fee: "₹3.3L/yr" },
  { name: "MBA Sports Management", duration: "2 Years", fee: "₹3.3L/yr" },
  { name: "MBA Retail and Franchise Management", duration: "2 Years", fee: "₹3.1L/yr" },
  { name: "MBA Entrepreneurship", duration: "2 Years", fee: "₹3.1L/yr" },
  { name: "Executive MBA", duration: "1 Year", fee: "₹6.0L/yr" },
  { name: "B.Sc Forensic Science", duration: "3 Years", fee: "₹100K/yr" },
  { name: "B.Optometry", duration: "4 Years", fee: "₹98K/yr" },
  { name: "BPT (Physiotherapy)", duration: "4.5 Years", fee: "₹1.4L/yr" },
  { name: "B.Pharmacy", duration: "4 Years", fee: "₹1.6L/yr" },
  { name: "B.Sc Nursing", duration: "4 Years", fee: "₹2.3L/yr" },
  { name: "M.Tech Aeronautical", duration: "2 Years", fee: "₹1.1L/yr" },
  { name: "M.Tech DT", duration: "2 Years", fee: "₹1.1L/yr" },
  { name: "M.Tech CSE", duration: "2 Years", fee: "₹1.1L/yr" },
  { name: "M.Tech Automobile", duration: "2 Years", fee: "₹92K/yr" },
  { name: "M.Tech Auto (GARC)", duration: "2 Years", fee: "₹1.1L/yr" },
  { name: "M.Tech Robotics & Mechatronics", duration: "2 Years", fee: "₹92K/yr" },
  { name: "M.Tech Civil", duration: "2 Years", fee: "₹92K/yr" },
  { name: "M.Tech Bio-Technology", duration: "2 Years", fee: "₹92K/yr" },
  { name: "M.Arch (Housing)", duration: "2 Years", fee: "₹75K/yr" },
  { name: "M.Plan Urban", duration: "2 Years", fee: "₹75K/yr" },
  { name: "MCA & Specialization", duration: "2 Years", fee: "₹1.9L/yr" },
  { name: "M.Sc FT", duration: "2 Years", fee: "₹79K/yr" },
  { name: "M.Sc Data Science", duration: "2 Years", fee: "₹77K/yr" },
  { name: "M.Sc (AI & DA)", duration: "2 Years", fee: "₹77K/yr" },
  { name: "M.Sc Applied Psychology", duration: "2 Years", fee: "₹75K/yr" },
  { name: "M.Sc Sport Management", duration: "2 Years", fee: "₹75K/yr" },
  { name: "M.Com & Specialization", duration: "2 Years", fee: "₹75K/yr" },
  { name: "MPT", duration: "2 Years", fee: "₹1.5L/yr" },
  { name: "MSW", duration: "2 Years", fee: "₹75K/yr" },
  { name: "M.Sc Nano Science", duration: "2 Years", fee: "₹77K/yr" },
  { name: "M.Sc Chemistry", duration: "2 Years", fee: "₹75K/yr" },
  { name: "M.A Christian Studies", duration: "2 Years", fee: "₹75K/yr" },
  { name: "M.Sc User Experience Design", duration: "2 Years", fee: "₹1.3L/yr" },
  { name: "M.A Public Administration", duration: "2 Years", fee: "₹75K/yr" },
  { name: "M.Sc Visual Communication", duration: "2 Years", fee: "₹92K/yr" },
  { name: "BA LLB (Hons)", duration: "5 Years", fee: "₹2.3L/yr" },
  { name: "BBA LLB (Hons)", duration: "5 Years", fee: "₹2.3L/yr" },
  { name: "LLB", duration: "3 Years", fee: "₹2.3L/yr" },
  { name: "LLM & Specialization", duration: "1 Year", fee: "₹1.3L/yr" },
  { name: "B.Sc Digital Forensics and Cyber Security", duration: "3 Years", fee: "₹100K/yr" },
  { name: "B.Sc Criminology & Police Administration", duration: "3 Years", fee: "₹95K/yr" },
  { name: "Master of Hospital Administration", duration: "2 Years", fee: "₹75K/yr" },
  { name: "M.Sc Physician Associate", duration: "2 Years", fee: "₹1.0L/yr" },
  { name: "M.Sc Clinical Nutrition", duration: "2 Years", fee: "₹1.0L/yr" },
];

export default function HindustanTeluguPage() {
  const [activeTab, setActiveTab] = useState("అవలోకనం"); // Overview

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-teal-100 selection:text-teal-900 pb-24">
      <TopNavBar />

      <JsonLd
        type="CollegeOrUniversity"
        name="Hindustan Institute of Technology and Science"
        description="హిందుస్థాన్ ఇన్స్టిట్యూట్ ఆఫ్ టెక్నాలజీ అండ్ సైన్స్ (HITS) చెన్నైలో ఒక ప్రముఖ డీమ్డ్ విశ్వవిద్యాలయం."
        url="https://edumadras.com/hindustan-institute-of-technology-science-telugu"
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs font-medium text-gray-500 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <Link href="/" className="hover:text-teal-600 transition-colors">హోమ్ (Home)</Link>
            <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            <Link href="/colleges" className="hover:text-teal-600 transition-colors">కళాశాలలు (Colleges)</Link>
            <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            <span className="text-gray-900 font-semibold truncate">హిందుస్థాన్ ఇన్స్టిట్యూట్ (HITS)</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-6">

            {/* Hero Card */}
            <motion.div
              className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100"
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center justify-center">
                  <img src="https://cdn.npfs.co/uploads/template/58/4367/publish/images/logo.png?1730800613" alt="Hindustan Logo" className="w-full h-full object-contain" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider mb-3">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    UGC Approved Deemed University
                  </div>

                  <h1 className="text-2xl md:text-4xl font-extrabold text-[#1E293B] leading-tight mb-3">
                    హిందుస్థాన్ ఇన్స్టిట్యూట్ ఆఫ్ టెక్నాలజీ అండ్ సైన్స్ (HITS)
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm md:text-base">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-red-400" />
                      <span>చెన్నై, తమిళనాడు (Chennai)</span>
                    </div>
                    <div className="flex items-center gap-1.5 border-l border-gray-200 pl-4">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <span>స్థాపన: 1985</span>
                    </div>
                  </div>

                  {/* Phone CTA */}
                  <div className="mt-6 flex items-center">
                    <a href="tel:+919363699095" className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-emerald-600 p-1.5 pr-6 rounded-full shadow-lg shadow-teal-500/20 transition-all hover:shadow-teal-500/30 hover:-translate-y-0.5">
                      <div className="bg-white rounded-full p-2.5 shadow-inner flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-teal-500/20 rounded-full animate-ping"></div>
                        <Phone className="w-5 h-5 text-teal-600 fill-teal-600/20 relative z-10" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest font-extrabold text-white/90 leading-none">తెలుగులో అడ్మిషన్ సహాయం (Telugu Helpline)</span>
                        <span className="text-lg font-black text-white leading-tight mt-0.5">+91 93636 99095</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-50">
                <div className="bg-amber-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                  <Award className="w-6 h-6 text-amber-500 mb-2" />
                  <p className="text-xs text-gray-500 font-medium">NIRF Rank</p>
                  <p className="text-lg font-bold text-gray-900">#107</p>
                </div>
                <div className="bg-emerald-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                  <Star className="w-6 h-6 text-emerald-500 mb-2" />
                  <p className="text-xs text-gray-500 font-medium">NAAC Grade</p>
                  <p className="text-lg font-bold text-gray-900">A+</p>
                </div>
                <div className="bg-blue-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                  <TrendingUp className="w-6 h-6 text-blue-500 mb-2" />
                  <p className="text-xs text-gray-500 font-medium">Highest Package</p>
                  <p className="text-lg font-bold text-gray-900">12 LPA</p>
                </div>
                <div className="bg-purple-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                  <Users className="w-6 h-6 text-purple-500 mb-2" />
                  <p className="text-xs text-gray-500 font-medium">Students</p>
                  <p className="text-lg font-bold text-gray-900">10,000+</p>
                </div>
              </div>
            </motion.div>

            {/* Mobile Lead Form Header */}
            <div className="block lg:hidden mt-6">
              <InlineLeadForm collegeName="Hindustan College (Telugu Landing)" collegeId="hits-telugu" />
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-[60px] z-30">
              <div className="flex overflow-x-auto scrollbar-hide">
                {["అవలోకనం", "కోర్సులు", "ప్లేస్‌మెంట్స్"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 min-w-[120px] px-6 py-4 text-sm font-bold transition-all relative ${activeTab === tab ? "text-teal-700 bg-teal-50/50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 right-0 h-1 bg-teal-600 rounded-t-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
              {activeTab === "అవలోకనం" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-teal-600" /> కళాశాల గురించి (About)
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    హిందుస్థాన్ ఇన్స్టిట్యూట్ ఆఫ్ టెక్నాలజీ అండ్ సైన్స్ (HITS) చెన్నైలో ఉన్నత విద్యా సంస్థలలో ఒకటి. 1985లో స్థాపించబడిన ఈ విద్యాసంస్థ ఇంజనీరింగ్, ఏవియేషన్, మేనేజ్‌మెంట్ మరియు సైన్స్ రంగాలలో అత్యుత్తమ విద్యను అందిస్తోంది.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    అత్యాధునిక మౌలిక సదుపాయాలు మరియు ఇండస్ట్రీతో అనుబంధం ఉన్న కోర్సులతో, HITS విద్యార్థులకు ప్రపంచ స్థాయి అవకాశాలను అందిస్తోంది. NAAC ద్వారా 'A+' గ్రేడ్‌తో గుర్తింపు పొందింది.
                  </p>

                  <div className="mt-8 bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">ఎందుకు హిందుస్థాన్‌ని ఎంచుకోవాలి? (Why Choose HITS?)</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <span className="text-gray-700">వందకు పైగా అంతర్జాతీయ విశ్వవిద్యాలయాలతో ఎంఓయూలు (International MOUs).</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <span className="text-gray-700">టాప్ ఐటీ మరియు కోర్ కంపెనీలలో అద్భుతమైన ప్లేస్‌మెంట్స్.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <span className="text-gray-700">చెన్నైలోని ప్రధాన ఐటీ కారిడార్ (OMR) కి సమీపంలో క్యాంపస్.</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeTab === "కోర్సులు" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-teal-600" /> ప్రధాన కోర్సులు (Top Courses)
                  </h2>
                  <div className="grid gap-4 max-h-[800px] overflow-y-auto pr-2 scrollbar-hide">
                    {HITS_COURSES.map((course, i) => (
                      <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-gray-100 hover:border-teal-200 hover:bg-teal-50/30 transition-all gap-4">
                        <div>
                          <h3 className="font-bold text-gray-900">{course.name}</h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {course.duration}</span>
                          </div>
                        </div>
                        <div className="text-left md:text-right">
                          <div className="text-lg font-black text-teal-700">{course.fee}</div>
                          <button onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-teal-600 font-bold hover:underline mt-1">
                            వివరాలు తెలుసుకోండి
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "ప్లేస్‌మెంట్స్" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-teal-600" /> ప్లేస్‌మెంట్స్ (Placements)
                  </h2>
                  <p className="text-gray-600">
                    హిందుస్థాన్ ఇన్స్టిట్యూట్ విద్యార్థులకు అత్యుత్తమ ఉద్యోగ అవకాశాలను కల్పిస్తోంది. IBM, Infosys, TCS, Amazon వంటి అగ్రశ్రేణి కంపెనీలు క్యాంపస్ ప్లేస్‌మెంట్స్‌లో పాల్గొంటాయి.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-6 rounded-2xl border border-teal-100 text-center">
                      <p className="text-3xl font-black text-teal-700">12 LPA</p>
                      <p className="text-sm font-medium text-teal-800 mt-1">అత్యధిక ప్యాకేజీ (Highest Package)</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 text-center">
                      <p className="text-3xl font-black text-blue-700">4.5 LPA</p>
                      <p className="text-sm font-medium text-blue-800 mt-1">సగటు ప్యాకేజీ (Average Package)</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="mt-8">
              <InlineCTABanner
                headline="మీ అడ్మిషన్ ప్రాసెస్‌లో సహాయం కావాలా?"
                subtext="మా తెలుగు మాట్లాడే నిపుణులతో ఉచితంగా మాట్లాడండి."
              />
            </div>
          </div>

          {/* Sidebar / Desktop Lead Form */}
          <div className="hidden lg:block lg:col-span-4 relative">
            <div className="sticky top-24" id="lead-form">
              <InlineLeadForm collegeName="Hindustan College (Telugu Landing)" collegeId="hits-telugu" />

              <div className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-3xl border border-amber-200 text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 text-amber-600">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-amber-900">స్కాలర్‌షిప్ అవకాశం</h3>
                <p className="text-sm text-amber-700 mt-2 font-medium">మెరిట్ ఆధారంగా 50% వరకు స్కాలర్‌షిప్ లభించే అవకాశం ఉంది. ఇప్పుడే దరఖాస్తు చేసుకోండి!</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
