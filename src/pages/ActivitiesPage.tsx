import React, { useState } from 'react';
import {
  ListChecks,
  PlusCircle,
  Search,
  Filter,
  Download,
  Trash2,
  Bot,
  Cloud,
  ArrowUpDown,
  Laptop,
  CheckCircle2,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { useEco } from '../context/EcoContext';
import type { ActivityCategory } from '../types';

export const ActivitiesPage: React.FC = () => {
  const { activities, recordsTotals, deleteActivity, resetToDefaults, navigate, showToast } = useEco();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = activities.filter((act) => {
    const matchesCategory = activeCategory === 'all' || act.type === activeCategory;
    const matchesSearch =
      act.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.typeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: ActivityCategory) => {
    switch (category) {
      case 'ai':
        return <Bot className="w-4 h-4 text-purple-600" />;
      case 'cloud':
        return <Cloud className="w-4 h-4 text-blue-600" />;
      case 'transfer':
        return <ArrowUpDown className="w-4 h-4 text-emerald-600" />;
      case 'compute':
        return <Laptop className="w-4 h-4 text-amber-600" />;
    }
  };

  const handleExport = () => {
    showToast('Activity log exported to CSV', 'success');
  };

  return (
    <AppLayout
      title="My Activities"
      subtitle="Complete chronological history of all tracked digital workload events"
      actions={
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/add-activity')}
            className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#1F9D55] hover:bg-[#187E44] px-3.5 py-1.5 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Activity</span>
          </button>
          <button
            onClick={resetToDefaults}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-slate-200 transition-colors"
          >
            Reset Defaults
          </button>
        </div>
      }
    >
      <div className="space-y-6">

        {/* Summary Stat Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="eco-card p-4 bg-white border border-emerald-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase">Total Activities</span>
              <p className="text-2xl font-black text-slate-800 font-sans mt-0.5">{activities.length}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
              <ListChecks className="w-5 h-5" />
            </div>
          </div>

          <div className="eco-card p-4 bg-white border border-emerald-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase">Total Energy Consumed</span>
              <p className="text-2xl font-black text-slate-800 font-sans mt-0.5">{recordsTotals.totalKwh} kWh</p>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

          <div className="eco-card p-4 bg-white border border-emerald-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase">Cumulative CO₂e</span>
              <p className="text-2xl font-black text-emerald-700 font-sans mt-0.5">{recordsTotals.totalCo2} kg</p>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Filter and Table Container */}
        <div className="eco-card p-5 bg-white border border-emerald-100 space-y-4">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            {/* Category tabs */}
            <div className="flex rounded-xl bg-slate-100 p-0.5 text-xs font-semibold overflow-x-auto">
              {['all', 'ai', 'cloud', 'transfer', 'compute'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg capitalize transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-white text-emerald-800 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat === 'all' ? 'All Activities' : cat === 'ai' ? 'AI Usage' : cat === 'cloud' ? 'Cloud Storage' : cat === 'transfer' ? 'Data Transfers' : 'Computing'}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative max-w-xs">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search activity records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
              />
            </div>
          </div>

          {/* Activities Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50">
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Details</th>
                  <th className="py-3 px-3 text-right">Quantity</th>
                  <th className="py-3 px-3 text-right">Energy</th>
                  <th className="py-3 px-3 text-right">Emissions (kg CO₂e)</th>
                  <th className="py-3 px-2 text-center">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">
                      No matching activity records found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((act) => (
                    <tr key={act.id} className="hover:bg-emerald-50/20 transition-colors">
                      <td className="py-3 px-3 text-slate-500 font-medium">{act.date}</td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <span className="p-1 rounded-md bg-slate-100">{getCategoryIcon(act.type)}</span>
                          <span className="font-semibold text-slate-800">{act.typeName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-slate-700 font-medium">{act.details}</td>
                      <td className="py-3 px-3 text-right font-semibold text-slate-800">
                        {act.quantity} <span className="text-[10px] text-slate-400">{act.unit}</span>
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-slate-700">
                        {act.energyUsedKwh.toFixed(2)} kWh
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className="font-extrabold text-emerald-700">{act.co2Kg.toFixed(3)} kg</span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <button
                          onClick={() => deleteActivity(act.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Remove activity"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AppLayout>
  );
};
