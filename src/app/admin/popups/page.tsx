"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { X, Loader2, Plus, Edit2, Trash2, Eye, EyeOff, Bell, Sparkles, MessageCircle } from "lucide-react";

interface Alert {
  id?: string;
  title: string;
  message: string;
  type: string;
  is_active: boolean;
  image_url: string | null;
  created_at?: string;
}

export default function AdminPopupsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAlert, setEditingAlert] = useState<Alert | null>(null);
  const [formData, setFormData] = useState<Alert>({
    title: "",
    message: "",
    type: "offer",
    is_active: true,
    image_url: "",
  });

  const fetchAlerts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("alerts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setAlerts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleOpenModal = (alert?: Alert) => {
    if (alert) {
      setEditingAlert(alert);
      setFormData(alert);
    } else {
      setEditingAlert(null);
      setFormData({
        title: "",
        message: "",
        type: "offer",
        is_active: true,
        image_url: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAlert(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (editingAlert) {
      const { error } = await supabase
        .from("alerts")
        .update(formData)
        .eq("id", editingAlert.id);
      if (!error) fetchAlerts();
    } else {
      const { error } = await supabase.from("alerts").insert([formData]);
      if (!error) fetchAlerts();
    }

    setLoading(false);
    handleCloseModal();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this popup?")) {
      const { error } = await supabase.from("alerts").delete().eq("id", id);
      if (!error) fetchAlerts();
    }
  };

  const handleToggleActive = async (alert: Alert) => {
    const { error } = await supabase
      .from("alerts")
      .update({ is_active: !alert.is_active })
      .eq("id", alert.id);
    if (!error) fetchAlerts();
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy tracking-tight">Popup Management</h1>
          <p className="text-text-secondary text-caption font-medium">
            Manage promotional popups and urgent alerts for your visitors.
          </p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="h-11 px-6 bg-teal hover:bg-teal/90 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-md shadow-teal/20 btn-press shrink-0"
        >
          <Plus className="w-4 h-4" /> Create Popup
        </button>
      </div>

      {loading && alerts.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-teal" />
        </div>
      ) : (
        /* Alert Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {alerts.map((alert) => (
            <div key={alert.id} className="bg-white rounded-2xl shadow-sm border border-border-ghost overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="p-6 flex gap-6">
                {/* Preview Image */}
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-surface shrink-0 border border-border-ghost">
                  {alert.image_url ? (
                    <img src={alert.image_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-tertiary">
                      <Bell className="w-8 h-8" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      alert.type === 'offer' ? 'bg-teal/10 text-teal' : 'bg-navy/10 text-navy'
                    }`}>
                      {alert.type}
                    </span>
                    <span className="text-[10px] text-text-tertiary font-bold uppercase tracking-tight">
                      Created {new Date(alert.created_at!).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-navy truncate">{alert.title}</h3>
                  <p className="text-caption text-text-secondary line-clamp-2 mt-1">{alert.message}</p>
                </div>
              </div>

              {/* Management Bar */}
              <div className="px-6 py-4 bg-surface-low/30 border-t border-border-ghost/50 flex items-center justify-between">
                <button 
                  onClick={() => handleToggleActive(alert)}
                  className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest transition-colors ${
                    alert.is_active ? "text-green-600" : "text-text-tertiary"
                  }`}
                >
                  {alert.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  {alert.is_active ? "Live" : "Draft"}
                </button>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleOpenModal(alert)}
                    className="p-2 text-text-secondary hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(alert.id!)}
                    className="p-2 text-text-tertiary hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
            <div className="p-8 border-b border-border-ghost flex items-center justify-between bg-surface-low/30">
              <div>
                <h2 className="text-2xl font-bold text-navy">{editingAlert ? "Edit Popup" : "Create New Popup"}</h2>
                <p className="text-caption text-text-secondary font-medium">Configure how the announcement appears to users.</p>
              </div>
              <button onClick={handleCloseModal} className="p-2 hover:bg-surface rounded-full transition-colors">
                <X className="w-6 h-6 text-text-tertiary" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-2">
                <label className="text-badge font-extrabold text-text-tertiary uppercase tracking-widest">Title</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full h-12 bg-surface-low border border-border-ghost rounded-xl px-4 text-navy font-bold focus:border-teal outline-none transition-all"
                  placeholder="e.g., Year End Special!" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-badge font-extrabold text-text-tertiary uppercase tracking-widest">Message Content</label>
                <textarea 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-surface-low border border-border-ghost rounded-xl p-4 text-navy font-medium focus:border-teal outline-none transition-all resize-none h-32"
                  placeholder="Describe the offer or announcement..." 
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-badge font-extrabold text-text-tertiary uppercase tracking-widest">Popup Type</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full h-12 bg-surface-low border border-border-ghost rounded-xl px-4 text-navy font-bold focus:border-teal outline-none transition-all appearance-none"
                  >
                    <option value="offer">Special Offer</option>
                    <option value="info">Information</option>
                    <option value="warning">Urgent Alert</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-badge font-extrabold text-text-tertiary uppercase tracking-widest">Image URL</label>
                  <input 
                    type="url" 
                    value={formData.image_url || ""}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full h-12 bg-surface-low border border-border-ghost rounded-xl px-4 text-navy font-bold focus:border-teal outline-none transition-all"
                    placeholder="https://images.unsplash.com/..." 
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 p-4 bg-surface rounded-2xl border border-border-ghost">
                <div className="flex-1">
                  <p className="text-body-sm font-bold text-navy">Active Status</p>
                  <p className="text-caption text-text-secondary font-medium">If on, this popup will be visible to visitors.</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setFormData({ ...formData, is_active: !formData.is_active })}
                  className={`w-14 h-8 rounded-full relative transition-colors ${formData.is_active ? 'bg-teal' : 'bg-border-ghost'}`}
                >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${formData.is_active ? 'right-1' : 'left-1 shadow-sm'}`} />
                </button>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  className="flex-1 h-12 border border-border-ghost text-navy font-bold rounded-xl hover:bg-surface transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 h-12 bg-teal hover:bg-teal/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-teal/20 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingAlert ? "Save Changes" : "Create Popup"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
