"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TopNavBar } from "@/components/TopNavBar";
import { sendLeadEmails } from "@/lib/sendLeadEmails";
import {
  Send,
  CheckCircle2,
  Loader2,
  Phone,
  User,
  UserPlus,
  Mail,
  MapPin,
  BookOpen,
  ChevronDown,
  GraduationCap,
  Star,
  TrendingUp,
  ArrowRight,
  Shield,
  Clock,
  Users,
  Building2,
} from "lucide-react";

interface College {
  id: string;
  name: string;
  city: string;
  state: string;
  rank: number | null;
  rating: number | null;
  avg_package: number | null;
  stream: string | null;
  logo_url: string | null;
  approvals: string[] | null;
}

interface ApplyPageClientProps {
  colleges: College[];
}

const offices = [
  {
    name: "EduMadras — Kallakurichi",
    address: "No.88/17D, MRN Nagar, Kallakurichi, Tamil Nadu 606202",
    phone: "+91 88257 21496",
    email: "edumadraskallakurichi@gmail.com",
  },
];

const courses = [
  { id: "btech-cse", name: "B.Tech / B.E. Computer Science" },
  { id: "btech-ece", name: "B.Tech / B.E. ECE" },
  { id: "btech-mech", name: "B.Tech / B.E. Mechanical" },
  { id: "btech-civil", name: "B.Tech / B.E. Civil" },
  { id: "btech-ai", name: "B.Tech AI & Data Science" },
  { id: "mbbs", name: "MBBS" },
  { id: "bds", name: "BDS" },
  { id: "bpharm", name: "B.Pharm" },
  { id: "bsc", name: "B.Sc." },
  { id: "bcom", name: "B.Com" },
  { id: "ba", name: "B.A." },
  { id: "bba", name: "BBA" },
  { id: "mba", name: "MBA" },
  { id: "law", name: "LLB / BL" },
  { id: "other", name: "Other / Not Listed" },
];

const trustPoints = [
  { icon: Shield, text: "100% Free — No Hidden Charges" },
  { icon: Users, text: "10,000+ Students Guided" },
  { icon: Clock, text: "Callback Within 30 Minutes" },
  { icon: GraduationCap, text: "500+ Partner Colleges" },
];

function formatPkg(val: number | null): string {
  if (!val) return "N/A";
  if (val >= 100) return `₹${(val / 100).toFixed(1)} Cr`;
  return `₹${val} LPA`;
}

export function ApplyPageClient({ colleges }: ApplyPageClientProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    target_course: "",
    father_name: "",
    father_phone: "",
    email: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          target_course: formData.target_course,
          father_name: formData.father_name,
          father_phone: formData.father_phone,
          email: formData.email || undefined,
          city: formData.city,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Submission failed");
      setSuccess(true);
      sendLeadEmails(formData);
    } catch (err) {
      console.error("Error submitting application:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <TopNavBar />

      {/* ==================== HERO + FORM ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#002444] via-[#1B3A5C] to-[#1a7a6e] text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 relative py-16 md:py-20">
          <div className="flex flex-col lg:flex-row gap-12 items-start">

            {/* Left — Copy */}
            <div className="flex-1 max-w-xl">
              <div className="flex items-center gap-3 mb-6">
                <Image src="/icon-192.png" alt="EduMadras" width={48} height={48} className="rounded-xl" />
                <span className="text-2xl font-extrabold tracking-tight">
                  Edu<span className="text-teal-light">Madras</span>
                </span>
              </div>

              <h1 className="text-3xl md:text-[42px] font-extrabold leading-tight tracking-tight">
                Get Free Admission Counseling for 2026
              </h1>
              <p className="text-lg text-white/70 mt-4 leading-relaxed font-medium max-w-lg">
                Don't worry about which college to pick. Fill in your details and our expert counselor will call you
                within 30 minutes — completely free, no obligations.
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 mt-10">
                {trustPoints.map((tp, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/10">
                    <tp.icon className="w-5 h-5 text-teal-light shrink-0" />
                    <span className="text-sm font-semibold text-white/90">{tp.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form Card */}
            <div className="w-full lg:w-[420px] shrink-0">
              <div className="bg-white rounded-3xl shadow-2xl border-2 border-slate-100 overflow-hidden">
                <div className="bg-gradient-to-r from-teal to-emerald-400 px-6 py-5 text-center">
                  <h2 className="text-white text-lg font-bold">Apply for Free Counseling</h2>
                  <p className="text-white/60 text-xs mt-1 font-medium">2026 Admissions Open — Limited Seats</p>
                </div>

                <div className="p-6">
                  {success ? (
                    <div className="text-center py-8">
                      <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">Application Submitted!</h3>
                      <p className="text-slate-500 mt-2 text-sm">
                        Our expert counselor will contact you within 30 minutes to guide you through admissions.
                      </p>
                      <Link
                        href="/"
                        className="mt-8 h-12 w-full bg-gradient-to-r from-teal to-emerald-400 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-teal/20"
                      >
                        Explore Colleges
                      </Link>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                      {/* Name */}
                      <div className="relative group">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-teal transition-colors" />
                        <input
                          required
                          type="text"
                          placeholder="Full Name *"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full h-12 pl-11 pr-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-teal focus:bg-white focus:shadow-md focus:shadow-teal/5 transition-all text-sm text-slate-800 font-medium placeholder:text-slate-300"
                        />
                      </div>

                      {/* Phone */}
                      <div className="relative group">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-teal transition-colors" />
                        <input
                          required
                          type="tel"
                          placeholder="Phone Number *"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })}
                          inputMode="numeric"
                          pattern="[0-9]{10}"
                          maxLength={10}
                          className="w-full h-12 pl-11 pr-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-teal focus:bg-white focus:shadow-md focus:shadow-teal/5 transition-all text-sm text-slate-800 font-medium placeholder:text-slate-300"
                        />
                      </div>

                      {/* Course */}
                      <div className="relative group">
                        <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-teal transition-colors" />
                        <select
                          required
                          value={formData.target_course}
                          onChange={(e) => setFormData({ ...formData, target_course: e.target.value })}
                          className="w-full h-12 pl-11 pr-10 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-teal focus:bg-white focus:shadow-md focus:shadow-teal/5 appearance-none text-sm font-semibold text-slate-700 cursor-pointer transition-all"
                        >
                          <option value="">Select Preferred Course *</option>
                          {courses.map((c) => (
                            <option key={c.id} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                      </div>

                      {/* Father Name + Father Phone */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative group">
                          <UserPlus className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-teal transition-colors" />
                          <input
                            required
                            type="text"
                            placeholder="Father Name *"
                            value={formData.father_name}
                            onChange={(e) => setFormData({ ...formData, father_name: e.target.value })}
                            className="w-full h-12 pl-11 pr-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-teal focus:bg-white focus:shadow-md focus:shadow-teal/5 transition-all text-sm text-slate-800 font-medium placeholder:text-slate-300"
                          />
                        </div>
                        <div className="relative group">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-teal transition-colors" />
                          <input
                            required
                            type="tel"
                            placeholder="Father Phone *"
                            value={formData.father_phone}
                            onChange={(e) => setFormData({ ...formData, father_phone: e.target.value.replace(/\D/g, "") })}
                            inputMode="numeric"
                            pattern="[0-9]{10}"
                            maxLength={10}
                            className="w-full h-12 pl-11 pr-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-teal focus:bg-white focus:shadow-md focus:shadow-teal/5 transition-all text-sm text-slate-800 font-medium placeholder:text-slate-300"
                          />
                        </div>
                      </div>

                      {/* Email (optional) + City */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative group">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-teal transition-colors" />
                          <input
                            type="email"
                            placeholder="Email (Optional)"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full h-12 pl-11 pr-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-teal focus:bg-white focus:shadow-md focus:shadow-teal/5 transition-all text-sm text-slate-800 font-medium placeholder:text-slate-300"
                          />
                        </div>
                        <div className="relative group">
                          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-teal transition-colors" />
                          <input
                            required
                            type="text"
                            placeholder="City / District *"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="w-full h-12 pl-11 pr-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-teal focus:bg-white focus:shadow-md focus:shadow-teal/5 transition-all text-sm text-slate-800 font-medium placeholder:text-slate-300"
                          />
                        </div>
                      </div>

                      <button
                        disabled={loading}
                        type="submit"
                        className="w-full h-12 bg-gradient-to-r from-teal to-emerald-400 hover:from-teal/90 hover:to-emerald-400/90 text-white font-bold rounded-xl shadow-lg shadow-teal/25 flex items-center justify-center gap-2 mt-1 transition-all btn-press"
                      >
                        {loading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <Send className="w-4 h-4" /> Get Free Counseling
                          </>
                        )}
                      </button>

                      <p className="text-[10px] text-center text-slate-300 mt-2 leading-tight px-4 font-medium">
                        ✅ 100% Free · No spam · Callback within 30 minutes
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURED COLLEGES ==================== */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E293B]">
            Top Colleges You Can Apply To
          </h2>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto">
            These are some of the highest-ranked institutions in our network. Our counselors can help you get into the right one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {colleges.map((college) => (
            <Link
              key={college.id}
              href={`/colleges/${college.id}`}
              className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:border-teal/20 transition-all group block"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-white rounded-2xl border border-gray-100 flex items-center justify-center overflow-hidden shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                  {college.logo_url ? (
                    <img src={college.logo_url} alt={college.name} className="w-10 h-10 object-contain" />
                  ) : (
                    <span className="text-lg font-bold text-navy">
                      {college.name.split(" ").map((n) => n[0]).join("").slice(0, 3)}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-1.5 mb-1">
                    {college.stream && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-600 uppercase tracking-wider">
                        {college.stream}
                      </span>
                    )}
                    {college.rank && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-600 uppercase tracking-wider">
                        NIRF #{college.rank}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-[#1E293B] leading-tight group-hover:text-teal transition-colors line-clamp-2">
                    {college.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-red-400" /> {college.city}
                    </span>
                    {college.rating && (
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {college.rating}
                      </span>
                    )}
                    {college.avg_package && (
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-green-500" /> {formatPkg(college.avg_package)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/colleges"
            className="inline-flex items-center gap-2 text-sm font-bold text-teal hover:text-navy transition-colors"
          >
            View All 500+ Colleges <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ==================== OFFICE LOCATIONS ==================== */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E293B]">
              Visit Our Office
            </h2>
            <p className="text-gray-500 mt-2">
              Walk in for a free face-to-face counseling session.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {offices.map((office, i) => (
              <div
                key={i}
                className="bg-[#F8FAFC] rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-[#1E293B]">{office.name}</h3>
                </div>

                <div className="space-y-4 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                    <p>{office.address}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                    <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="hover:text-teal transition-colors font-medium">
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                    <a href={`mailto:${office.email}`} className="hover:text-teal transition-colors font-medium break-all">
                      {office.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FOOTER CTA ==================== */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        <div className="bg-gradient-to-br from-navy to-[#0F172A] rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal/10 rounded-full blur-3xl" />
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3 relative">
            Still Have Questions?
          </h2>
          <p className="text-white/60 max-w-xl mx-auto mb-6 relative">
            Call us directly or visit our office. Our counselors are available Monday to Saturday, 9 AM to 7 PM.
          </p>
          <a
            href="tel:+918825721496"
            className="inline-flex items-center gap-2 h-14 px-10 bg-teal hover:bg-teal/90 text-white font-bold rounded-2xl transition-all shadow-xl shadow-teal/20 btn-press text-base relative"
          >
            <Phone className="w-5 h-5" /> Call Now — +91 88257 21496
          </a>
        </div>
      </section>
    </div>
  );
}
