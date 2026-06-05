"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import {
  Loader2,
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Building2,
  Handshake,
  CheckCircle,
  ArrowRight,
  Star,
  TrendingUp,
  Users,
  FileText,
  X,
} from "lucide-react";
import Link from "next/link";

export default function PartnerRegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    organization: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [partnerId, setPartnerId] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      // 1. Generate partner ID
      const { data: existingPartners } = await supabase
        .from("partners")
        .select("partner_id")
        .order("created_at", { ascending: false })
        .limit(1);

      let nextNum = 1;
      if (existingPartners && existingPartners.length > 0) {
        const lastId = existingPartners[0].partner_id;
        const num = parseInt(lastId.replace("EM-P", ""), 10);
        nextNum = num + 1;
      }

      const newPartnerId = `EM-P${String(nextNum).padStart(3, "0")}`;
      const referralCode = `PARTNER-${newPartnerId}`;

      // 2. Create Supabase auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.name,
            phone: form.phone,
            city: form.city,
          },
        },
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (!authData.user) {
        setError("Failed to create account. Please try again.");
        setLoading(false);
        return;
      }

      // 3. Insert partner record
      const { error: partnerError } = await supabase.from("partners").insert({
        user_id: authData.user.id,
        partner_id: newPartnerId,
        name: form.name,
        email: form.email,
        phone: form.phone,
        city: form.city,
        organization: form.organization || null,
        referral_code: referralCode,
        status: "pending",
      });

      if (partnerError) {
        setError(partnerError.message);
        setLoading(false);
        return;
      }

      setPartnerId(newPartnerId);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-surface-low flex items-center justify-center p-4 animate-fade-in">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-200">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-navy mb-2">Application Submitted! 🎉</h1>
          <p className="text-text-secondary mb-6">Your Partner ID has been generated</p>

          <div className="bg-white rounded-2xl shadow-lg border border-border-ghost p-6 mb-6">
            <p className="text-xs uppercase tracking-widest text-text-tertiary font-bold mb-2">Your Partner ID</p>
            <p className="text-3xl font-bold text-teal">{partnerId}</p>
            <p className="text-xs text-text-tertiary mt-3">
              Your referral code: <span className="font-mono font-semibold text-navy">PARTNER-{partnerId}</span>
            </p>
          </div>

          <p className="text-sm text-text-secondary mb-6">
            Our team will review your application and approve it within 24-48 hours.
            You'll receive an email once approved.
          </p>

          <Link
            href="/partner"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal hover:bg-teal/90 text-white font-bold rounded-xl transition-all btn-press shadow-lg shadow-teal/20"
          >
            Go to Partner Portal
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-low">
      {/* Decorative background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-teal/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-navy/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left: Benefits */}
          <div className="lg:sticky lg:top-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal to-teal/80 flex items-center justify-center shadow-lg">
                <Handshake className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-navy">EduMadras Partner Program</h1>
                <p className="text-sm text-text-secondary font-medium">Earn by referring students</p>
              </div>
            </div>

            <p className="text-text-secondary mb-8 text-body-sm">
              Join our network of education consultants, agents, and influencers.
              Refer students to top colleges and earn commissions on every successful admission.
            </p>

            {/* Benefits cards */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-border-ghost shadow-sm flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-teal/10">
                  <TrendingUp className="w-5 h-5 text-teal" />
                </div>
                <div>
                  <h3 className="font-bold text-navy text-sm mb-1">₹5,000 per Admission</h3>
                  <p className="text-xs text-text-secondary">Earn a fixed commission for every student you successfully refer</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-border-ghost shadow-sm flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-blue-50">
                  <Star className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-navy text-sm mb-1">Dedicated Dashboard</h3>
                  <p className="text-xs text-text-secondary">Track your referrals, commissions, and payouts in real-time</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-border-ghost shadow-sm flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-amber-50">
                  <Users className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-navy text-sm mb-1">500+ Colleges Network</h3>
                  <p className="text-xs text-text-secondary">Access to engineering, medical, management, and more colleges</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Registration Form */}
          <div className="bg-white rounded-3xl shadow-xl border border-border-ghost overflow-hidden">
            <div className="px-8 py-6 bg-gradient-to-r from-navy to-navy/90 text-white">
              <h2 className="text-lg font-bold">Apply to Become a Partner</h2>
              <p className="text-white/70 text-sm mt-1">Fill in your details to get started</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
                  {error}
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-navy mb-2">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-navy mb-2">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                    placeholder="partner@example.com"
                  />
                </div>
              </div>

              {/* Phone + City */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Phone *</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                      placeholder="9876543210"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">City *</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                      placeholder="Chennai"
                    />
                  </div>
                </div>
              </div>

              {/* Organization */}
              <div>
                <label className="block text-sm font-bold text-navy mb-2">
                  Organization <span className="text-text-tertiary font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                  <input
                    type="text"
                    name="organization"
                    value={form.organization}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                    placeholder="Agency / School name"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Confirm *</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              {/* Terms & Conditions Checkbox */}
              <div className="flex items-start gap-3 mt-2 p-4 bg-surface-low rounded-xl border border-border-ghost">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-2 border-border-ghost text-teal focus:ring-teal/20 cursor-pointer accent-teal"
                />
                <label htmlFor="terms" className="text-xs text-text-secondary leading-relaxed cursor-pointer">
                  I have read and agree to the{" "}
                  <button
                    type="button"
                    onClick={() => setShowTerms(true)}
                    className="text-teal font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <FileText className="w-3 h-3" />
                    Partner Program Terms & Conditions
                  </button>
                  , including commission structure, payment terms, and partner obligations.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !agreedToTerms}
                className="w-full py-3.5 bg-teal hover:bg-teal/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-teal/20 flex items-center justify-center gap-2 btn-press disabled:opacity-70 mt-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Submit Application
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-text-tertiary pt-2">
                Already a partner?{" "}
                <Link href="/partner" className="text-teal font-semibold hover:underline">
                  Sign in here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      {/* Terms & Conditions Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="px-6 py-5 border-b border-border-ghost flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-teal/10">
                  <FileText className="w-5 h-5 text-teal" />
                </div>
                <h3 className="text-lg font-bold text-navy">Partner Program Terms & Conditions</h3>
              </div>
              <button
                onClick={() => setShowTerms(false)}
                className="p-2 hover:bg-surface rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-text-tertiary" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-6 space-y-6 text-sm text-text-secondary leading-relaxed">
              {/* Intro */}
              <div>
                <p className="text-xs text-text-tertiary mb-4">EduMadras Education Consultancy — Chennai, Tamil Nadu &nbsp;|&nbsp; Academic Season 2025–26</p>
                <p>
                  By registering as an EduMadras Admission Partner, you acknowledge that you have read,
                  understood, and agree to be bound by the following Terms &amp; Conditions. This is a
                  commission-only partnership — your earnings are directly tied to your performance.
                </p>
              </div>

              {/* Commission Structure */}
              <div>
                <h4 className="text-sm font-bold text-navy mb-3">Commission Structure</h4>
                <div className="rounded-xl border border-border-ghost overflow-hidden">
                  <table className="w-full text-xs">
                    <thead className="bg-surface-low">
                      <tr>
                        <th className="px-4 py-2.5 text-left font-bold text-navy">Admissions Completed</th>
                        <th className="px-4 py-2.5 text-left font-bold text-navy">Commission Per Admission</th>
                        <th className="px-4 py-2.5 text-left font-bold text-navy">Tier</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-ghost">
                      <tr>
                        <td className="px-4 py-2.5">1 – 19 Admissions</td>
                        <td className="px-4 py-2.5 font-bold text-teal">₹5,000</td>
                        <td className="px-4 py-2.5"><span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold">Starter</span></td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5">20 – 34 Admissions</td>
                        <td className="px-4 py-2.5 font-bold text-teal">₹7,500</td>
                        <td className="px-4 py-2.5"><span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold">Growth</span></td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5">35+ Admissions</td>
                        <td className="px-4 py-2.5 font-bold text-teal">₹10,000</td>
                        <td className="px-4 py-2.5"><span className="px-2 py-0.5 bg-green-50 text-green-600 rounded-full text-[10px] font-bold">Elite</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-text-tertiary mt-2">
                  All commissions are exclusive of GST. Tier is calculated on cumulative admissions per academic season.
                </p>
              </div>

              {/* How Commission is Paid */}
              <div>
                <h4 className="text-sm font-bold text-navy mb-2">How Commission is Paid</h4>
                <div className="bg-surface-low rounded-xl p-4 border border-border-ghost space-y-2 text-xs">
                  <p>Once a student pays their full university fees, your commission amount for that admission is calculated and added to your <strong>EduMadras Partner Wallet within 24 hours</strong>.</p>
                  <p>Your wallet balance accumulates throughout the month. At the end of each month, the total wallet amount is processed and <strong>transferred directly to you</strong>.</p>
                </div>
              </div>

              {/* Partner Terms */}
              <div>
                <h4 className="text-sm font-bold text-navy mb-3">Partner Terms &amp; Conditions</h4>
                <ol className="list-none space-y-3">
                  <li className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-lg bg-navy/5 flex items-center justify-center text-[10px] font-bold text-navy">1</span>
                    <span>This is a <strong>commission-only partnership</strong>. No fixed salary is provided by EduMadras.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-lg bg-navy/5 flex items-center justify-center text-[10px] font-bold text-navy">2</span>
                    <span>Commission is credited to your Partner Wallet <strong>within 24 hours</strong> of the student paying full university fees.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-lg bg-navy/5 flex items-center justify-center text-[10px] font-bold text-navy">3</span>
                    <span>Wallet balance accumulates throughout the month and is <strong>transferred to the partner at month-end</strong>.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-lg bg-navy/5 flex items-center justify-center text-[10px] font-bold text-navy">4</span>
                    <span>All commissions are <strong>exclusive of GST</strong>. GST will be applicable as per Government of India norms.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-lg bg-navy/5 flex items-center justify-center text-[10px] font-bold text-navy">5</span>
                    <span>Partners must <strong>not misrepresent</strong> EduMadras, its universities, course details, or fee structures to students or parents.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-lg bg-navy/5 flex items-center justify-center text-[10px] font-bold text-navy">6</span>
                    <span>Student databases provided are strictly for use within this partnership and must <strong>not be shared with any third party</strong>.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-lg bg-navy/5 flex items-center justify-center text-[10px] font-bold text-navy">7</span>
                    <span>Partners must maintain <strong>professionalism and ethical conduct</strong> in all student and parent interactions at all times.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-lg bg-navy/5 flex items-center justify-center text-[10px] font-bold text-navy">8</span>
                    <span>All admissions must be <strong>routed exclusively through EduMadras office</strong> to qualify for commission.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-lg bg-navy/5 flex items-center justify-center text-[10px] font-bold text-navy">9</span>
                    <span>Partners are responsible for ensuring <strong>accurate student documentation</strong> is submitted for each admission.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-lg bg-navy/5 flex items-center justify-center text-[10px] font-bold text-navy">10</span>
                    <span>Commission tier is calculated on <strong>cumulative admissions</strong> within the current academic admission season.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-lg bg-navy/5 flex items-center justify-center text-[10px] font-bold text-navy">11</span>
                    <span>EduMadras reserves the right to <strong>terminate the partnership</strong> in case of misconduct, fraud, or misrepresentation.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-lg bg-navy/5 flex items-center justify-center text-[10px] font-bold text-navy">12</span>
                    <span>EduMadras and its support teams (BD, Telecalling, Digital Marketing) will assist partners but <strong>final admission closure is the partner&apos;s responsibility</strong>.</span>
                  </li>
                </ol>
              </div>

              {/* Contact */}
              <div className="bg-surface-low rounded-xl p-4 border border-border-ghost">
                <h4 className="text-xs font-bold text-navy mb-2">EduMadras — Education Consultancy</h4>
                <p className="text-xs text-text-tertiary leading-relaxed">
                  Lotus Tower, CIDCO Industrial Estate, 8th Floor, Guindy, Chennai — Tamil Nadu, India<br />
                  Website: www.edumadras.com &nbsp;|&nbsp; Coverage: All 38 Districts of Tamil Nadu
                </p>
                <p className="text-[10px] text-text-tertiary mt-3 pt-3 border-t border-border-ghost">
                  By checking the &ldquo;I agree&rdquo; checkbox and submitting your application, you confirm that you have
                  read, understood, and agree to all the terms stated above.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-border-ghost flex items-center justify-between shrink-0 bg-surface-low/30">
              <p className="text-xs text-text-tertiary">EduMadras Education Consultancy</p>
              <button
                onClick={() => {
                  setAgreedToTerms(true);
                  setShowTerms(false);
                }}
                className="px-6 py-2.5 bg-teal hover:bg-teal/90 text-white font-bold rounded-xl transition-all btn-press shadow-lg shadow-teal/20 text-sm"
              >
                I Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
