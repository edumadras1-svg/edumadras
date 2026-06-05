"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Loader2,
  Handshake,
  GraduationCap,
  Wallet,
  Banknote,
  ShieldCheck,
  ShieldOff,
  CheckCircle,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  Plus,
  IndianRupee,
  X,
  BookOpen,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

const admStatusColors: Record<string, string> = {
  pending: "bg-amber-50 text-amber-600",
  verified: "bg-blue-50 text-blue-600",
  admitted: "bg-green-50 text-green-600",
  rejected: "bg-red-50 text-red-600",
};

const commStatusColors: Record<string, string> = {
  pending: "bg-amber-50 text-amber-600",
  approved: "bg-blue-50 text-blue-600",
  paid: "bg-green-50 text-green-600",
};

export default function AdminPartnerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const partnerId = params.id as string;

  const [partner, setPartner] = useState<any>(null);
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [commissions, setCommissions] = useState<any[]>([]);
  const [payouts, setPayouts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"admissions" | "commissions" | "payouts">("admissions");

  // Add Admission Modal
  const [showAddAdmission, setShowAddAdmission] = useState(false);
  const [admForm, setAdmForm] = useState({ student_name: "", student_phone: "", student_email: "", course: "", commission_amount: "5000" });
  const [admFormLoading, setAdmFormLoading] = useState(false);

  // Add to Wallet Modal
  const [showAddWallet, setShowAddWallet] = useState(false);
  const [walletForm, setWalletForm] = useState({ amount: "", note: "" });
  const [walletFormLoading, setWalletFormLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [partnerId]);

  const fetchData = async () => {
    const { data: partnerData } = await supabase
      .from("partners")
      .select("*")
      .eq("id", partnerId)
      .single();

    if (!partnerData) {
      router.push("/admin/partners");
      return;
    }

    setPartner(partnerData);

    const { data: admData } = await supabase
      .from("partner_admissions")
      .select("*, colleges(name)")
      .eq("partner_id", partnerId)
      .order("created_at", { ascending: false });

    setAdmissions(admData || []);

    const { data: commData } = await supabase
      .from("partner_commissions")
      .select("*, partner_admissions(student_name, course)")
      .eq("partner_id", partnerId)
      .order("created_at", { ascending: false });

    setCommissions(commData || []);

    const { data: payoutData } = await supabase
      .from("partner_payouts")
      .select("*")
      .eq("partner_id", partnerId)
      .order("created_at", { ascending: false });

    setPayouts(payoutData || []);
    setIsLoading(false);
  };

  const handleStatusChange = async (newStatus: string) => {
    setActionLoading(true);
    const updates: any = { status: newStatus };
    if (newStatus === "active" && !partner.approved_at) {
      updates.approved_at = new Date().toISOString();
    }
    await supabase.from("partners").update(updates).eq("id", partnerId);
    setActionLoading(false);
    fetchData();
  };

  const handleAdmissionStatusChange = async (admissionId: string, newStatus: string) => {
    await supabase
      .from("partner_admissions")
      .update({
        status: newStatus,
        verified_at: newStatus === "verified" ? new Date().toISOString() : undefined,
      })
      .eq("id", admissionId);

    // If admitted, create a commission entry
    if (newStatus === "admitted") {
      const admission = admissions.find((a) => a.id === admissionId);
      if (admission) {
        await supabase.from("partner_commissions").insert({
          partner_id: partnerId,
          admission_id: admissionId,
          amount: admission.commission_amount || partner?.commission_rate || 2000,
          status: "pending",
        });

        // Update partner total_earned
        const newTotal = (partner?.total_earned || 0) + (admission.commission_amount || partner?.commission_rate || 2000);
        await supabase.from("partners").update({ total_earned: newTotal }).eq("id", partnerId);
      }
    }

    fetchData();
  };

  const handlePayoutStatusChange = async (payoutId: string, newStatus: string) => {
    const updates: any = { status: newStatus };
    if (newStatus === "completed") {
      updates.processed_at = new Date().toISOString();

      // Update partner total_paid
      const payout = payouts.find((p) => p.id === payoutId);
      if (payout) {
        const newPaid = (partner?.total_paid || 0) + payout.amount;
        await supabase.from("partners").update({ total_paid: newPaid }).eq("id", partnerId);
      }
    }
    await supabase.from("partner_payouts").update(updates).eq("id", payoutId);
    fetchData();
  };

  // Add admission manually
  const handleAddAdmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdmFormLoading(true);
    const commAmt = parseInt(admForm.commission_amount) || 5000;

    // 1. Create admission
    const { data: newAdm } = await supabase.from("partner_admissions").insert({
      partner_id: partnerId,
      student_name: admForm.student_name,
      student_phone: admForm.student_phone,
      student_email: admForm.student_email || null,
      course: admForm.course || null,
      status: "admitted",
      commission_amount: commAmt,
      verified_at: new Date().toISOString(),
    }).select().single();

    if (newAdm) {
      // 2. Create commission (wallet credit)
      await supabase.from("partner_commissions").insert({
        partner_id: partnerId,
        admission_id: newAdm.id,
        amount: commAmt,
        status: "pending",
      });

      // 3. Update partner total_earned
      await supabase.from("partners").update({
        total_earned: (partner?.total_earned || 0) + commAmt,
      }).eq("id", partnerId);
    }

    setShowAddAdmission(false);
    setAdmForm({ student_name: "", student_phone: "", student_email: "", course: "", commission_amount: "5000" });
    setAdmFormLoading(false);
    fetchData();
  };

  // Add money to wallet manually
  const handleAddToWallet = async (e: React.FormEvent) => {
    e.preventDefault();
    setWalletFormLoading(true);
    const amount = parseInt(walletForm.amount) || 0;
    if (amount <= 0) { setWalletFormLoading(false); return; }

    // 1. Create commission entry (no admission link)
    await supabase.from("partner_commissions").insert({
      partner_id: partnerId,
      admission_id: null,
      amount: amount,
      status: "pending",
    });

    // 2. Update partner total_earned
    await supabase.from("partners").update({
      total_earned: (partner?.total_earned || 0) + amount,
    }).eq("id", partnerId);

    setShowAddWallet(false);
    setWalletForm({ amount: "", note: "" });
    setWalletFormLoading(false);
    fetchData();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-teal" />
      </div>
    );
  }

  if (!partner) return null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back + Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/partners"
          className="p-2 hover:bg-surface rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-text-secondary" />
        </Link>
        <div className="flex-1">
          <h1 className="text-[28px] font-bold text-navy tracking-tight">{partner.name}</h1>
          <p className="text-text-secondary text-body-sm font-medium">{partner.partner_id} · {partner.email}</p>
        </div>
        <div className="flex items-center gap-2">
          {partner.status === "pending" && (
            <button
              onClick={() => handleStatusChange("active")}
              disabled={actionLoading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-sm transition-all btn-press"
            >
              <ShieldCheck className="w-4 h-4" />
              Approve Partner
            </button>
          )}
          {partner.status === "active" && (
            <button
              onClick={() => handleStatusChange("suspended")}
              disabled={actionLoading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition-all btn-press"
            >
              <ShieldOff className="w-4 h-4" />
              Suspend
            </button>
          )}
          {partner.status === "suspended" && (
            <button
              onClick={() => handleStatusChange("active")}
              disabled={actionLoading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all btn-press"
            >
              <CheckCircle className="w-4 h-4" />
              Reactivate
            </button>
          )}
        </div>
      </div>

      {/* Partner Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-border-ghost p-6">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-2xl bg-teal/10 text-teal flex items-center justify-center font-bold text-xl uppercase">
              {partner.name?.[0]}
            </div>
            <div>
              <p className="font-bold text-navy">{partner.name}</p>
              <span className={`text-badge font-bold px-2 py-0.5 rounded-full capitalize ${
                partner.status === "active" ? "bg-green-50 text-green-600" :
                partner.status === "pending" ? "bg-amber-50 text-amber-600" :
                "bg-red-50 text-red-600"
              }`}>
                {partner.status}
              </span>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-text-secondary">
              <Mail className="w-4 h-4 text-text-tertiary" />
              {partner.email}
            </div>
            <div className="flex items-center gap-3 text-text-secondary">
              <Phone className="w-4 h-4 text-text-tertiary" />
              {partner.phone || "—"}
            </div>
            <div className="flex items-center gap-3 text-text-secondary">
              <MapPin className="w-4 h-4 text-text-tertiary" />
              {partner.city || "—"}
            </div>
            <div className="flex items-center gap-3 text-text-secondary">
              <Building2 className="w-4 h-4 text-text-tertiary" />
              {partner.organization || "Individual"}
            </div>
            <div className="flex items-center gap-3 text-text-secondary">
              <Calendar className="w-4 h-4 text-text-tertiary" />
              Joined {new Date(partner.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </div>
          </div>
        </div>

        {/* Stats Cards + Action Buttons */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-border-ghost">
              <GraduationCap className="w-5 h-5 text-blue-600 mb-2" />
              <p className="text-h2 font-bold text-navy">{admissions.length}</p>
              <p className="text-badge text-text-tertiary uppercase tracking-wider font-bold">Referrals</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-border-ghost">
              <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
              <p className="text-h2 font-bold text-navy">
                {admissions.filter((a) => a.status === "admitted").length}
              </p>
              <p className="text-badge text-text-tertiary uppercase tracking-wider font-bold">Admitted</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-border-ghost">
              <Wallet className="w-5 h-5 text-teal mb-2" />
              <p className="text-h2 font-bold text-teal">
                ₹{(partner.total_earned || 0).toLocaleString("en-IN")}
              </p>
              <p className="text-badge text-text-tertiary uppercase tracking-wider font-bold">Earned</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-border-ghost">
              <Banknote className="w-5 h-5 text-amber-600 mb-2" />
              <p className="text-h2 font-bold text-navy">
                ₹{(partner.total_paid || 0).toLocaleString("en-IN")}
              </p>
              <p className="text-badge text-text-tertiary uppercase tracking-wider font-bold">Paid Out</p>
            </div>
          </div>

          {/* Admin Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowAddAdmission(true)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-teal hover:bg-teal/90 text-white font-bold rounded-xl text-sm transition-all btn-press shadow-lg shadow-teal/20"
            >
              <Plus className="w-4 h-4" />
              Add Admission
            </button>
            <button
              onClick={() => setShowAddWallet(true)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-navy hover:bg-navy/90 text-white font-bold rounded-xl text-sm transition-all btn-press shadow-lg shadow-navy/20"
            >
              <IndianRupee className="w-4 h-4" />
              Add to Wallet
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-border-ghost overflow-hidden">
        <div className="flex border-b border-border-ghost">
          {(["admissions", "commissions", "payouts"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-bold capitalize transition-all border-b-2 ${
                activeTab === tab
                  ? "text-teal border-teal"
                  : "text-text-tertiary border-transparent hover:text-text-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Admissions Tab */}
        {activeTab === "admissions" && (
          <div className="overflow-x-auto">
            {admissions.length === 0 ? (
              <div className="py-12 text-center text-text-tertiary text-sm">No admissions yet</div>
            ) : (
              <table className="w-full">
                <thead className="bg-surface-low/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Course</th>
                    <th className="px-6 py-3 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Commission</th>
                    <th className="px-6 py-3 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-ghost">
                  {admissions.map((adm) => (
                    <tr key={adm.id} className="hover:bg-surface/30 transition-colors">
                      <td className="px-6 py-3">
                        <p className="text-body-sm font-semibold">{adm.student_name}</p>
                        <p className="text-[11px] text-text-tertiary">{adm.student_phone}</p>
                      </td>
                      <td className="px-6 py-3 text-body-sm text-text-secondary">{adm.course || "—"}</td>
                      <td className="px-6 py-3">
                        <span className={`text-badge font-bold px-2.5 py-1 rounded-full ${admStatusColors[adm.status] || ""}`}>
                          {adm.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-body-sm font-semibold text-navy">
                        ₹{(adm.commission_amount || 0).toLocaleString("en-IN")}
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex gap-1.5">
                          {adm.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleAdmissionStatusChange(adm.id, "verified")}
                                className="px-2.5 py-1 bg-blue-50 text-blue-700 text-badge font-bold rounded-lg hover:bg-blue-100"
                              >
                                Verify
                              </button>
                              <button
                                onClick={() => handleAdmissionStatusChange(adm.id, "rejected")}
                                className="px-2.5 py-1 bg-red-50 text-red-700 text-badge font-bold rounded-lg hover:bg-red-100"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {adm.status === "verified" && (
                            <button
                              onClick={() => handleAdmissionStatusChange(adm.id, "admitted")}
                              className="px-2.5 py-1 bg-green-50 text-green-700 text-badge font-bold rounded-lg hover:bg-green-100"
                            >
                              Mark Admitted
                            </button>
                          )}
                          {(adm.status === "admitted" || adm.status === "rejected") && (
                            <span className="text-[11px] text-text-tertiary">No actions</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Commissions Tab */}
        {activeTab === "commissions" && (
          <div className="overflow-x-auto">
            {commissions.length === 0 ? (
              <div className="py-12 text-center text-text-tertiary text-sm">No commissions yet</div>
            ) : (
              <table className="w-full">
                <thead className="bg-surface-low/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-ghost">
                  {commissions.map((c) => (
                    <tr key={c.id} className="hover:bg-surface/30 transition-colors">
                      <td className="px-6 py-3 text-body-sm font-semibold">{c.partner_admissions?.student_name || "—"}</td>
                      <td className="px-6 py-3 text-body-sm font-bold text-teal">₹{(c.amount || 0).toLocaleString("en-IN")}</td>
                      <td className="px-6 py-3">
                        <span className={`text-badge font-bold px-2.5 py-1 rounded-full ${commStatusColors[c.status] || ""}`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-caption text-text-tertiary">
                        {new Date(c.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Payouts Tab */}
        {activeTab === "payouts" && (
          <div className="overflow-x-auto">
            {payouts.length === 0 ? (
              <div className="py-12 text-center text-text-tertiary text-sm">No payouts yet</div>
            ) : (
              <table className="w-full">
                <thead className="bg-surface-low/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Bank</th>
                    <th className="px-6 py-3 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Requested</th>
                    <th className="px-6 py-3 text-left text-badge text-text-tertiary font-bold uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-ghost">
                  {payouts.map((p) => (
                    <tr key={p.id} className="hover:bg-surface/30 transition-colors">
                      <td className="px-6 py-3 text-body-sm font-bold text-navy">₹{(p.amount || 0).toLocaleString("en-IN")}</td>
                      <td className="px-6 py-3">
                        <p className="text-body-sm">{p.bank_details?.bank_name || "—"}</p>
                        <p className="text-[11px] text-text-tertiary">A/C: {p.bank_details?.account_number || "—"}</p>
                      </td>
                      <td className="px-6 py-3">
                        <span className={`text-badge font-bold px-2.5 py-1 rounded-full capitalize ${
                          p.status === "requested" ? "bg-amber-50 text-amber-600" :
                          p.status === "processing" ? "bg-blue-50 text-blue-600" :
                          p.status === "completed" ? "bg-green-50 text-green-600" :
                          "bg-red-50 text-red-600"
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-caption text-text-tertiary">
                        {new Date(p.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex gap-1.5">
                          {p.status === "requested" && (
                            <>
                              <button
                                onClick={() => handlePayoutStatusChange(p.id, "processing")}
                                className="px-2.5 py-1 bg-blue-50 text-blue-700 text-badge font-bold rounded-lg hover:bg-blue-100"
                              >
                                Process
                              </button>
                              <button
                                onClick={() => handlePayoutStatusChange(p.id, "rejected")}
                                className="px-2.5 py-1 bg-red-50 text-red-700 text-badge font-bold rounded-lg hover:bg-red-100"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {p.status === "processing" && (
                            <button
                              onClick={() => handlePayoutStatusChange(p.id, "completed")}
                              className="px-2.5 py-1 bg-green-50 text-green-700 text-badge font-bold rounded-lg hover:bg-green-100"
                            >
                              Mark Paid
                            </button>
                          )}
                          {(p.status === "completed" || p.status === "rejected") && (
                            <span className="text-[11px] text-text-tertiary">—</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* Add Admission Modal */}
      {showAddAdmission && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-slide-up">
            <div className="px-6 py-5 border-b border-border-ghost flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-teal/10">
                  <GraduationCap className="w-5 h-5 text-teal" />
                </div>
                <h3 className="text-lg font-bold text-navy">Add Admission</h3>
              </div>
              <button onClick={() => setShowAddAdmission(false)} className="p-2 hover:bg-surface rounded-lg transition-colors">
                <X className="w-5 h-5 text-text-tertiary" />
              </button>
            </div>
            <form onSubmit={handleAddAdmission} className="p-6 space-y-4">
              <p className="text-xs text-text-tertiary bg-surface-low p-3 rounded-xl border border-border-ghost">
                This will create an <strong>admitted</strong> record and automatically credit the commission to the partner&apos;s wallet.
              </p>
              <div>
                <label className="block text-sm font-bold text-navy mb-2">Student Name *</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                  <input type="text" required value={admForm.student_name} onChange={(e) => setAdmForm({...admForm, student_name: e.target.value})}
                    className="w-full pl-11 pr-4 py-2.5 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                    placeholder="Student's full name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                    <input type="tel" value={admForm.student_phone} onChange={(e) => setAdmForm({...admForm, student_phone: e.target.value})}
                      className="w-full pl-11 pr-4 py-2.5 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                      placeholder="9876543210" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                    <input type="email" value={admForm.student_email} onChange={(e) => setAdmForm({...admForm, student_email: e.target.value})}
                      className="w-full pl-11 pr-4 py-2.5 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                      placeholder="student@email.com" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-navy mb-2">Course / Program</label>
                <div className="relative">
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                  <input type="text" value={admForm.course} onChange={(e) => setAdmForm({...admForm, course: e.target.value})}
                    className="w-full pl-11 pr-4 py-2.5 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                    placeholder="B.Tech CSE, MBBS, etc." />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-navy mb-2">Commission Amount (₹)</label>
                <div className="relative">
                  <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                  <input type="number" required value={admForm.commission_amount} onChange={(e) => setAdmForm({...admForm, commission_amount: e.target.value})}
                    className="w-full pl-11 pr-4 py-2.5 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                    placeholder="5000" min="0" />
                </div>
                <div className="flex gap-2 mt-2">
                  {[5000, 7500, 10000].map((amt) => (
                    <button key={amt} type="button" onClick={() => setAdmForm({...admForm, commission_amount: String(amt)})}
                      className={`px-3 py-1 rounded-lg text-badge font-bold transition-all ${
                        admForm.commission_amount === String(amt) ? "bg-teal text-white" : "bg-surface text-text-secondary hover:bg-surface-container"
                      }`}>
                      ₹{amt.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAddAdmission(false)}
                  className="flex-1 py-2.5 bg-surface hover:bg-surface-container text-text-secondary font-bold rounded-xl transition-all text-sm">Cancel</button>
                <button type="submit" disabled={admFormLoading}
                  className="flex-1 py-2.5 bg-teal hover:bg-teal/90 text-white font-bold rounded-xl transition-all btn-press shadow-lg shadow-teal/20 text-sm flex items-center justify-center gap-2">
                  {admFormLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Plus className="w-4 h-4" /> Add Admission</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add to Wallet Modal */}
      {showAddWallet && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-slide-up">
            <div className="px-6 py-5 border-b border-border-ghost flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-navy/10">
                  <Wallet className="w-5 h-5 text-navy" />
                </div>
                <h3 className="text-lg font-bold text-navy">Add to Wallet</h3>
              </div>
              <button onClick={() => setShowAddWallet(false)} className="p-2 hover:bg-surface rounded-lg transition-colors">
                <X className="w-5 h-5 text-text-tertiary" />
              </button>
            </div>
            <form onSubmit={handleAddToWallet} className="p-6 space-y-4">
              <p className="text-xs text-text-tertiary bg-surface-low p-3 rounded-xl border border-border-ghost">
                Manually credit money to <strong>{partner?.name}&apos;s</strong> wallet. This creates a commission entry without an admission.
              </p>

              <div className="bg-surface-low rounded-xl p-4 border border-border-ghost">
                <p className="text-[10px] uppercase tracking-widest text-text-tertiary font-bold mb-1">Current Wallet</p>
                <p className="text-2xl font-bold text-navy">₹{(partner?.total_earned - partner?.total_paid || 0).toLocaleString("en-IN")}</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-navy mb-2">Amount to Add (₹) *</label>
                <div className="relative">
                  <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                  <input type="number" required value={walletForm.amount} onChange={(e) => setWalletForm({...walletForm, amount: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 bg-surface-low rounded-xl border border-border-ghost text-lg font-bold focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                    placeholder="5000" min="1" />
                </div>
                <div className="flex gap-2 mt-2">
                  {[5000, 7500, 10000, 15000, 25000].map((amt) => (
                    <button key={amt} type="button" onClick={() => setWalletForm({...walletForm, amount: String(amt)})}
                      className={`px-2.5 py-1 rounded-lg text-badge font-bold transition-all ${
                        walletForm.amount === String(amt) ? "bg-navy text-white" : "bg-surface text-text-secondary hover:bg-surface-container"
                      }`}>
                      ₹{(amt/1000).toFixed(0)}K
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-navy mb-2">Note (optional)</label>
                <input type="text" value={walletForm.note} onChange={(e) => setWalletForm({...walletForm, note: e.target.value})}
                  className="w-full px-4 py-2.5 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                  placeholder="Bonus, adjustment, etc." />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAddWallet(false)}
                  className="flex-1 py-2.5 bg-surface hover:bg-surface-container text-text-secondary font-bold rounded-xl transition-all text-sm">Cancel</button>
                <button type="submit" disabled={walletFormLoading}
                  className="flex-1 py-2.5 bg-navy hover:bg-navy/90 text-white font-bold rounded-xl transition-all btn-press shadow-lg shadow-navy/20 text-sm flex items-center justify-center gap-2">
                  {walletFormLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><IndianRupee className="w-4 h-4" /> Credit Wallet</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
