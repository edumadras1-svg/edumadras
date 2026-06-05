"use client";

import React from "react";
import { ShieldOff, Mail } from "lucide-react";

export default function PartnerSuspendedScreen() {
  return (
    <div className="min-h-screen bg-surface-low flex items-center justify-center p-4 animate-fade-in">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-red-100">
          <ShieldOff className="w-9 h-9 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-navy mb-3">Account Suspended</h1>
        <p className="text-sm text-text-secondary max-w-sm mx-auto mb-8">
          Your partner account has been suspended. Please contact the EduMadras team for more information.
        </p>

        <a
          href="mailto:support@edumadras.com"
          className="inline-flex items-center gap-2 px-6 py-3 bg-navy hover:bg-navy/90 text-white font-semibold rounded-xl transition-all btn-press shadow-lg shadow-navy/20"
        >
          <Mail className="w-4 h-4" />
          Contact Support
        </a>
      </div>
    </div>
  );
}
