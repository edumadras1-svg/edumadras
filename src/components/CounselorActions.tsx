"use client";

import { useState } from "react";
import { Phone, MessageCircle } from "lucide-react";
import { MatchingModal } from "./MatchingModal";

interface CounselorActionsProps {
  phone: string;
}

export function CounselorActions({ phone }: CounselorActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex gap-2 shrink-0">
      <button 
        onClick={() => setIsOpen(true)}
        className="w-10 h-10 bg-teal/10 text-teal rounded-lg flex items-center justify-center hover:bg-teal/20 transition-colors btn-press" 
        aria-label="Call"
      >
        <Phone className="w-4 h-4" />
      </button>
      <a 
        href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center hover:bg-green-100 transition-colors btn-press" 
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-4 h-4" />
      </a>
      <MatchingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
