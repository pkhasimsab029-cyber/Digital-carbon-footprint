import React, { useState } from 'react';
import {
  CheckCircle2,
  Cpu,
  ArrowRight,
  Database,
  Calculator,
  CheckCheck,
  Search,
  Filter,
  Download,
  Bot,
  Cloud,
  ArrowUpDown,
  Laptop,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { useEco } from '../context/EcoContext';
import type { ActivityCategory, ActivityRecord } from '../types';

export const ProcessingPage: React.FC = () => {
  const { activities, recordsTotals, navigate, deleteActivity, showToast } = useEco();

  // Filters
  const [filterPeriod, setFilterPeriod] = useState<'7days' | '30days' | 'all'>('7days');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStepIndex, setActiveStepIndex] = useState(3); // 0 to 3

  // 4-step flow items
  const flowSteps = [
    {
      step: '01',
      title: 'Activity Data',
      desc: 'Raw telemetry ingested',
      icon: Database,
      status: 'complete'
    },
    {
      step: '02',
      title: 'Apply Emission Factors',
      desc: 'IEA & CCF coefficients applied',
      icon: Cpu,
      status: 'complete'
    },
    {
      step: '03',
      title: 'Calculate Emissions',
      desc: 'kWh to CO₂e grid conversion',
      icon: Calculator,
      status: 'complete'
    },
    {
      step: '04',
      title: 'Results & ML Ready',
      desc: 'Verified carbon telemetry',
      icon: CheckCheck,
      status: 'active'
    }
  ];

  // Category Icon helper
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

  const getCategoryBadge = (category: ActivityCategory) => {
    switch (category) {
      case 'ai':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'cloud':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'transfer':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'compute':
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  // Filter activities
  const filteredActivities = activities.filter((act) => {
    const matchesSearch =
      act.typeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleExportCSV = () => {
    const headers = 'Activity Type,Details,Quantity,Unit,Energy Used (kWh),CO2 (kg),Emission Factor,Source\n';
    const rows = activities
      .map(
        (a) =>
          `"${a.typeName}","${a.details}",${a.quantity},"${a.unit}",${a.energyUsedKwh},${a.co2Kg},"${a.emissionFactor}","${a.source}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EcoMind_Processed_Emissions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    showToast('Exported CSV of processed emissions data', 'success');
  };

  return (
    <AppLayout
      title="Data Processing & Emission Estimation"
      subtitle="Step 3: Calculating and validating digital carbon output against peer-reviewed standards"
      step="Step 3"
      actions={
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-white hover:bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 transition-colors shadow-2xs cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </button>
      }
    >
      <div className="space-y-6">

        {/* 4-STEP FLOW STRIP */}
        <div className="eco-card p-5 bg-white border border-emerald-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {flowSteps.map((step, idx) => {
              const Icon = step.icon;
              const isLast = idx === flowSteps.length - 1;

              return (
                <div key={step.step} className="flex items-center">
                  <div
                    onClick={() => setActiveStepIndex(idx)}
                    className={`flex-1 p-3.5 rounded-2xl transition-all cursor-pointer border ${
                      activeStepIndex === idx
                        ? 'bg-emerald-50/90 border-emerald-300 ring-2 ring-emerald-400/30 shadow-xs'
                        : 'bg-slate-50/60 border-slate-200/80 hover:bg-emerald-50/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                        Step {step.step}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-white text-emerald-700 shadow-2xs border border-emerald-100">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 leading-tight">
                          {step.title}
                        </h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  </div>

                  {/* Flow Arrow */}
                  {!isLast && (
                    <div className="hidden md:flex items-center justify-center px-1 text-emerald-400 font-bold text-sm">
                      ➔
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* "PROCESSING COMPLETE" BANNER */}
        <div className="eco-card p-4 sm:p-5 bg-gradient-to-r from-emerald-800 via-emerald-700 to-[#0F5132] text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/20">
              <CheckCircle2 className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h3 className="text-sm sm:text-base font-bold">
                  Data Processing Complete!
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-300/30">
                  Ready for ML
                </span>
              </div>
              <p className="text-xs text-emerald-100/80 mt-0.5">
                All digital activity inputs calculated with localized grid carbon factor (0.475 kg CO₂e / kWh).
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/machine-learning')}
            className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-emerald-50 text-emerald-900 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group shrink-0"
          >
            <span>View Detailed ML Report</span>
            <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* TOTAL ESTIMATED EMISSIONS BAR */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="eco-card p-4 bg-white border border-emerald-100 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Total Energy Consumed
              </p>
              <p className="text-2xl font-black text-slate-800 font-sans mt-0.5">
                {recordsTotals.totalKwh}{' '}
                <span className="text-xs font-semibold text-slate-500">kWh</span>
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
              <Cpu className="w-5 h-5" />
            </div>
          </div>

          <div className="eco-card p-4 bg-white border border-emerald-100 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Total Carbon Footprint
              </p>
              <p className="text-2xl font-black text-emerald-700 font-sans mt-0.5">
                {recordsTotals.totalCo2}{' '}
                <span className="text-xs font-semibold text-emerald-800">kg CO₂e</span>
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-100/60 text-emerald-700">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

          <div className="eco-card p-4 bg-white border border-emerald-100 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Average Grid Intensity
              </p>
              <p className="text-2xl font-black text-slate-800 font-sans mt-0.5">
                0.475 <span className="text-xs font-semibold text-slate-500">kg/kWh</span>
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
              <Database className="w-5 h-5" />
            </div>
          </div>

          <div className="eco-card p-4 bg-white border border-emerald-100 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Processed Records
              </p>
              <p className="text-2xl font-black text-slate-800 font-sans mt-0.5">
                {activities.length}{' '}
                <span className="text-xs font-semibold text-slate-500">activities</span>
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50 text-amber-600">
              <CheckCheck className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* MAIN SPLIT: TABLE ON LEFT, DOCUMENTED EMISSION FACTORS ON RIGHT */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">

          {/* TABLE CONTAINER (Left 8 Cols) */}
          <div className="xl:col-span-8 eco-card p-5 bg-white border border-emerald-100 space-y-4">
            {/* Table Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800">Filter Range:</span>
                <div className="flex rounded-xl bg-slate-100 p-0.5 text-xs font-semibold">
                  <button
                    onClick={() => setFilterPeriod('7days')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      filterPeriod === '7days'
                        ? 'bg-white text-emerald-800 shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Last 7 Days
                  </button>
                  <button
                    onClick={() => setFilterPeriod('30days')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      filterPeriod === '30days'
                        ? 'bg-white text-emerald-800 shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Last 30 Days
                  </button>
                  <button
                    onClick={() => setFilterPeriod('all')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      filterPeriod === 'all'
                        ? 'bg-white text-emerald-800 shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All Records
                  </button>
                </div>
              </div>

              {/* Search */}
              <div className="relative max-w-xs">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search activity or tool..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                />
              </div>
            </div>

            {/* The Processed Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50">
                    <th className="py-3 px-3">Activity Type</th>
                    <th className="py-3 px-3">Details / Tool</th>
                    <th className="py-3 px-3 text-right">Quantity</th>
                    <th className="py-3 px-3 text-right">Energy (kWh)</th>
                    <th className="py-3 px-3 text-right">CO₂ (kg)</th>
                    <th className="py-3 px-3">Emission Factor (Source)</th>
                    <th className="py-3 px-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredActivities.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        No activity records found matching search query.
                      </td>
                    </tr>
                  ) : (
                    filteredActivities.map((act) => (
                      <tr key={act.id} className="hover:bg-emerald-50/30 transition-colors">
                        {/* Type */}
                        <td className="py-3 px-3 font-semibold">
                          <div className="flex items-center gap-2">
                            <span className="p-1.5 rounded-lg bg-slate-100 shrink-0">
                              {getCategoryIcon(act.type)}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getCategoryBadge(
                                act.type
                              )}`}
                            >
                              {act.typeName}
                            </span>
                          </div>
                        </td>

                        {/* Details */}
                        <td className="py-3 px-3 text-slate-700 font-medium max-w-[200px] truncate">
                          {act.details}
                        </td>

                        {/* Quantity */}
                        <td className="py-3 px-3 text-right font-semibold text-slate-800">
                          {act.quantity} <span className="text-[10px] text-slate-500 font-normal">{act.unit}</span>
                        </td>

                        {/* Energy (kWh) */}
                        <td className="py-3 px-3 text-right font-bold text-slate-800">
                          {act.energyUsedKwh.toFixed(2)}
                        </td>

                        {/* CO2 (kg) */}
                        <td className="py-3 px-3 text-right">
                          <span className="font-extrabold text-emerald-700">
                            {act.co2Kg.toFixed(3)}
                          </span>
                        </td>

                        {/* Emission Factor */}
                        <td className="py-3 px-3 text-[11px]">
                          <span className="font-semibold text-slate-800 block">
                            {act.emissionFactor}
                          </span>
                          <span className="text-[10px] text-slate-400 block truncate max-w-[150px]">
                            {act.source}
                          </span>
                        </td>

                        {/* Action */}
                        <td className="py-3 px-2 text-center">
                          <button
                            onClick={() => deleteActivity(act.id)}
                            className="text-slate-400 hover:text-rose-600 text-xs px-2 py-1 rounded-md hover:bg-rose-50 transition-colors"
                            title="Delete Record"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
              <span>Showing {filteredActivities.length} verified activity rows</span>
              <button
                onClick={() => navigate('/add-activity')}
                className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
              >
                <span>+ Add more activity inputs</span>
              </button>
            </div>
          </div>

          {/* RIGHT PANEL: DOCUMENTED EMISSION FACTORS REFERENCE (Right 4 Cols) */}
          <div className="xl:col-span-4 space-y-5">
            <div className="eco-card p-5 bg-white border border-emerald-100 shadow-md">
              <div className="pb-3 border-b border-slate-100 mb-3">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-600" />
                  <span>Documented Emission Factors</span>
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Peer-reviewed benchmark rates applied to convert raw activity metrics to kWh and CO₂e.
                </p>
              </div>

              {/* Factors List */}
              <div className="space-y-3">
                {/* AI */}
                <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200/70">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-900">AI LLM Queries</span>
                    <span className="text-xs font-extrabold text-purple-700">0.002 kWh / query</span>
                  </div>
                  <p className="text-[10px] text-purple-800/80 mt-1">
                    Source: OpenAI, MIT & Green AI Energy Life-Cycle Model (2024).
                  </p>
                </div>

                {/* Cloud Storage */}
                <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/70">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-900">Cloud Storage</span>
                    <span className="text-xs font-extrabold text-blue-700">0.02 kWh / GB / mo</span>
                  </div>
                  <p className="text-[10px] text-blue-800/80 mt-1">
                    Source: Cloud Carbon Footprint standard multi-tenant HDD/SSD baseline.
                  </p>
                </div>

                {/* Data Transfer */}
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/70">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900">Data Transfer (WAN)</span>
                    <span className="text-xs font-extrabold text-emerald-700">0.03 kWh / GB</span>
                  </div>
                  <p className="text-[10px] text-emerald-800/80 mt-1">
                    Source: The Shift Project & International Energy Agency (IEA 2024).
                  </p>
                </div>

                {/* Computing Time */}
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/70">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900">Computing Time</span>
                    <span className="text-xs font-extrabold text-amber-700">0.05 kWh / hour</span>
                  </div>
                  <p className="text-[10px] text-amber-800/80 mt-1">
                    Source: Green Software Foundation SCI Specification (Standard vCPU).
                  </p>
                </div>
              </div>

              {/* Disclaimer Note */}
              <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-[11px] leading-relaxed flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Disclaimer:</strong> Emission factors reflect standardized global life-cycle assessments. Actual cloud data center PUE and renewable regional grid mix vary by cloud region (e.g. US-East vs EU-North).
                </p>
              </div>

              {/* Next Action Button */}
              <button
                onClick={() => navigate('/machine-learning')}
                className="w-full mt-4 py-2.5 px-4 bg-[#1F9D55] hover:bg-[#187E44] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Step 4: ML Prediction</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </AppLayout>
  );
};
