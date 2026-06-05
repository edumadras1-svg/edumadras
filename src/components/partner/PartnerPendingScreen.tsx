"use client";

import React from "react";
import { Clock, CheckCircle, Mail } from "lucide-react";

export default function PartnerPendingScreen({ partnerName }: { partnerName?: string }) {
  return (
    <div className="min-h-screen bg-surface-low flex items-center justify-center p-4 animate-fade-in">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-lg w-full text-center">
        {/* Animated icon */}
        <div className="relative mx-auto w-24 h-24 mb-8">
          <div className="absolute inset-0 bg-amber-100 rounded-full animate-ping opacity-20" />
          <div className="relative w-24 h-24 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full flex items-center justify-center border-2 border-amber-200">
            <Clock className="w-10 h-10 text-amber-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-navy mb-3">
          Welcome{partnerName ? `, ${partnerName}` : ""}! 🎉
        </h1>
        <p className="text-lg text-text-secondary font-medium mb-2">
          Your application is under review
        </p>
        <p className="text-sm text-text-tertiary max-w-md mx-auto mb-8">
          Our team is reviewing your partner application. You'll receive an email once your account has been approved. This usually takes 24-48 hours.
        </p>

        {/* Status steps */}
        <div className="bg-white rounded-2xl shadow-sm border border-border-ghost p-6 text-left space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-navy">Application Submitted</p>
              <p className="text-xs text-text-tertiary">Your details have been received</p>
            </div>
          </div>

          <div className="ml-4 w-[1px] h-4 bg-border-ghost" />

          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 animate-pulse">
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-navy">Under Review</p>
              <p className="text-xs text-text-tertiary">Admin is verifying your details</p>
            </div>
          </div>

          <div className="ml-4 w-[1px] h-4 bg-border-ghost" />

          <div className="flex items-center gap-4 opacity-40">
            <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 text-text-tertiary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-navy">Approval Notification</p>
              <p className="text-xs text-text-tertiary">You'll get an email once approved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
