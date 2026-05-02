"use client";

import { useState } from "react";
import { MatchingModal } from "./MatchingModal";

interface CtaButtonProps {
  text: string;
  className?: string;
}

export function CtaButton({ text, className }: CtaButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={className}
      >
        {text}
      </button>
      <MatchingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
