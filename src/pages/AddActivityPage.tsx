import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Cloud,
  ArrowUpDown,
  Cpu,
  Info,
  Save,
  RotateCcw,
  Lightbulb,
  Check,
  ChevronRight,
  Zap,
  Leaf
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { useEco } from '../context/EcoContext';

export const AddActivityPage: React.FC = () => {
  const {
    aiInput,
    setAiInput,
    cloudInput,
    setCloudInput,
    transferInput,
    setTransferInput,
    computeInput,
    setComputeInput,
    calculatedEmissions,
    addCurrentActivitiesAsRecords,
  } = useEco();

  // Active eco tips rotation
  const ecoTips = [
    'Prompting AI with concise instructions reduces required token generations, cutting server compute energy by up to 28%.',
    'Cold cloud storage uses up to 70% less energy than hot multi-zone replicated buckets for data accessed rarely.',
    'Downloading over fixed fiber broadband is up to 5x more energy efficient than 4G/5G mobile data streams.',
    'Powering down unused GPU development instances overnight prevents up to 1.8 kg CO₂e per engineer per week.'
  ];
  const [tipIndex, setTipIndex] = useState(0);

  const rotateTip = () => {
    setTipIndex((prev) => (prev + 1) % ecoTips.length);
  };

  const handleReset = () => {
    setAiInput({ mode: 'queries', value: 150, tool: 'ChatGPT (GPT-4o)' });
    setCloudInput({ gb: 250, days: 30, provider: 'Google Drive' });
    setTransferInput({ gb: 120, transferType: 'Download' });
    setComputeInput({ hours: 45, resourceType: 'High-Perf Cloud Instance (GPU)' });
  };

  const handleLoadHighWorkload = () => {
    setAiInput({ mode: 'queries', value: 450, tool: 'Claude 3.5 Sonnet' });
    setCloudInput({ gb: 800, days: 30, provider: 'AWS S3 Multi-Region' });
    setTransferInput({ gb: 350, transferType: 'Streaming' });
    setComputeInput({ hours: 90, resourceType: 'High-Perf Cloud Instance (GPU)' });
  };

  return (
    <AppLayout
      title="Digital Activity Input"
      subtitle="Input your daily or monthly digital resources to calculate verified carbon equivalents"
      step="Step 2"
      actions={
        <div className="flex items-center gap-2">
          <button
            onClick={handleLoadHighWorkload}
            className="text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 px-3 py-1.5 rounded-xl border border-emerald-200 transition-colors"
          >
            Load Sample Preset
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Reset Form"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Side: 2x2 Grid of Activity Input Cards */}
        <div className="xl:col-span-8 space-y-6">

          {/* Quick Header Banner */}
          <div className="bg-gradient-to-r from-emerald-900 to-[#0F5132] text-white p-5 rounded-2xl shadow-md flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold">Activity Telemetry Form</h3>
              </div>
              <p className="text-xs text-emerald-100/80 mt-1 max-w-xl">
                Fill in your digital workload metrics below. The live emission calculator updates in real-time based on standardized life-cycle energy models.
              </p>
            </div>
            <div className="hidden sm:block text-right">
              <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-semibold block">
                Standard Grid Factor
              </span>
              <span className="text-sm font-bold text-white">0.475 kg CO₂e / kWh</span>
            </div>
          </div>

          {/* The 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* CARD 1: AI USAGE (Purple/Indigo Accent) */}
            <div className="eco-card p-5 border-t-4 border-t-purple-600 relative overflow-hidden transition-all hover:shadow-lg">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-purple-100">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">AI Usage</h4>
                    <span className="text-[11px] text-purple-600 font-medium">
                      LLMs, Coding Copilots & GenAI
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                  0.002 kWh / query
                </span>
              </div>

              <div className="space-y-4">
                {/* AI Tool Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    AI Tool / Model
                  </label>
                  <select
                    value={aiInput.tool}
                    onChange={(e) => setAiInput({ ...aiInput, tool: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all font-medium"
                  >
                    <option value="ChatGPT (GPT-4o)">ChatGPT (GPT-4o / GPT-4)</option>
                    <option value="GitHub Copilot">GitHub Copilot (Pair Programming)</option>
                    <option value="Google Gemini 1.5 Pro">Google Gemini 1.5 Pro / Flash</option>
                    <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet (Anthropic)</option>
                    <option value="Midjourney / Flux">Midjourney / Flux (Image Gen)</option>
                    <option value="Local LLaMA 3 70B">Local LLaMA 3 (Self-Hosted)</option>
                  </select>
                </div>

                {/* Mode Toggle (Queries vs Hours) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Measurement Unit
                    </label>
                    <div className="flex rounded-lg bg-slate-100 p-0.5 text-[11px] font-semibold">
                      <button
                        type="button"
                        onClick={() => setAiInput({ ...aiInput, mode: 'queries' })}
                        className={`px-2 py-0.5 rounded-md transition-all ${
                          aiInput.mode === 'queries'
                            ? 'bg-purple-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Queries
                      </button>
                      <button
                        type="button"
                        onClick={() => setAiInput({ ...aiInput, mode: 'hours' })}
                        className={`px-2 py-0.5 rounded-md transition-all ${
                          aiInput.mode === 'hours'
                            ? 'bg-purple-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Usage Hours
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      value={aiInput.value}
                      onChange={(e) =>
                        setAiInput({ ...aiInput, value: Math.max(0, Number(e.target.value)) })
                      }
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-purple-500 font-semibold text-slate-800"
                    />
                    <span className="absolute right-3 top-2 text-xs font-semibold text-slate-400">
                      {aiInput.mode === 'queries' ? 'prompts' : 'hours'}
                    </span>
                  </div>
                </div>

                {/* Live Estimated Emissions Box */}
                <div className="p-3 rounded-xl bg-purple-50 border border-purple-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-600" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-purple-700 tracking-wider block">
                        Estimated Emissions
                      </span>
                      <span className="text-xs text-purple-900 font-semibold">
                        {calculatedEmissions.ai.kwh} kWh Energy
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-extrabold text-purple-700">
                      {calculatedEmissions.ai.co2}
                    </span>
                    <span className="text-xs font-bold text-purple-800 ml-1">kg CO₂e</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2: CLOUD STORAGE (Blue Accent) */}
            <div className="eco-card p-5 border-t-4 border-t-blue-600 relative overflow-hidden transition-all hover:shadow-lg">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-blue-100">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                    <Cloud className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Cloud Storage</h4>
                    <span className="text-[11px] text-blue-600 font-medium">
                      Drive, Buckets & Databases
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                  0.02 kWh / GB / mo
                </span>
              </div>

              <div className="space-y-4">
                {/* Storage Provider Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Storage Provider
                  </label>
                  <select
                    value={cloudInput.provider}
                    onChange={(e) => setCloudInput({ ...cloudInput, provider: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                  >
                    <option value="Google Drive">Google Drive (Workspace / Personal)</option>
                    <option value="AWS S3 (US-East)">AWS S3 Standard (Cloud Storage)</option>
                    <option value="Dropbox Business">Dropbox Cloud Storage</option>
                    <option value="Microsoft OneDrive">Microsoft OneDrive / Azure Blob</option>
                    <option value="Apple iCloud">Apple iCloud Drive</option>
                    <option value="Backblaze B2">Backblaze B2 Low-Energy Tier</option>
                  </select>
                </div>

                {/* Storage GB and Duration in Days */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Storage Size (GB)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min={0}
                        value={cloudInput.gb}
                        onChange={(e) =>
                          setCloudInput({ ...cloudInput, gb: Math.max(0, Number(e.target.value)) })
                        }
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-semibold text-slate-800"
                      />
                      <span className="absolute right-2.5 top-2 text-xs font-semibold text-slate-400">
                        GB
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Duration (Days)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min={1}
                        max={365}
                        value={cloudInput.days}
                        onChange={(e) =>
                          setCloudInput({ ...cloudInput, days: Math.max(1, Number(e.target.value)) })
                        }
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-semibold text-slate-800"
                      />
                      <span className="absolute right-2.5 top-2 text-xs font-semibold text-slate-400">
                        days
                      </span>
                    </div>
                  </div>
                </div>

                {/* Live Estimated Emissions Box */}
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider block">
                        Estimated Emissions
                      </span>
                      <span className="text-xs text-blue-900 font-semibold">
                        {calculatedEmissions.cloud.kwh} kWh Energy
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-extrabold text-blue-700">
                      {calculatedEmissions.cloud.co2}
                    </span>
                    <span className="text-xs font-bold text-blue-800 ml-1">kg CO₂e</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 3: DATA TRANSFERS (Green Accent) */}
            <div className="eco-card p-5 border-t-4 border-t-emerald-600 relative overflow-hidden transition-all hover:shadow-lg">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-emerald-100">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                    <ArrowUpDown className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Data Transfers</h4>
                    <span className="text-[11px] text-emerald-600 font-medium">
                      Bandwidth, Downloads & Streaming
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  0.03 kWh / GB
                </span>
              </div>

              <div className="space-y-4">
                {/* Transfer Type Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Transfer Type / Traffic
                  </label>
                  <select
                    value={transferInput.transferType}
                    onChange={(e) =>
                      setTransferInput({
                        ...transferInput,
                        transferType: e.target.value as any
                      })
                    }
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
                  >
                    <option value="Download">Download (Files, Updates, Packages)</option>
                    <option value="Upload">Upload (Deployments, Asset Uploads)</option>
                    <option value="Streaming">Streaming / Video Calls (Meet, 4K Video)</option>
                    <option value="Sync">CDN / Database Replication Sync</option>
                  </select>
                </div>

                {/* Data in GB */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Data Volume (GB)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      value={transferInput.gb}
                      onChange={(e) =>
                        setTransferInput({
                          ...transferInput,
                          gb: Math.max(0, Number(e.target.value))
                        })
                      }
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-800"
                    />
                    <span className="absolute right-3 top-2 text-xs font-semibold text-slate-400">
                      GB transferred
                    </span>
                  </div>
                </div>

                {/* Live Estimated Emissions Box */}
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider block">
                        Estimated Emissions
                      </span>
                      <span className="text-xs text-emerald-900 font-semibold">
                        {calculatedEmissions.transfer.kwh} kWh Energy
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-extrabold text-emerald-700">
                      {calculatedEmissions.transfer.co2}
                    </span>
                    <span className="text-xs font-bold text-emerald-800 ml-1">kg CO₂e</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 4: COMPUTING TIME (Orange/Amber Accent) */}
            <div className="eco-card p-5 border-t-4 border-t-amber-500 relative overflow-hidden transition-all hover:shadow-lg">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-100">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Computing Time</h4>
                    <span className="text-[11px] text-amber-600 font-medium">
                      Cloud Instances, Workstations & Servers
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  0.05 kWh / hour
                </span>
              </div>

              <div className="space-y-4">
                {/* Resource Type Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Resource Type
                  </label>
                  <select
                    value={computeInput.resourceType}
                    onChange={(e) =>
                      setComputeInput({ ...computeInput, resourceType: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-medium"
                  >
                    <option value="High-Perf Cloud Instance (GPU)">
                      High-Perf Cloud Instance (NVIDIA A100/H100)
                    </option>
                    <option value="Standard Cloud Virtual Machine (8 vCPU)">
                      Standard Cloud Virtual Machine (8 vCPU)
                    </option>
                    <option value="Local Developer PC / Workstation">
                      Local Developer PC / Workstation (Active)
                    </option>
                    <option value="Local Laptop (Battery/M-Series)">
                      Local Laptop (Energy-Efficient M-Series / Ultrabook)
                    </option>
                    <option value="Serverless Cloud Functions (AWS Lambda / Cloud Run)">
                      Serverless Cloud Functions (On-Demand Execution)
                    </option>
                  </select>
                </div>

                {/* Hours */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Active Runtime (Hours)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      value={computeInput.hours}
                      onChange={(e) =>
                        setComputeInput({
                          ...computeInput,
                          hours: Math.max(0, Number(e.target.value))
                        })
                      }
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-semibold text-slate-800"
                    />
                    <span className="absolute right-3 top-2 text-xs font-semibold text-slate-400">
                      hours runtime
                    </span>
                  </div>
                </div>

                {/* Live Estimated Emissions Box */}
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-600" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider block">
                        Estimated Emissions
                      </span>
                      <span className="text-xs text-amber-900 font-semibold">
                        {calculatedEmissions.compute.kwh} kWh Energy
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-extrabold text-amber-700">
                      {calculatedEmissions.compute.co2}
                    </span>
                    <span className="text-xs font-bold text-amber-800 ml-1">kg CO₂e</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Activity Summary Panel */}
        <div className="xl:col-span-4 space-y-5">
          <div className="eco-card p-6 border border-emerald-100 shadow-xl bg-white relative">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Activity Summary</span>
              </h3>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Live Calculation
              </span>
            </div>

            {/* Category breakdown items */}
            <div className="space-y-3 mt-4">
              {/* AI */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-50/70 border border-purple-100 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600 shadow-xs" />
                  <span className="font-semibold text-slate-700">AI Usage</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-purple-950">
                    {calculatedEmissions.ai.co2} kg CO₂e
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    {calculatedEmissions.ai.kwh} kWh
                  </span>
                </div>
              </div>

              {/* Cloud Storage */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-xs" />
                  <span className="font-semibold text-slate-700">Cloud Storage</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-blue-950">
                    {calculatedEmissions.cloud.co2} kg CO₂e
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    {calculatedEmissions.cloud.kwh} kWh
                  </span>
                </div>
              </div>

              {/* Data Transfers */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shadow-xs" />
                  <span className="font-semibold text-slate-700">Data Transfers</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-950">
                    {calculatedEmissions.transfer.co2} kg CO₂e
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    {calculatedEmissions.transfer.kwh} kWh
                  </span>
                </div>
              </div>

              {/* Computing Time */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/70 border border-amber-100 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600 shadow-xs" />
                  <span className="font-semibold text-slate-700">Computing Time</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-amber-950">
                    {calculatedEmissions.compute.co2} kg CO₂e
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    {calculatedEmissions.compute.kwh} kWh
                  </span>
                </div>
              </div>
            </div>

            {/* Total Highlight Box */}
            <div className="mt-5 p-4 rounded-2xl bg-gradient-to-br from-[#0B3D2E] to-[#125841] text-white shadow-lg shadow-emerald-900/15">
              <div className="flex items-center justify-between text-xs text-emerald-200/90 mb-1">
                <span>Total Estimated Emissions</span>
                <span className="font-semibold">Energy: {calculatedEmissions.totalKwh} kWh</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight text-white font-sans">
                  {calculatedEmissions.totalCo2}
                </span>
                <span className="text-sm font-semibold text-emerald-300">kg CO₂e</span>
              </div>
              <p className="text-[11px] text-emerald-200/70 mt-1">
                Equivalent to charging {(calculatedEmissions.totalCo2 * 122).toFixed(0)} smartphones or driving {(calculatedEmissions.totalCo2 * 2.5).toFixed(1)} miles.
              </p>
            </div>

            {/* Did you know? tip box */}
            <div className="mt-4 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-900 flex items-start gap-2.5 relative">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-bold text-[11px] uppercase tracking-wider text-amber-800">
                    Did You Know?
                  </span>
                  <button
                    onClick={rotateTip}
                    className="text-[10px] text-amber-700 underline font-semibold hover:text-amber-900"
                  >
                    Next tip
                  </button>
                </div>
                <p className="text-[11px] leading-relaxed text-amber-950">
                  {ecoTips[tipIndex]}
                </p>
              </div>
            </div>

            {/* Save Activity Button */}
            <button
              onClick={addCurrentActivitiesAsRecords}
              className="w-full mt-5 py-3 px-4 bg-[#1F9D55] hover:bg-[#187E44] text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Save Activity & Process Emissions</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-[11px] text-center text-slate-400 mt-2">
              Saving logs this record and navigates to Step 3: Data Processing.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
