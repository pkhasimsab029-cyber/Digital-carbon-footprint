import React from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  ListChecks,
  Cpu,
  Brain,
  Lightbulb,
  User,
  LogOut,
  X,
  Sparkles
} from 'lucide-react';
import { useEco } from '../../context/EcoContext';
import { LeafLogo, GlobeLaptopIllustration } from '../illustrations/Illustrations';

export const Sidebar: React.FC = () => {
  const { currentRoute, navigate, isSidebarOpen, setIsSidebarOpen, logout } = useEco();

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      route: '/dashboard',
      icon: LayoutDashboard,
      badge: 'Main'
    },
    {
      id: 'add-activity',
      label: 'Add Activity',
      route: '/add-activity',
      icon: PlusCircle,
      step: 'Step 2'
    },
    {
      id: 'my-activities',
      label: 'My Activities',
      route: '/activities',
      icon: ListChecks
    },
    {
      id: 'processing',
      label: 'Processing & Estimation',
      route: '/processing',
      icon: Cpu,
      step: 'Step 3'
    },
    {
      id: 'machine-learning',
      label: 'Analytics / Machine Learning',
      route: '/machine-learning',
      icon: Brain,
      step: 'Step 4'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      route: '/recommendations',
      icon: Lightbulb,
      highlight: true
    },
    {
      id: 'profile',
      label: 'Profile',
      route: '/profile',
      icon: User
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 bg-gradient-to-b from-[#0B3D2E] via-[#0E4735] to-[#0F5132] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out border-r border-emerald-900/60 shadow-2xl lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header & Brand */}
        <div className="p-5 pb-2">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => navigate('/dashboard')}
            >
              <div className="p-2 rounded-xl bg-emerald-800/60 border border-emerald-600/40 group-hover:scale-105 transition-transform shadow-inner">
                <LeafLogo size={28} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-xl font-bold tracking-tight text-white font-sans">
                    EcoMind
                  </h1>
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    AI v2.4
                  </span>
                </div>
                <p className="text-[11px] leading-tight text-emerald-200/75 max-w-[170px] mt-0.5 font-sans">
                  Digital Carbon Footprint Prediction & Reduction System
                </p>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              className="lg:hidden p-1.5 text-emerald-300 hover:text-white rounded-lg hover:bg-emerald-800/50"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 h-px bg-gradient-to-r from-transparent via-emerald-700/50 to-transparent" />
        </div>

        {/* Navigation List */}
        <div className="flex-1 px-3 py-2 overflow-y-auto space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-emerald-300/50 mb-2">
            Navigation Menu
          </p>

          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => navigate(item.route)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all group relative text-left ${
                  isActive
                    ? 'bg-[#18553F] text-white shadow-sm border border-emerald-500/40'
                    : 'text-emerald-100/80 hover:bg-[#124232] hover:text-white'
                }`}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1.5 bg-emerald-400 rounded-r-full shadow-[0_0_8px_#34D399]" />
                )}

                <div className="flex items-center gap-3">
                  <div
                    className={`p-1.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-emerald-600/40 text-emerald-200'
                        : 'text-emerald-300/80 group-hover:text-emerald-200 group-hover:bg-emerald-800/40'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="truncate">{item.label}</span>
                </div>

                {/* Step / Highlight Badges */}
                {item.step && (
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                      isActive
                        ? 'bg-emerald-400 text-emerald-950 font-bold'
                        : 'bg-emerald-900/60 text-emerald-300/90 border border-emerald-700/40'
                    }`}
                  >
                    {item.step}
                  </span>
                )}

                {item.highlight && !item.step && (
                  <span className="flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                    Action
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Slogan & Illustration Card + Logout */}
        <div className="p-3 pt-1">
          {/* Eco Illustration Card */}
          <div className="bg-[#0B3326]/80 rounded-2xl p-3 border border-emerald-700/30 shadow-inner text-center relative overflow-hidden group">
            {/* Subtle background glow */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />

            <div className="flex justify-center -mb-2">
              <GlobeLaptopIllustration className="w-36 h-28 transform group-hover:scale-105 transition-transform duration-300" />
            </div>

            {/* Handwritten Slogan */}
            <p className="font-handwritten text-lg text-emerald-300 tracking-wide leading-tight px-1 drop-shadow-xs font-semibold">
              “Smarter Digital Choices for a Greener Tomorrow”
            </p>
            <p className="text-[10px] text-emerald-200/60 mt-1">
              Reduce byte by byte • Net Zero 2030
            </p>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="w-full mt-2.5 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-emerald-200/80 hover:text-white bg-emerald-950/40 hover:bg-rose-950/50 hover:text-rose-200 border border-emerald-800/40 hover:border-rose-700/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Account</span>
          </button>
        </div>
      </aside>
    </>
  );
};
