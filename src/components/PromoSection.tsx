"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { MatchingModal } from "./MatchingModal";

export function PromoSection() {
  const [banner, setBanner] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBanner = async () => {
      const { data } = await supabase
        .from("banners")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (data) {
        setBanner(data);
      }
    };

    fetchBanner();
  }, []);

  if (!banner) return null;

  return (
    <>
      <div className={`col-span-full my-6 rounded-[24px] p-6 md:p-8 text-white relative overflow-hidden shadow-hover ${banner.gradient || "bg-gradient-to-r from-navy-dark to-navy"}`}>
        {banner.image && (
          <img 
            src={banner.image} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
          />
        )}
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal/10 rounded-full -ml-24 -mb-24 blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold rounded-full uppercase tracking-widest mb-4">
              <Sparkles className="w-3 h-3 text-teal-light" /> {banner.subtitle || "Exclusive Opportunity"}
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
              {banner.title}
            </h2>
            <p className="mt-2 text-white/70 text-sm md:text-base max-w-xl">
              {banner.description || banner.subtitle || "Unlock exclusive benefits and expert guidance for your academic journey."}
            </p>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="h-12 px-8 bg-white text-navy hover:bg-teal-light hover:text-white text-sm font-bold rounded-xl transition-all btn-press flex items-center justify-center gap-2 shrink-0 shadow-lg"
          >
            {banner.cta || "Apply Now"} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <MatchingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
