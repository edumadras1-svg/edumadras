"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { Settings, Save, Loader2, ToggleLeft, ToggleRight, Globe, Phone, Mail, MapPin } from "lucide-react";

interface AppSetting {
  key: string;
  value: string;
  description: string | null;
}

interface SiteConfig {
  site_name: string;
  site_tagline: string;
  contact_email: string;
  contact_phone: string;
  whatsapp_number: string;
  address: string;
  maintenance_mode: boolean;
  show_engineering: boolean;
  show_medical: boolean;
}

export default function AdminSettingsPage() {
  const [config, setConfig] = useState<SiteConfig>({
    site_name: "EduMadras",
    site_tagline: "Your Gateway to Top Colleges in Chennai",
    contact_email: "",
    contact_phone: "",
    whatsapp_number: "",
    address: "",
    maintenance_mode: false,
    show_engineering: true,
    show_medical: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const fetchSettings = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("app_settings")
      .select("*");

    if (!error && data) {
      const newConfig = { ...config };
      data.forEach((setting: AppSetting) => {
        const key = setting.key as keyof SiteConfig;
        if (key in newConfig) {
          const val = typeof setting.value === "string" ? setting.value : JSON.stringify(setting.value);
          // Handle boolean fields
          if (key === "maintenance_mode" || key === "show_engineering" || key === "show_medical") {
            (newConfig[key] as boolean) = val === "true";
          } else {
            (newConfig[key] as string) = val.replace(/^"|"$/g, "");
          }
        }
      });
      setConfig(newConfig);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setConfig((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (key: keyof SiteConfig) => {
    setConfig((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");

    const entries = Object.entries(config);
    let hasError = false;

    for (const [key, value] of entries) {
      const stringValue = typeof value === "boolean" ? String(value) : value;
      const { error } = await supabase
        .from("app_settings")
        .upsert({ key, value: stringValue, description: null }, { onConflict: "key" });

      if (error) {
        console.error(`Error saving ${key}:`, error);
        hasError = true;
      }
    }

    if (hasError) {
      setSaveMessage("Some settings failed to save. Check console.");
    } else {
      setSaveMessage("All settings saved successfully!");
    }
    setIsSaving(false);
    setTimeout(() => setSaveMessage(""), 3000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-teal" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy tracking-tight">Settings</h1>
          <p className="text-text-secondary text-caption font-medium">
            Configure global site preferences and contact information.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="h-11 px-6 bg-teal hover:bg-teal/90 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-md shadow-teal/20 btn-press disabled:opacity-70"
        >
          {isSaving ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
          ) : (
            <><Save className="w-4 h-4" /> Save Settings</>
          )}
        </button>
      </div>

      {saveMessage && (
        <div className={`px-4 py-3 rounded-xl text-sm font-bold ${saveMessage.includes("failed") ? "bg-red-50 text-red-600 border border-red-200" : "bg-emerald-50 text-emerald-600 border border-emerald-200"}`}>
          {saveMessage}
        </div>
      )}

      {/* Site Identity */}
      <div className="bg-white rounded-2xl shadow-sm border border-border-ghost overflow-hidden">
        <div className="p-6 border-b border-border-ghost bg-surface-low/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-navy/10 rounded-xl flex items-center justify-center">
              <Globe className="w-5 h-5 text-navy" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-navy">Site Identity</h2>
              <p className="text-caption text-text-secondary">Basic branding and identity settings.</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-bold text-navy mb-1.5">Site Name</label>
            <input type="text" name="site_name" value={config.site_name} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low focus:border-teal outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-bold text-navy mb-1.5">Tagline</label>
            <input type="text" name="site_tagline" value={config.site_tagline} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low focus:border-teal outline-none transition-all" />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-2xl shadow-sm border border-border-ghost overflow-hidden">
        <div className="p-6 border-b border-border-ghost bg-surface-low/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal/10 rounded-xl flex items-center justify-center">
              <Phone className="w-5 h-5 text-teal" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-navy">Contact Information</h2>
              <p className="text-caption text-text-secondary">Phone, email, and address shown across the site.</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-navy mb-1.5">
                <Mail className="w-3.5 h-3.5 inline mr-1.5 opacity-50" />Contact Email
              </label>
              <input type="email" name="contact_email" value={config.contact_email} onChange={handleChange} placeholder="info@edumadras.com" className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low focus:border-teal outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-navy mb-1.5">
                <Phone className="w-3.5 h-3.5 inline mr-1.5 opacity-50" />Contact Phone
              </label>
              <input type="text" name="contact_phone" value={config.contact_phone} onChange={handleChange} placeholder="+91 93636 99095" className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low focus:border-teal outline-none transition-all" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-navy mb-1.5">WhatsApp Number</label>
            <input type="text" name="whatsapp_number" value={config.whatsapp_number} onChange={handleChange} placeholder="+919363699095" className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low focus:border-teal outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-bold text-navy mb-1.5">
              <MapPin className="w-3.5 h-3.5 inline mr-1.5 opacity-50" />Office Address
            </label>
            <textarea name="address" value={config.address} onChange={handleChange} rows={2} placeholder="Chennai, Tamil Nadu" className="w-full px-4 py-2.5 rounded-xl border border-border-ghost bg-surface-low focus:border-teal outline-none transition-all resize-none" />
          </div>
        </div>
      </div>

      {/* Feature Toggles */}
      <div className="bg-white rounded-2xl shadow-sm border border-border-ghost overflow-hidden">
        <div className="p-6 border-b border-border-ghost bg-surface-low/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
              <Settings className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-navy">Feature Toggles</h2>
              <p className="text-caption text-text-secondary">Enable or disable major site features.</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {/* Maintenance Mode */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-border-ghost hover:bg-surface-low/50 transition-colors">
            <div>
              <p className="font-bold text-navy text-sm">Maintenance Mode</p>
              <p className="text-xs text-text-secondary mt-0.5">When enabled, the public site will show a maintenance page.</p>
            </div>
            <button onClick={() => handleToggle("maintenance_mode")} className="transition-colors">
              {config.maintenance_mode ? (
                <ToggleRight className="w-10 h-10 text-red-500" />
              ) : (
                <ToggleLeft className="w-10 h-10 text-text-tertiary" />
              )}
            </button>
          </div>

          {/* Show Engineering */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-border-ghost hover:bg-surface-low/50 transition-colors">
            <div>
              <p className="font-bold text-navy text-sm">Show Engineering Colleges</p>
              <p className="text-xs text-text-secondary mt-0.5">Toggle the Engineering colleges section on the homepage.</p>
            </div>
            <button onClick={() => handleToggle("show_engineering")} className="transition-colors">
              {config.show_engineering ? (
                <ToggleRight className="w-10 h-10 text-teal" />
              ) : (
                <ToggleLeft className="w-10 h-10 text-text-tertiary" />
              )}
            </button>
          </div>

          {/* Show Medical */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-border-ghost hover:bg-surface-low/50 transition-colors">
            <div>
              <p className="font-bold text-navy text-sm">Show Medical Colleges</p>
              <p className="text-xs text-text-secondary mt-0.5">Toggle the Medical colleges section on the homepage.</p>
            </div>
            <button onClick={() => handleToggle("show_medical")} className="transition-colors">
              {config.show_medical ? (
                <ToggleRight className="w-10 h-10 text-teal" />
              ) : (
                <ToggleLeft className="w-10 h-10 text-text-tertiary" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
