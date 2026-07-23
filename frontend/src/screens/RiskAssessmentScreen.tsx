import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../contexts/DashboardContext';
import AppButton from '../components/AppButton';
import { ArrowLeft, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';
import toothIllustration from '../assets/tooth_illustration.png';

const RiskAssessmentScreen = () => {
  const navigate = useNavigate();
  const { currentAnalysis } = useDashboard();
  const risk = currentAnalysis.riskLevel || 'High Risk';
  const rdt = currentAnalysis.rdtValue || '0.4 mm';

  const riskColor = risk === 'High Risk' ? 'text-red-500 stroke-red-500' : risk === 'Moderate' ? 'text-yellow-600 stroke-yellow-500' : 'text-green-500 stroke-green-500';
  const progressPercent = risk === 'High Risk' ? 85 : risk === 'Moderate' ? 50 : 20;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full border-none cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Risk Assessment
            </h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">radiographic pulpal risk analysis</p>
          </div>
        </div>
      </div>

      {/* Split Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Card: Circular Dial Chart */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center space-y-4">
          <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest block">Pulpal Exposure Risk</span>
          
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#F1F5F9" strokeWidth="6" fill="transparent" />
              <circle cx="50" cy="50" r="40" stroke={risk === 'High Risk' ? '#FF5252' : '#F59E0B'} strokeWidth="6" fill="transparent" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - progressPercent / 100)} strokeLinecap="round" />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <AlertTriangle className={`w-6 h-6 mb-1 ${risk === 'High Risk' ? 'text-red-500' : 'text-yellow-500'}`} />
              <span className="text-sm font-extrabold text-gray-900 leading-none">{risk}</span>
              <span className="text-[8px] font-bold text-gray-400 mt-1 uppercase">Risk Level</span>
            </div>
          </div>
        </div>

        {/* Right Card: Result Checklist Details */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest pb-2 border-b border-gray-50">
              Analysis Results
            </h3>

            {/* Exposure detected red alert badge */}
            {risk === 'High Risk' && (
              <div className="bg-red-50 text-red-500 border border-red-100 p-4 rounded-xl flex gap-3 text-left">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-xs uppercase tracking-wide">Pulp Exposure Detected</h4>
                  <p className="text-[9px] text-gray-400 font-semibold leading-relaxed mt-0.5">
                    Immediate capping or pulpotomy recommended to preserve irreversible pulpal vitality.
                  </p>
                </div>
              </div>
            )}

            {/* RDT vs Liner row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                <span className="text-[8px] text-gray-400 font-bold uppercase block">Calculated RDT</span>
                <span className="text-xs font-black text-red-500 mt-0.5 block">{rdt}</span>
              </div>
              <div className="p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                <span className="text-[8px] text-gray-400 font-bold uppercase block">Recommended Material</span>
                <span className="text-xs font-black text-[#007AFF] mt-0.5 block">MTA</span>
              </div>
            </div>
          </div>

          <div className="relative w-full h-24 rounded-2xl overflow-hidden border border-gray-100">
            <img src={toothIllustration} alt="" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-black/45 flex items-center justify-center text-white text-[10px] font-black uppercase tracking-wider">
              Cross Section view
            </div>
          </div>

        </div>

      </div>

      {/* Suggestion Card */}
      <div className="bg-blue-50/30 border border-blue-100 rounded-3xl p-5 flex gap-4 shadow-sm">
        <div className="w-12 h-12 bg-blue-100 text-[#007AFF] rounded-xl flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-extrabold text-gray-900 text-xs uppercase tracking-wide">AI Clinical Suggestion</h4>
          <p className="text-[10px] text-gray-400 font-semibold leading-relaxed mt-1">
            Apply MTA or Biodentine. MTA lining for direct pulp capping improves therapeutic outcomes. Monitor for symptoms over 48 hours.
          </p>
        </div>
      </div>

      <div className="pt-2 flex justify-center">
        <AppButton 
          onClick={() => navigate('/analysis_summary')}
          className="w-full max-w-md py-4 font-bold text-sm"
        >
          View Analysis Summary →
        </AppButton>
      </div>

    </div>
  );
};

export default RiskAssessmentScreen;
