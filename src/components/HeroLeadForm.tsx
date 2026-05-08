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
} from "lucide-react";

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
    } catch (err) {
      console.error("Error submitting:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="mt-8 w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 text-center">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="text-xl font-bold text-white">We&apos;ll Call You Within 30 Minutes!</h3>
        <p className="text-white/50 text-sm mt-2">
          Our expert counselor will guide you through the best college options.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 w-full max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-5 md:p-6"
      >
        {/* Row 1: Name + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              required
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full h-12 pl-10 pr-4 bg-white/10 border border-white/15 rounded-xl text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal/30 transition-all"
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              required
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full h-12 pl-10 pr-4 bg-white/10 border border-white/15 rounded-xl text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal/30 transition-all"
            />
          </div>
        </div>

        {/* Row 2: Email + City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              required
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full h-12 pl-10 pr-4 bg-white/10 border border-white/15 rounded-xl text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal/30 transition-all"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              required
              type="text"
              placeholder="Your City / District"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full h-12 pl-10 pr-4 bg-white/10 border border-white/15 rounded-xl text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal/30 transition-all"
            />
          </div>
        </div>

        {/* Row 3: Course + Submit */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 mt-3">
          <div className="relative">
            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <select
              required
              value={formData.target_course}
              onChange={(e) => setFormData({ ...formData, target_course: e.target.value })}
              className="w-full h-12 pl-10 pr-10 bg-white/10 border border-white/15 rounded-xl text-sm text-white appearance-none cursor-pointer focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal/30 transition-all [&>option]:text-slate-900"
            >
              <option value="">Select Preferred Course</option>
              {courses.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="h-12 px-8 bg-teal hover:bg-teal/90 text-white font-bold rounded-xl shadow-lg shadow-teal/20 flex items-center justify-center gap-2 transition-all btn-press whitespace-nowrap"
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

        <p className="text-[10px] text-center text-white/30 mt-3">
          100% Free · No spam · Our counselor will call you within 30 minutes
        </p>
      </form>
    </div>
  );
}
