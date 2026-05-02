"use client";

import { TopNavBar } from "@/components/TopNavBar";
import { StreamPills } from "@/components/StreamPills";
import { supabase } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import {
  Phone,
  MessageCircle,
  Star,
  Award,
  Users,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { MatchingModal } from "@/components/MatchingModal";
import { ApplicationModal } from "@/components/ApplicationModal";
import { College } from "@/lib/mockData";

const counselors: any[] = [];

export default function CounselorsPage() {
  const [activeStream, setActiveStream] = useState("all");
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [isCounselModalOpen, setIsCounselModalOpen] = useState(false);
  const [selectedCounselor, setSelectedCounselor] = useState<{name: string, specialty: string} | null>(null);
  
  const [counselors, setCounselors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounselors = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("counselors").select("*").eq("is_active", true).order("created_at", { ascending: false });
      if (data) {
        setCounselors(data);
      }
      setLoading(false);
    };
    fetchCounselors();
  }, []);

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

          <button 
            onClick={() => setIsMatchModalOpen(true)}
            className="mt-6 h-12 px-7 bg-teal hover:bg-teal/90 text-white font-semibold rounded-xl transition-colors btn-press inline-flex items-center gap-2 shadow-lg"
          >
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
        <p className="text-label text-text-secondary mb-4 text-center">
          {counselors.length} counselors available
        </p>

        <div className="space-y-4 max-w-2xl mx-auto">
          {loading ? (
            <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="h-40 bg-white rounded-[14px] shadow-card animate-pulse" />
              ))}
            </div>
          ) : counselors.length > 0 ? (
            counselors.map((c) => {
              const initials = c.name.split(" ").map((n: string) => n[0]).join("")
              return (
                <div
                  key={c.id}
                  className="bg-surface-card rounded-[14px] shadow-card p-5 animate-fade-in"
                >
                  <div className="flex gap-4">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      {c.avatar_url ? (
                        <img src={c.avatar_url} alt={c.name} className="w-14 h-14 rounded-full object-cover" />
                      ) : (
                        <div className="w-14 h-14 bg-stream-engineering rounded-full flex items-center justify-center text-lg font-bold text-navy">
                          {initials}
                        </div>
                      )}
                      {c.is_active && (
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-body-sm font-semibold text-text-primary">{c.name}</h3>
                          <p className="text-caption text-text-secondary mt-0.5">{c.role || "Admission Expert"}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-amber-50 text-amber-600 text-badge px-2 py-1 rounded-full shrink-0">
                          <Star className="w-3 h-3 fill-amber-500" />
                          4.9
                        </div>
                      </div>

                      {/* Availability */}
                      <div className="mt-2">
                        {c.is_active ? (
                          <span className="text-badge text-green-600 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                            Available Now
                          </span>
                        ) : (
                          <span className="text-badge text-text-tertiary">Busy — Try later</span>
                        )}
                      </div>

                      {/* Stats (Placeholder as not in DB yet) */}
                      <div className="flex gap-4 mt-4">
                        <div className="bg-surface-low rounded-lg px-3 py-1.5">
                          <p className="text-badge text-text-tertiary">EXPERIENCE</p>
                          <p className="text-label font-semibold text-text-primary">8+ Years</p>
                        </div>
                        <div className="bg-surface-low rounded-lg px-3 py-1.5">
                          <p className="text-badge text-text-tertiary">GUIDED</p>
                          <p className="text-label font-semibold text-text-primary">2,000+</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2.5 mt-4">
                        <button
                          onClick={() => {
                            setSelectedCounselor({ name: c.name, specialty: c.role || "" });
                            setIsCounselModalOpen(true);
                          }}
                          className="h-10 px-4 bg-teal hover:bg-teal/90 text-white text-label font-semibold rounded-[10px] transition-colors btn-press flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                          disabled={!c.is_active}
                        >
                          <Phone className="w-4 h-4" /> Connect Now
                        </button>
                        <a
                          href={`https://wa.me/${c.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-10 px-4 text-green-600 text-label font-semibold rounded-[10px] transition-colors btn-press flex items-center gap-2 hover:bg-green-50"
                          style={{ border: "1.5px solid #16a34a" }}
                        >
                          <MessageCircle className="w-4 h-4" /> WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-100">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Expert Counseling Coming Soon</h3>
              <p className="text-slate-500 mt-2 max-w-sm mx-auto">
                We are currently onboarding top education experts to help you with your admission journey. Check back soon!
              </p>
              <button 
                onClick={() => setIsMatchModalOpen(true)}
                className="mt-8 h-12 px-8 bg-teal text-white font-bold rounded-xl btn-press shadow-lg shadow-teal/20"
              >
                Get Notified when Ready
              </button>
            </div>
          )}
        </div>

        {/* Trust Stats */}
        <div className="grid grid-cols-3 gap-3 mt-8 max-w-2xl mx-auto">
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
      <MatchingModal 
        isOpen={isMatchModalOpen} 
        onClose={() => setIsMatchModalOpen(false)} 
      />

      {selectedCounselor && (
        <ApplicationModal
          isOpen={isCounselModalOpen}
          onClose={() => setIsCounselModalOpen(false)}
          collegeId="" // No specific college
          collegeName={`Counseling with ${selectedCounselor.name}`}
          courses={[]} // No specific courses
          mode="counseling"
        />
      )}
    </div>
  );
}
