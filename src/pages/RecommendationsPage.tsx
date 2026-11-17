import React from 'react';
import {
  Lightbulb,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  TrendingDown,
  ArrowRight,
  Bot,
  Cloud,
  ArrowUpDown,
  Laptop
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { useEco } from '../context/EcoContext';
import type { ActivityCategory } from '../types';

export const RecommendationsPage: React.FC = () => {
  const { recommendations, toggleRecommendation, navigate } = useEco();

  const totalPossibleSavings = Number(
    recommendations.reduce((sum, r) => sum + r.saveKgCo2, 0).toFixed(1)
  );

  const totalCurrentSavings = Number(
    recommendations
      .filter((r) => r.isApplied)
      .reduce((sum, r) => sum + r.saveKgCo2, 0)
      .toFixed(1)
  );

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

  return (
    <AppLayout
      title="Personalized Recommendations"
      subtitle="AI-driven actionable reduction strategies tailored to your digital workload profile"
      actions={
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-300">
            Active Savings: -{totalCurrentSavings} kg CO₂e
          </span>
        </div>
      }
    >
      <div className="space-y-6">

        {/* Hero Card */}
        <div className="eco-card p-6 bg-gradient-to-r from-emerald-900 via-[#0F5132] to-[#0B3D2E] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-300" />
              <h3 className="text-lg font-bold">Reduction Roadmap (Net-Zero 2030)</h3>
            </div>
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              Applying the recommendations below can prevent up to <strong>{totalPossibleSavings} kg CO₂e</strong> this quarter alone. Every optimization automatically updates your Machine Learning emission forecast.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center shrink-0 w-full md:w-auto">
            <span className="text-[11px] uppercase font-bold text-emerald-300 block">
              Cumulative Reduction Potential
            </span>
            <span className="text-3xl font-black text-white font-sans mt-0.5 block">
              -{totalPossibleSavings} kg
            </span>
            <span className="text-[10px] text-emerald-200 mt-1 block">
              {recommendations.filter((r) => r.isApplied).length} of {recommendations.length} applied
            </span>
          </div>
        </div>

        {/* Recommendation Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className={`eco-card p-5 border transition-all duration-200 flex flex-col justify-between ${
                rec.isApplied
                  ? 'bg-emerald-50/50 border-emerald-300 shadow-md ring-1 ring-emerald-400/30'
                  : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-slate-100">{getCategoryIcon(rec.category)}</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {rec.category} Optimization
                    </span>
                  </div>

                  <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300">
                    Save {rec.saveKgCo2} kg CO₂e
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-800 leading-snug">{rec.title}</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{rec.description}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                    Difficulty: {rec.difficulty}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-700">
                    -{rec.impactPercent}% category impact
                  </span>
                </div>

                <button
                  onClick={() => toggleRecommendation(rec.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    rec.isApplied
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-[#1F9D55] hover:bg-[#187E44] text-white shadow-xs'
                  }`}
                >
                  {rec.isApplied ? '✓ Action Applied' : '+ Apply Action'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Back to ML Link */}
        <div className="text-center pt-4">
          <button
            onClick={() => navigate('/machine-learning')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline inline-flex items-center gap-1"
          >
            <span>See how these recommendations reshape the ML Forecast</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </AppLayout>
  );
};
