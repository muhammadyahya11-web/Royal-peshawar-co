import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Store,
  Truck,
  CreditCard,
  Bell,
  Save,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { AdminCotext } from "./AdminCotext";
import { API_BASE } from "./config/api.js";

const defaultForm = {
  storeName: "",
  tagline: "",
  supportEmail: "",
  supportPhone: "",
  currency: "PKR",
  deliveryFee: 10,
  freeShippingMin: 5000,
  lowStockThreshold: 5,
  storefrontUrl: "",
  announcement: "",
  codEnabled: true,
  stripeEnabled: true,
};

function Setting() {
  const { logout } = useContext(AdminCotext);
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const loadSettings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/settings`);
      const s = res.data.settings;
      if (s) {
        setForm({
          storeName: s.storeName ?? "",
          tagline: s.tagline ?? "",
          supportEmail: s.supportEmail ?? "",
          supportPhone: s.supportPhone ?? "",
          currency: s.currency ?? "PKR",
          deliveryFee: s.deliveryFee ?? 10,
          freeShippingMin: s.freeShippingMin ?? 5000,
          lowStockThreshold: s.lowStockThreshold ?? 5,
          storefrontUrl: s.storefrontUrl ?? "",
          announcement: s.announcement ?? "",
          codEnabled: s.codEnabled ?? true,
          stripeEnabled: s.stripeEnabled ?? true,
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Could not load settings",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const token = localStorage.getItem("tooken");
      const res = await axios.put(`${API_BASE}/settings`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage({ type: "success", text: res.data.message || "Settings saved" });
      if (res.data.settings) setForm({ ...form, ...res.data.settings });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Save failed",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <p className="text-center py-20 text-slate-500">Loading settings...</p>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your store details and checkout options
          </p>
        </div>
        <button
          type="button"
          onClick={loadSettings}
          className="flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600"
        >
          <RefreshCw size={16} />
          Reload
        </button>
      </div>

      {message.text && (
        <div
          className={`px-4 py-3 rounded-lg text-sm ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Store info */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Store className="w-5 h-5 text-emerald-600" />
            <h2 className="font-semibold text-slate-900">Store information</h2>
          </div>
          <div className="grid gap-4">
            <Field label="Store name" name="storeName" value={form.storeName} onChange={handleChange} />
            <Field label="Tagline" name="tagline" value={form.tagline} onChange={handleChange} />
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Support email" name="supportEmail" type="email" value={form.supportEmail} onChange={handleChange} />
              <Field label="Support phone" name="supportPhone" value={form.supportPhone} onChange={handleChange} />
            </div>
            <Field
              label="Storefront URL"
              name="storefrontUrl"
              value={form.storefrontUrl}
              onChange={handleChange}
              hint="Link to your customer shop"
            />
            {form.storefrontUrl && (
              <a
                href={form.storefrontUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:underline"
              >
                Open storefront <ExternalLink size={14} />
              </a>
            )}
          </div>
        </section>

        {/* Shipping */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Truck className="w-5 h-5 text-emerald-600" />
            <h2 className="font-semibold text-slate-900">Shipping & pricing</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Currency" name="currency" value={form.currency} onChange={handleChange} />
            <Field label="Delivery fee (PKR)" name="deliveryFee" type="number" value={form.deliveryFee} onChange={handleChange} />
            <Field label="Free shipping over (PKR)" name="freeShippingMin" type="number" value={form.freeShippingMin} onChange={handleChange} />
            <Field label="Low stock alert at" name="lowStockThreshold" type="number" value={form.lowStockThreshold} onChange={handleChange} hint="Used on dashboard" />
          </div>
        </section>

        {/* Payments */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <CreditCard className="w-5 h-5 text-emerald-600" />
            <h2 className="font-semibold text-slate-900">Payment methods</h2>
          </div>
          <div className="space-y-3">
            <Toggle label="Cash on delivery (COD)" name="codEnabled" checked={form.codEnabled} onChange={handleChange} />
            <Toggle label="Stripe card payments" name="stripeEnabled" checked={form.stripeEnabled} onChange={handleChange} />
          </div>
          <p className="text-xs text-slate-500 mt-4">
            Stripe keys are configured in Backend <code className="bg-slate-100 px-1 rounded">.env</code>
          </p>
        </section>

        {/* Announcement */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Bell className="w-5 h-5 text-emerald-600" />
            <h2 className="font-semibold text-slate-900">Announcement</h2>
          </div>
          <textarea
            name="announcement"
            value={form.announcement}
            onChange={handleChange}
            rows={3}
            placeholder="e.g. Free shipping this weekend!"
            className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
          />
          <p className="text-xs text-slate-500 mt-2">
            Optional message for your shop (can be shown on homepage later)
          </p>
        </section>

        {/* Account */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-3">Account</h2>
          <p className="text-sm text-slate-600 mb-4">
            Admin login uses credentials from <code className="bg-slate-100 px-1 rounded">Backend/.env</code>{" "}
            (<span className="font-medium">ADMIN_EMAIL</span> / <span className="font-medium">ADMIN_PASSWORD</span>).
            Change them there and restart the server.
          </p>
          <button
            type="button"
            onClick={logout}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Log out of admin
          </button>
        </section>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center justify-center gap-2 w-full sm:w-auto bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-60 transition"
        >
          <Save size={18} />
          {saving ? "Saving..." : "Save settings"}
        </button>
      </form>
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text", hint }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
      />
      {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
    </div>
  );
}

function Toggle({ label, name, checked, onChange }) {
  return (
    <label className="flex items-center justify-between gap-4 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer">
      <span className="text-sm text-slate-800">{label}</span>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 accent-emerald-600"
      />
    </label>
  );
}

export default Setting;
