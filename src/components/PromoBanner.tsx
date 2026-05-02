"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { MatchingModal } from "./MatchingModal";

interface PromoBannerProps {
  banner: any;
}

export function PromoBanner({ banner }: PromoBannerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={`rounded-xl p-6 md:p-8 text-white relative overflow-hidden shadow-hover ${banner?.gradient || "bg-gradient-to-r from-navy-dark to-navy"}`}>
        {banner?.image && (
          <img 
            src={banner.image} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
          />
        )}
        <div className="absolute top-0 right-0 w-40 h-40 bg-teal/20 rounded-full -mr-10 -mt-10 blur-2xl" />
        <div className="relative z-10">
          <span className="text-badge text-teal-light tracking-widest uppercase">{banner?.subtitle || "PROMOTIONAL OFFER"}</span>
          <h2 className="text-h2 text-white mt-2">{banner?.title || "Upto 50% Scholarship for 2026"}</h2>
          <p className="text-body-sm text-white/60 mt-1">{banner?.description || banner?.subtitle || "Limited seats available. Apply through EduMadras."}</p>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-5 h-10 px-6 bg-teal hover:bg-teal/90 text-white text-sm font-semibold rounded-lg transition-colors btn-press flex items-center justify-center gap-2 w-fit"
          >
            {banner?.cta || "Check Eligibility"} <ArrowRight className="w-4 h-4" />
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
