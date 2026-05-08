"use client";

import { useState } from "react";
import {
  Send,
  CheckCircle2,
  Loader2,
  Phone,
  User,
  Mail,
  MapPin,
  BookOpen,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { sendLeadEmails } from "@/lib/sendLeadEmails";

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

export function HeroLeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    target_course: "",
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
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          target_course: formData.target_course,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Submission failed");
      setSuccess(true);
      // Send emails from browser (EmailJS blocks server-side)
      sendLeadEmails(formData);
    } catch (err) {
      console.error("Error submitting:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="mt-8 w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">We&apos;ll Call You Within 30 Minutes!</h3>
        <p className="text-slate-500 text-sm mt-2">
          Our expert counselor will guide you through the best college options.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 w-full max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-2xl p-6 md:p-7 border border-slate-100"
      >
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="w-8 h-8 bg-gradient-to-br from-teal to-emerald-400 rounded-lg flex items-center justify-center shadow-md shadow-teal/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-base font-extrabold text-slate-800">Get Free Admission Counseling</h3>
        </div>

        {/* Row 1: Name + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative group">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-teal transition-colors" />
            <input
              required
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full h-12 pl-11 pr-4 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm text-slate-800 font-medium placeholder:text-slate-300 focus:outline-none focus:border-teal focus:bg-white focus:shadow-md focus:shadow-teal/5 transition-all"
            />
          </div>
          <div className="relative group">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-teal transition-colors" />
            <input
              required
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })}
              inputMode="numeric"
              pattern="[0-9]{10}"
              maxLength={10}
              className="w-full h-12 pl-11 pr-4 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm text-slate-800 font-medium placeholder:text-slate-300 focus:outline-none focus:border-teal focus:bg-white focus:shadow-md focus:shadow-teal/5 transition-all"
            />
          </div>
        </div>

        {/* Row 2: Email + City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <div className="relative group">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-teal transition-colors" />
            <input
              required
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full h-12 pl-11 pr-4 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm text-slate-800 font-medium placeholder:text-slate-300 focus:outline-none focus:border-teal focus:bg-white focus:shadow-md focus:shadow-teal/5 transition-all"
            />
          </div>
          <div className="relative group">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-teal transition-colors" />
            <input
              required
              type="text"
              placeholder="Your City / District"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full h-12 pl-11 pr-4 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm text-slate-800 font-medium placeholder:text-slate-300 focus:outline-none focus:border-teal focus:bg-white focus:shadow-md focus:shadow-teal/5 transition-all"
            />
          </div>
        </div>

        {/* Row 3: Course + Submit */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 mt-3">
          <div className="relative group">
            <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-teal transition-colors" />
            <select
              required
              value={formData.target_course}
              onChange={(e) => setFormData({ ...formData, target_course: e.target.value })}
              className="w-full h-12 pl-11 pr-10 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm text-slate-800 font-medium appearance-none cursor-pointer focus:outline-none focus:border-teal focus:bg-white focus:shadow-md focus:shadow-teal/5 transition-all"
            >
              <option value="">Select Preferred Course</option>
              {courses.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="h-12 px-8 bg-gradient-to-r from-teal to-emerald-400 hover:from-teal/90 hover:to-emerald-400/90 text-white font-bold rounded-xl shadow-lg shadow-teal/25 flex items-center justify-center gap-2 transition-all btn-press whitespace-nowrap"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" /> Get Free Counseling
              </>
            )}
          </button>
        </div>

        <p className="text-[10px] text-center text-slate-300 mt-3 font-medium">
          ✅ 100% Free · No spam · Our counselor will call you within 30 minutes
        </p>
      </form>
    </div>
  );
}
