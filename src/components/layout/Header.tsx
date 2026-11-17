import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  ChevronDown,
  Bell,
  Sparkles,
  ShieldCheck,
  User,
  Settings,
  LogOut,
  Sliders,
  ExternalLink
} from 'lucide-react';
import { useEco } from '../../context/EcoContext';
import { LeafLogo } from '../illustrations/Illustrations';

interface HeaderProps {
  title: string;
  subtitle?: string;
  step?: string;
  actions?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  step,
  actions
}) => {
  const { user, setIsSidebarOpen, navigate, logout, recordsTotals } = useEco();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-emerald-100/80 px-4 sm:px-6 py-3.5 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Hamburger & Page Info */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2 font-sans">
                {title}
              </h2>

              {step && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300/80 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  {step}
                </span>
              )}
            </div>

            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right: Tagline, Notifications & User Avatar */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Custom page-specific action buttons (if any) */}
          {actions && <div className="hidden md:flex items-center">{actions}</div>}

          {/* Green Leaf Tagline */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-medium shadow-xs">
            <span className="text-sm">🌱</span>
            <span className="tracking-tight">Net-Zero Digital Future</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-200 text-emerald-900 font-bold">
              Active
            </span>
          </div>

          {/* Notifications Button */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
            </button>

            {/* Notification Dropdown */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Eco Alerts & Insights
                  </h4>
                  <span className="text-[11px] text-emerald-600 font-semibold cursor-pointer hover:underline">
                    Mark all read
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs text-slate-700 flex gap-2.5 items-start">
                    <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-emerald-900">ML Forecast Updated</p>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Predicted emissions next month: 26.4 kg CO₂e (8% reduction opportunity).
                      </p>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 flex gap-2.5 items-start">
                    <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900">Emission Factor Standard</p>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Grid intensity benchmark calibrated to 0.475 kg CO₂e / kWh.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar & Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-emerald-50/80 border border-transparent hover:border-emerald-200 transition-all text-left"
            >
              {/* Avatar circle */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-700 to-teal-500 text-white font-bold text-xs flex items-center justify-center shadow-xs ring-2 ring-emerald-100">
                {user?.name
                  ? user.name
                      .split(' ')
                      .filter(Boolean)
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()
                  : 'U'}
              </div>

              {/* User details */}
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-slate-800 leading-none">
                    {user?.name || 'Account'}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
                <span className="text-[10px] text-emerald-600 font-medium">
                  {user?.role || 'Digital Sustainability'}
                </span>
              </div>
            </button>

            {/* Profile Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2.5 bg-gradient-to-r from-emerald-50 to-teal-50/50 rounded-xl mb-2 border border-emerald-100/60">
                  <p className="text-xs font-bold text-slate-800">{user?.name || 'Account'}</p>
                  <p className="text-[11px] text-slate-500 truncate">{user?.email || 'account@ecomind.io'}</p>
                  <div className="mt-2 pt-2 border-t border-emerald-200/50 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-800 font-medium">Active Footprint:</span>
                    <span className="font-bold text-emerald-900">{recordsTotals.totalCo2} kg CO₂e</span>
                  </div>
                </div>

                <div className="space-y-0.5 text-xs text-slate-700">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate('/profile');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-emerald-700 text-left transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>My Account & Budget</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate('/recommendations');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-emerald-700 text-left transition-colors"
                  >
                    <Sliders className="w-3.5 h-3.5 text-slate-400" />
                    <span>Reduction Actions</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate('/machine-learning');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-emerald-700 text-left transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                    <span>ML Forecast Model</span>
                  </button>
                </div>

                <div className="my-1.5 h-px bg-slate-100" />

                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-rose-50 text-rose-600 text-xs font-medium text-left transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-500" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
