"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export function FloatingWhatsApp() {
  const pathname = usePathname();

  // Hide WhatsApp bubble in the admin panel
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const phoneNumber = "919363699095";
  const message = encodeURIComponent("Hi, I need help finding the right college.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="fixed bottom-20 md:bottom-8 right-6 z-[100] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all hover:scale-110 hover:bg-[#20ba5a] active:scale-95"
        aria-label="Contact us on WhatsApp"
      >
        {/* Tooltip */}
        <span className="absolute right-full mr-3 whitespace-nowrap rounded-lg bg-navy px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white opacity-0 transition-opacity group-hover:opacity-100 shadow-lg">
          Talk to Expert
        </span>
        
        {/* Main Icon */}
        <MessageCircle className="h-7 w-7" />
        
        {/* Pulse effect */}
        <span className="absolute inset-0 h-full w-full animate-ping rounded-full bg-[#25D366] opacity-20" />
      </a>
    </div>
  );
}
