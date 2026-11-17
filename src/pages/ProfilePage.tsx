import React, { useState, useEffect } from 'react';
import {
  Sliders,
  Save,
  CheckCircle2,
  Trash2,
  Users
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { useEco } from '../context/EcoContext';

export const ProfilePage: React.FC = () => {
  const { user, updateUserProfile, recordsTotals, showToast, resetToDefaults, registeredUsers } = useEco();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [role, setRole] = useState(user?.role || 'Digital Sustainability Lead');
  const [budget, setBudget] = useState(user?.carbonBudgetKg || 40);
  const [gridRegion, setGridRegion] = useState('Global (0.475 kg CO₂e / kWh)');
  const [emailAlerts, setEmailAlerts] = useState(true);

  // Sync state when user changes
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role || 'Digital Sustainability Lead');
      setBudget(user.carbonBudgetKg || 40);
    }
  }, [user]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Name cannot be empty.', 'warning');
      return;
    }
    updateUserProfile({
      name: name.trim(),
      email: email.trim(),
      role: role.trim(),
      carbonBudgetKg: budget
    });
  };

  const initials = name
    ? name
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'U';

  return (
    <AppLayout
      title="User Profile & Settings"
      subtitle="Manage your personal carbon budget, regional grid benchmark, and account details"
    >
      <div className="max-w-4xl mx-auto space-y-6">

        {/* User Card */}
        <div className="eco-card p-6 bg-white border border-emerald-100 flex flex-col sm:flex-row items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-700 to-teal-500 text-white font-black text-2xl flex items-center justify-center shadow-lg ring-4 ring-emerald-100">
            {initials}
          </div>
          <div className="text-center sm:text-left flex-1">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h3 className="text-xl font-bold text-slate-800">{name || 'User Account'}</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                Verified Account
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{email || 'Not specified'}</p>
            <p className="text-xs text-emerald-700 font-semibold mt-1">
              Active Digital Footprint: {recordsTotals.totalCo2} kg CO₂e
            </p>
          </div>

          <div className="text-right text-xs text-slate-400">
            <span className="block">Member since</span>
            <span className="font-semibold text-slate-700">{user?.joinedDate || 'October 2026'}</span>
          </div>
        </div>

        {/* Settings Form */}
        <form onSubmit={handleSave} className="eco-card p-6 bg-white border border-emerald-100 space-y-5">
          <h4 className="text-sm font-bold text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-600" />
            <span>Account & Carbon Budget Configuration</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Role / Designation</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Regional Grid Emission Intensity</label>
              <select
                value={gridRegion}
                onChange={(e) => setGridRegion(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="Global (0.475 kg CO₂e / kWh)">Global Average (0.475 kg CO₂e / kWh)</option>
                <option value="US National Grid (0.386 kg CO₂e / kWh)">US National Grid (0.386 kg CO₂e / kWh)</option>
                <option value="European Union Clean Grid (0.255 kg CO₂e / kWh)">European Union Clean Grid (0.255 kg CO₂e / kWh)</option>
                <option value="India Regional Grid (0.710 kg CO₂e / kWh)">India Regional Grid (0.710 kg CO₂e / kWh)</option>
              </select>
            </div>
          </div>

          {/* Carbon Budget Slider */}
          <div className="pt-2">
            <div className="flex justify-between items-center mb-1.5 text-xs font-semibold text-slate-700">
              <span>Monthly Personal Carbon Budget Target</span>
              <span className="text-emerald-700 font-bold text-sm">{budget} kg CO₂e</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Alerts will trigger when your monthly forecast exceeds {budget} kg CO₂e.
            </p>
          </div>

          {/* Email toggle */}
          <div className="flex items-center gap-2 pt-1 text-xs text-slate-700">
            <input
              type="checkbox"
              id="alerts"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
            <label htmlFor="alerts" className="cursor-pointer">
              Send weekly digital carbon telemetry digest & ML forecast alerts
            </label>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
            <button
              type="button"
              onClick={resetToDefaults}
              className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Reset Activity Telemetry
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 bg-[#1F9D55] hover:bg-[#187E44] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>

      </div>
    </AppLayout>
  );
};
