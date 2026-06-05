"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  GraduationCap,
  Wallet,
  TrendingUp,
  ArrowUpRight,
  Clock,
  Copy,
  Check,
  Loader2,
  ChevronRight,
  IndianRupee,
  Banknote,
  Star,
  Award,
  Target,
  Share2,
  CalendarDays,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

const timeAgo = (dateStr: string) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

const statusColors: Record<string, string> = {
  pending: "bg-amber-50 text-amber-600",
  verified: "bg-blue-50 text-blue-600",
  admitted: "bg-green-50 text-green-600",
  rejected: "bg-red-50 text-red-600",
};

// Commission tiers from the Partner Kit
const COMMISSION_TIERS = [
  { min: 1, max: 19, rate: 5000, label: "Starter", color: "amber" },
  { min: 20, max: 34, rate: 7500, label: "Growth", color: "blue" },
  { min: 35, max: Infinity, rate: 10000, label: "Elite", color: "green" },
];

const getCurrentTier = (admittedCount: number) => {
  if (admittedCount >= 35) return COMMISSION_TIERS[2];
  if (admittedCount >= 20) return COMMISSION_TIERS[1];
  return COMMISSION_TIERS[0];
};

const getNextTier = (admittedCount: number) => {
  if (admittedCount >= 35) return null;
  if (admittedCount >= 20) return COMMISSION_TIERS[2];
  return COMMISSION_TIERS[1];
};

export default function PartnerDashboard() {
  const [partner, setPartner] = useState<any>(null);
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalReferrals: 0,
    admittedCount: 0,
    pendingCount: 0,
    verifiedCount: 0,
    totalEarned: 0,
    totalPaid: 0,
    walletBalance: 0,
    pendingPayout: 0,
    thisMonthAdmissions: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    // Fetch partner
    const { data: partnerData } = await supabase
      .from("partners")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!partnerData) return;
    setPartner(partnerData);

    // Fetch recent admissions
    const { data: admissionsData, count: totalCount } = await supabase
      .from("partner_admissions")
      .select("*, colleges(name)", { count: "exact" })
      .eq("partner_id", partnerData.id)
      .order("created_at", { ascending: false })
      .limit(5);

    setAdmissions(admissionsData || []);

    // Count by status
    const { count: admittedCount } = await supabase
      .from("partner_admissions")
      .select("*", { count: "exact", head: true })
      .eq("partner_id", partnerData.id)
      .eq("status", "admitted");

    const { count: pendingCount } = await supabase
      .from("partner_admissions")
      .select("*", { count: "exact", head: true })
      .eq("partner_id", partnerData.id)
      .eq("status", "pending");

    const { count: verifiedCount } = await supabase
      .from("partner_admissions")
      .select("*", { count: "exact", head: true })
      .eq("partner_id", partnerData.id)
      .eq("status", "verified");

    // This month admissions
    const firstOfMonth = new Date();
    firstOfMonth.setDate(1);
    firstOfMonth.setHours(0, 0, 0, 0);
    const { count: thisMonthCount } = await supabase
      .from("partner_admissions")
      .select("*", { count: "exact", head: true })
      .eq("partner_id", partnerData.id)
      .gte("created_at", firstOfMonth.toISOString());

    // Get pending commissions (wallet balance)
    const { data: pendingCommissions } = await supabase
      .from("partner_commissions")
      .select("amount")
      .eq("partner_id", partnerData.id)
      .in("status", ["pending", "approved"]);

    const walletBalance = (pendingCommissions || []).reduce(
      (sum: number, c: any) => sum + (c.amount || 0),
      0
    );

    // Get pending payouts
    const { data: pendingPayouts } = await supabase
      .from("partner_payouts")
      .select("amount")
      .eq("partner_id", partnerData.id)
      .in("status", ["requested", "processing"]);

    const pendingPayoutTotal = (pendingPayouts || []).reduce(
      (sum: number, p: any) => sum + (p.amount || 0),
      0
    );

    setStats({
      totalReferrals: totalCount || 0,
      admittedCount: admittedCount || 0,
      pendingCount: pendingCount || 0,
      verifiedCount: verifiedCount || 0,
      totalEarned: partnerData.total_earned || 0,
      totalPaid: partnerData.total_paid || 0,
      walletBalance,
      pendingPayout: pendingPayoutTotal,
      thisMonthAdmissions: thisMonthCount || 0,
    });

    setIsLoading(false);
  };

  const handleCopyCode = () => {
    if (partner?.referral_code) {
      navigator.clipboard.writeText(partner.referral_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyLink = () => {
    if (partner?.referral_code) {
      const link = `${window.location.origin}/?ref=${partner.referral_code}`;
      navigator.clipboard.writeText(link);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const currentTier = getCurrentTier(stats.admittedCount);
  const nextTier = getNextTier(stats.admittedCount);
  const progressToNext = nextTier
    ? ((stats.admittedCount / nextTier.min) * 100).toFixed(0)
    : 100;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-teal" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome + Referral Code */}
      <div className="flex flex-col lg:flex-row lg:items-stretch gap-4">
        {/* Welcome Card */}
        <div className="flex-1 bg-gradient-to-br from-navy via-navy to-navy/90 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-teal/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
          <div className="relative z-10">
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">
              {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
            <h1 className="text-2xl font-bold mt-2">
              Welcome back, {partner?.name?.split(" ")[0]}! 👋
            </h1>
            <p className="text-white/60 text-sm mt-2 max-w-md">
              Here&apos;s your referral performance at a glance. Keep sharing your code to earn more commissions.
            </p>

            {/* Quick Stats Row */}
            <div className="flex items-center gap-5 mt-5">
              <div>
                <p className="text-2xl font-bold">{stats.thisMonthAdmissions}</p>
                <p className="text-white/40 text-[10px] uppercase tracking-wider font-bold">This Month</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <p className="text-2xl font-bold">{stats.totalReferrals}</p>
                <p className="text-white/40 text-[10px] uppercase tracking-wider font-bold">Total Referrals</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <p className="text-2xl font-bold">{stats.admittedCount}</p>
                <p className="text-white/40 text-[10px] uppercase tracking-wider font-bold">Admitted</p>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Code Card */}
        <div className="lg:w-72 bg-white rounded-2xl p-5 border border-border-ghost shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-text-tertiary font-bold mb-1">
              Partner ID
            </p>
            <p className="text-lg font-bold text-navy">{partner?.partner_id}</p>
          </div>

          <div className="mt-4 p-3 bg-surface-low rounded-xl border border-border-ghost">
            <p className="text-[10px] uppercase tracking-widest text-text-tertiary font-bold mb-2">
              Your Referral Code
            </p>
            <div className="flex items-center gap-2">
              <code className="text-sm font-bold font-mono text-teal flex-1 truncate">{partner?.referral_code}</code>
              <button
                onClick={handleCopyCode}
                className="p-2 hover:bg-surface rounded-lg transition-colors shrink-0"
                title="Copy code"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-text-tertiary" />}
              </button>
            </div>
          </div>

          <button
            onClick={handleCopyLink}
            className="mt-3 w-full py-2.5 bg-teal/10 hover:bg-teal/15 text-teal font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2"
          >
            {copiedLink ? (
              <><Check className="w-3.5 h-3.5" /> Link Copied!</>
            ) : (
              <><Share2 className="w-3.5 h-3.5" /> Copy Referral Link</>
            )}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Earned",
            value: `₹${stats.totalEarned.toLocaleString("en-IN")}`,
            icon: IndianRupee,
            color: "bg-teal-50 text-teal-600",
            accent: "from-teal to-teal/80",
          },
          {
            label: "Wallet Balance",
            value: `₹${stats.walletBalance.toLocaleString("en-IN")}`,
            icon: Wallet,
            color: "bg-amber-50 text-amber-600",
            accent: "from-amber-500 to-amber-600",
            sub: "Pending in wallet",
          },
          {
            label: "Total Paid",
            value: `₹${stats.totalPaid.toLocaleString("en-IN")}`,
            icon: Banknote,
            color: "bg-green-50 text-green-600",
            accent: "from-green-500 to-green-600",
          },
          {
            label: "Payout Pending",
            value: `₹${stats.pendingPayout.toLocaleString("en-IN")}`,
            icon: Clock,
            color: "bg-blue-50 text-blue-600",
            accent: "from-blue-500 to-blue-600",
            sub: "Being processed",
          },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-white p-5 rounded-2xl shadow-sm border border-border-ghost hover:shadow-md transition-all group relative overflow-hidden"
          >
            <div
              className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity`}
            />
            <div className="flex justify-between items-start">
              <div className={`p-2.5 rounded-xl ${card.color}`}>
                <card.icon className="w-5 h-5" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="mt-3">
              <p className="text-xl font-bold text-navy">{card.value}</p>
              <p className="text-badge text-text-tertiary mt-1 uppercase tracking-wider font-bold">
                {card.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Tier Progress + Admission Pipeline */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Current Tier */}
        <div className="bg-white rounded-2xl shadow-sm border border-border-ghost p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-navy flex items-center gap-2">
              <Award className="w-5 h-5 text-teal" />
              Commission Tier
            </h2>
            <span className={`text-badge font-bold px-3 py-1 rounded-full ${
              currentTier.color === "amber"
                ? "bg-amber-50 text-amber-600"
                : currentTier.color === "blue"
                ? "bg-blue-50 text-blue-600"
                : "bg-green-50 text-green-600"
            }`}>
              {currentTier.label}
            </span>
          </div>

          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-3xl font-bold text-navy">₹{currentTier.rate.toLocaleString("en-IN")}</span>
            <span className="text-sm text-text-tertiary">/ admission</span>
          </div>

          {nextTier ? (
            <div className="mt-5">
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs text-text-tertiary font-medium">
                  Progress to <strong className="text-navy">{nextTier.label}</strong> (₹{nextTier.rate.toLocaleString("en-IN")}/admission)
                </p>
                <span className="text-badge font-bold text-teal">{stats.admittedCount}/{nextTier.min}</span>
              </div>
              <div className="h-2.5 bg-surface-low rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal to-teal/70 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(Number(progressToNext), 100)}%` }}
                />
              </div>
              <p className="text-[11px] text-text-tertiary mt-2">
                {nextTier.min - stats.admittedCount} more admitted students to reach {nextTier.label} tier
              </p>
            </div>
          ) : (
            <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-100">
              <p className="text-sm text-green-700 font-semibold flex items-center gap-2">
                <Star className="w-4 h-4" />
                You&apos;re at the highest tier! 🎉
              </p>
            </div>
          )}

          {/* Tier Table */}
          <div className="mt-5 rounded-xl border border-border-ghost overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-surface-low/50">
                <tr>
                  <th className="px-3 py-2 text-left text-text-tertiary font-bold">Tier</th>
                  <th className="px-3 py-2 text-left text-text-tertiary font-bold">Admissions</th>
                  <th className="px-3 py-2 text-left text-text-tertiary font-bold">Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-ghost">
                {COMMISSION_TIERS.map((t) => (
                  <tr key={t.label} className={currentTier.label === t.label ? "bg-teal/5" : ""}>
                    <td className="px-3 py-2">
                      <span className={`font-bold ${currentTier.label === t.label ? "text-teal" : "text-text-secondary"}`}>
                        {currentTier.label === t.label && "▸ "}{t.label}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-text-secondary">
                      {t.max === Infinity ? `${t.min}+` : `${t.min}–${t.max}`}
                    </td>
                    <td className="px-3 py-2 font-bold text-navy">₹{t.rate.toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Admission Pipeline */}
        <div className="bg-white rounded-2xl shadow-sm border border-border-ghost p-6">
          <h2 className="text-base font-bold text-navy flex items-center gap-2 mb-5">
            <Target className="w-5 h-5 text-teal" />
            Admission Pipeline
          </h2>

          <div className="space-y-4">
            {[
              { label: "Pending Review", count: stats.pendingCount, color: "amber", icon: Clock },
              { label: "Verified", count: stats.verifiedCount, color: "blue", icon: Check },
              { label: "Admitted", count: stats.admittedCount, color: "green", icon: GraduationCap },
              { label: "Total Referrals", count: stats.totalReferrals, color: "navy", icon: Users },
            ].map((item) => {
              const percentage = stats.totalReferrals > 0 ? ((item.count / stats.totalReferrals) * 100).toFixed(0) : 0;
              return (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <item.icon className={`w-4 h-4 ${
                        item.color === "amber" ? "text-amber-500" :
                        item.color === "blue" ? "text-blue-500" :
                        item.color === "green" ? "text-green-500" : "text-navy"
                      }`} />
                      <span className="text-sm font-medium text-text-secondary">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-navy">{item.count}</span>
                      {item.label !== "Total Referrals" && (
                        <span className="text-[10px] text-text-tertiary">({percentage}%)</span>
                      )}
                    </div>
                  </div>
                  <div className="h-2 bg-surface-low rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        item.color === "amber" ? "bg-amber-400" :
                        item.color === "blue" ? "bg-blue-400" :
                        item.color === "green" ? "bg-green-400" : "bg-navy/30"
                      }`}
                      style={{ width: item.label === "Total Referrals" ? "100%" : `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Earning Potential */}
          <div className="mt-6 p-4 bg-gradient-to-r from-teal/5 to-blue-50/50 rounded-xl border border-teal/10">
            <p className="text-xs font-bold text-navy uppercase tracking-wider mb-1">
              Earning Potential
            </p>
            <p className="text-xs text-text-tertiary mb-3">
              If all {stats.pendingCount + stats.verifiedCount} pending referrals get admitted:
            </p>
            <p className="text-xl font-bold text-teal">
              +₹{((stats.pendingCount + stats.verifiedCount) * currentTier.rate).toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Admissions */}
      <div className="bg-white rounded-2xl shadow-sm border border-border-ghost overflow-hidden">
        <div className="px-6 py-5 border-b border-border-ghost flex items-center justify-between">
          <h2 className="text-base font-bold text-navy">Recent Referrals</h2>
          <Link
            href="/partner/admissions"
            className="text-teal font-semibold text-caption hover:underline flex items-center gap-1"
          >
            View All <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {admissions.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <GraduationCap className="w-12 h-12 text-text-tertiary/30 mx-auto mb-3" />
            <p className="text-text-secondary font-medium">No referrals yet</p>
            <p className="text-xs text-text-tertiary mt-1">
              Share your referral code to start earning commissions
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-low/50">
                <tr>
                  <th className="px-6 py-3 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Course / College</th>
                  <th className="px-6 py-3 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Commission</th>
                  <th className="px-6 py-3 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-ghost">
                {admissions.map((adm) => (
                  <tr key={adm.id} className="hover:bg-surface/30 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-teal/10 text-teal flex items-center justify-center font-bold text-xs uppercase">
                          {adm.student_name?.[0]}
                        </div>
                        <div>
                          <span className="text-body-sm font-semibold text-text-primary block">{adm.student_name}</span>
                          <span className="text-[11px] text-text-tertiary">{adm.student_phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <p className="text-body-sm text-text-primary font-medium">{adm.course || "—"}</p>
                      <p className="text-[11px] text-text-tertiary">{adm.colleges?.name || "—"}</p>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`text-badge font-bold px-2.5 py-1 rounded-full ${statusColors[adm.status] || "bg-surface text-text-tertiary"}`}>
                        {adm.status}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="text-body-sm font-bold text-navy">
                        ₹{(adm.commission_amount || 0).toLocaleString("en-IN")}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-1.5 text-text-tertiary">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-caption font-medium">{timeAgo(adm.created_at)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions + How It Works */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-border-ghost p-6">
          <h2 className="text-base font-bold text-navy mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/partner/admissions"
              className="p-4 rounded-xl border border-border-ghost hover:border-teal/30 hover:bg-teal/5 transition-all group"
            >
              <GraduationCap className="w-5 h-5 text-teal mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-bold text-navy">View Admissions</p>
              <p className="text-[11px] text-text-tertiary mt-0.5">Manage referrals</p>
            </Link>
            <Link
              href="/partner/commissions"
              className="p-4 rounded-xl border border-border-ghost hover:border-teal/30 hover:bg-teal/5 transition-all group"
            >
              <Wallet className="w-5 h-5 text-teal mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-bold text-navy">Commissions</p>
              <p className="text-[11px] text-text-tertiary mt-0.5">Track earnings</p>
            </Link>
            <Link
              href="/partner/payouts"
              className="p-4 rounded-xl border border-border-ghost hover:border-teal/30 hover:bg-teal/5 transition-all group"
            >
              <Banknote className="w-5 h-5 text-teal mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-bold text-navy">Request Payout</p>
              <p className="text-[11px] text-text-tertiary mt-0.5">Withdraw funds</p>
            </Link>
            <Link
              href="/partner/profile"
              className="p-4 rounded-xl border border-border-ghost hover:border-teal/30 hover:bg-teal/5 transition-all group"
            >
              <Users className="w-5 h-5 text-teal mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-bold text-navy">My Profile</p>
              <p className="text-[11px] text-text-tertiary mt-0.5">Edit your details</p>
            </Link>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-navy rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-teal/10 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h3 className="text-base font-bold mb-4">How It Works</h3>
            <div className="space-y-3">
              {[
                { step: "1", title: "Share Code", desc: "Give students your referral code or link" },
                { step: "2", title: "Student Enrolls", desc: "They apply with your code via EduMadras" },
                { step: "3", title: "Fees Paid", desc: "Student pays full university fees" },
                { step: "4", title: `Earn ₹${currentTier.rate.toLocaleString("en-IN")}`, desc: "Commission credited to wallet within 24 hrs" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-teal/20 flex items-center justify-center shrink-0">
                    <span className="text-teal font-bold text-xs">{item.step}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-[11px] text-white/50 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
