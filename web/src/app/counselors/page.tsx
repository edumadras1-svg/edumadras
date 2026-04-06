"use client";

import { TopNavBar } from "@/components/TopNavBar";
import { StreamPills } from "@/components/StreamPills";
import { useState } from "react";
import {
  Phone,
  MessageCircle,
  Star,
  Award,
  Users,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const counselors = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    role: "Senior Counselor — Engineering",
    experience: "12+ years",
    studentsGuided: "5,000+",
    rating: 4.9,
    specialty: "Engineering",
    isActive: true,
    bio: "Former IIT admissions committee member with expertise in JEE counseling",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Lead Counselor — Medical",
    experience: "8+ years",
    studentsGuided: "3,500+",
    rating: 4.8,
    specialty: "Medical",
    isActive: true,
    bio: "AIIMS graduate helping students navigate NEET counseling process",
  },
  {
    id: 3,
    name: "Anita Desai",
    role: "Counselor — Management",
    experience: "6+ years",
    studentsGuided: "2,200+",
    rating: 4.7,
    specialty: "Management",
    isActive: false,
    bio: "IIM alumna specializing in MBA admission strategies and CAT preparation",
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Senior Counselor — Law",
    experience: "10+ years",
    studentsGuided: "4,000+",
    rating: 4.9,
    specialty: "Law",
    isActive: true,
    bio: "NLS Bangalore alumnus with deep knowledge of CLAT counseling",
  },
];

export default function CounselorsPage() {
  const [activeStream, setActiveStream] = useState("all");

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <TopNavBar />

      {/* CTA Hero Banner */}
      <section className="gradient-hero overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal/10 rounded-full -ml-24 -mb-24 blur-3xl" />

        <div className="container-mobile relative z-10 py-10 md:py-14 text-center">
          <span className="text-badge text-teal-light tracking-widest">EXPERT GUIDANCE</span>
          <h1 className="text-h1 text-white mt-3 max-w-md mx-auto">
            Free Expert Admission Counseling
          </h1>
          <p className="text-body-sm text-white/60 mt-3 max-w-sm mx-auto">
            Our counselors are former admissions officers and education experts. Get guidance for free.
          </p>

          <button className="mt-6 h-12 px-7 bg-teal hover:bg-teal/90 text-white font-semibold rounded-xl transition-colors btn-press inline-flex items-center gap-2 shadow-lg">
            Get Matched <ArrowRight className="w-4 h-4" />
          </button>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
            <div className="flex items-center gap-1.5 text-white/70">
              <ShieldCheck className="w-4 h-4 text-teal-light" />
              <span className="text-caption font-medium">Verified Experts</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/70">
              <Users className="w-4 h-4 text-teal-light" />
              <span className="text-caption font-medium">500+ Counseled</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/70">
              <Award className="w-4 h-4 text-teal-light" />
              <span className="text-caption font-medium">100% Free</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stream Filter */}
      <div className="sticky top-14 z-30 bg-white shadow-nav">
        <div className="container-mobile py-3">
          <StreamPills activeStream={activeStream} onSelect={setActiveStream} />
        </div>
      </div>

      {/* Counselor Cards */}
      <main className="container-mobile py-6 pb-24 flex-1">
        <p className="text-label text-text-secondary mb-4">
          {counselors.length} counselors available
        </p>

        <div className="space-y-4 max-w-2xl">
          {counselors.map((c) => {
            const initials = c.name.split(" ").map((n) => n[0]).join("");
            return (
              <div
                key={c.id}
                className="bg-surface-card rounded-[14px] shadow-card p-5 animate-fade-in"
              >
                <div className="flex gap-4">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div className="w-14 h-14 bg-stream-engineering rounded-full flex items-center justify-center text-lg font-bold text-navy">
                      {initials}
                    </div>
                    {c.isActive && (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-body-sm font-semibold text-text-primary">{c.name}</h3>
                        <p className="text-caption text-text-secondary mt-0.5">{c.role}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-50 text-amber-600 text-badge px-2 py-1 rounded-full shrink-0">
                        <Star className="w-3 h-3 fill-amber-500" />
                        {c.rating}
                      </div>
                    </div>

                    {/* Availability */}
                    <div className="mt-2">
                      {c.isActive ? (
                        <span className="text-badge text-green-600 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                          Available Now
                        </span>
                      ) : (
                        <span className="text-badge text-text-tertiary">Busy — Try later</span>
                      )}
                    </div>

                    {/* Bio */}
                    <p className="text-caption text-text-secondary mt-2 line-clamp-2">{c.bio}</p>

                    {/* Stats */}
                    <div className="flex gap-4 mt-3">
                      <div className="bg-surface-low rounded-lg px-3 py-1.5">
                        <p className="text-badge text-text-tertiary">EXPERIENCE</p>
                        <p className="text-label font-semibold text-text-primary">{c.experience}</p>
                      </div>
                      <div className="bg-surface-low rounded-lg px-3 py-1.5">
                        <p className="text-badge text-text-tertiary">GUIDED</p>
                        <p className="text-label font-semibold text-text-primary">{c.studentsGuided}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2.5 mt-4">
                      <button
                        className="h-10 px-4 bg-teal hover:bg-teal/90 text-white text-label font-semibold rounded-[10px] transition-colors btn-press flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                        disabled={!c.isActive}
                      >
                        <Phone className="w-4 h-4" /> Call Now
                      </button>
                      <button
                        className="h-10 px-4 text-green-600 text-label font-semibold rounded-[10px] transition-colors btn-press flex items-center gap-2 hover:bg-green-50"
                        style={{ border: "1.5px solid #16a34a" }}
                      >
                        <MessageCircle className="w-4 h-4" /> WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Stats */}
        <div className="grid grid-cols-3 gap-3 mt-8 max-w-2xl">
          {[
            { value: "500+", label: "Students Counseled" },
            { value: "100%", label: "Free Service" },
            { value: "4.8★", label: "Average Rating" },
          ].map((stat) => (
            <div key={stat.label} className="bg-surface-card rounded-[12px] shadow-card p-4 text-center">
              <p className="text-h3 text-navy font-bold">{stat.value}</p>
              <p className="text-caption text-text-secondary mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
