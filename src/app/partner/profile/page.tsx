"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Loader2,
  Save,
  Copy,
  Check,
  Handshake,
  Calendar,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default function ProfilePage() {
  const [partner, setPartner] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    organization: "",
  });

  useEffect(() => {
    fetchPartner();
  }, []);

  const fetchPartner = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("partners")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (data) {
      setPartner(data);
      setForm({
        name: data.name || "",
        phone: data.phone || "",
        city: data.city || "",
        organization: data.organization || "",
      });
    }
    setIsLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg(null);

    const { error } = await supabase
      .from("partners")
      .update({
        name: form.name,
        phone: form.phone,
        city: form.city,
        organization: form.organization,
      })
      .eq("id", partner.id);

    if (!error) {
      setSuccessMsg("Profile updated successfully!");
      setTimeout(() => setSuccessMsg(null), 3000);
    }
    setIsSaving(false);
  };

  const handleCopyCode = () => {
    if (partner?.referral_code) {
      navigator.clipboard.writeText(partner.referral_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-teal" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-[28px] font-bold text-navy tracking-tight">Profile</h1>
        <p className="text-text-secondary mt-1 text-body-sm font-medium">
          Manage your partner account details
        </p>
      </div>

      {/* Partner ID Card */}
      <div className="bg-gradient-to-br from-navy to-navy/90 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-teal/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-teal/20 flex items-center justify-center border border-white/10">
                <Handshake className="w-7 h-7 text-teal-light" />
              </div>
              <div>
                <p className="text-xs text-white/50 uppercase tracking-widest font-bold">Partner ID</p>
                <p className="text-2xl font-bold mt-0.5">{partner?.partner_id}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/50 uppercase tracking-widest font-bold">Status</p>
              <span className="inline-block mt-1 px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-badge font-bold capitalize">
                {partner?.status}
              </span>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
            <div className="flex-1">
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Referral Code</p>
              <p className="text-sm font-mono font-bold text-teal-light mt-0.5">{partner?.referral_code}</p>
            </div>
            <button
              onClick={handleCopyCode}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-white/60" />
              )}
            </button>
          </div>

          <div className="mt-4 flex gap-6 text-sm">
            <div>
              <p className="text-white/50 text-xs">Joined</p>
              <p className="font-medium flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(partner?.created_at).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-white/50 text-xs">Commission Rate</p>
              <p className="font-medium mt-0.5">
                ₹{(partner?.commission_rate || 2000).toLocaleString("en-IN")} / admission
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-border-ghost overflow-hidden">
        <div className="px-6 py-5 border-b border-border-ghost">
          <h2 className="text-lg font-bold text-navy">Personal Details</h2>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-5">
          {successMsg && (
            <div className="bg-green-50 text-green-600 p-3 rounded-xl text-sm font-medium border border-green-100 flex items-center gap-2">
              <Check className="w-4 h-4" />
              {successMsg}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-navy mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-navy mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
              <input
                type="email"
                value={partner?.email || ""}
                disabled
                className="w-full pl-12 pr-4 py-3 bg-surface-container rounded-xl border border-border-ghost text-body-sm text-text-tertiary cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-text-tertiary mt-1">Email cannot be changed</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-navy mb-2">Phone</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-navy mb-2">City</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-navy mb-2">Organization</label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
              <input
                type="text"
                value={form.organization}
                onChange={(e) => setForm({ ...form, organization: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-surface-low rounded-xl border border-border-ghost text-body-sm focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal hover:bg-teal/90 text-white font-bold rounded-xl transition-all btn-press shadow-lg shadow-teal/20 disabled:opacity-70"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
