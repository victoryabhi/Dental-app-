import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../contexts/DashboardContext';
import AppButton from '../components/AppButton';
import { ArrowLeft, Check, ShieldCheck } from 'lucide-react';
import toothIllustration from '../assets/tooth_illustration.png';

const ResultScreen = () => {
  const navigate = useNavigate();
  const { currentAnalysis, selectedPatient } = useDashboard();

  const material = currentAnalysis.selectedMaterial || 'Biodentine';
  const patientName = selectedPatient?.name || 'Nancy Thorne';
  const patientId = selectedPatient?.id || '45210';
  const rdt = currentAnalysis.rdtValue || '0.4 mm';
  const risk = currentAnalysis.riskLevel || 'High Risk';

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-12 animate-fade-in text-center">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 text-left">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full border-none cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              EndoAI Assistant
            </h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
              Patient: {patientName} • ID: #{patientId}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center mb-4 shadow-md shadow-green-100 animate-scale-up">
          <Check className="w-8 h-8 stroke-[3]" />
        </div>
        <h3 className="text-xl font-black text-gray-950">Analysis Finalized</h3>
        <p className="text-xs text-gray-400 font-semibold mt-1 px-4 leading-relaxed max-w-sm">
          The pulpal assessment is complete and verified.
        </p>
      </div>

      {/* Summary Report Card */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-left space-y-5">
        <div className="flex justify-between items-center pb-2 border-b border-gray-50">
          <div>
            <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest block">Clinical Case file</span>
            <span className="text-sm font-black text-gray-900 block mt-0.5">{patientName}</span>
          </div>
          <div className="w-10 h-10 bg-blue-50 text-[#007AFF] rounded-full flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="space-y-3 text-xs font-semibold text-gray-500">
          <div className="flex justify-between">
            <span>Tooth Location</span>
            <span className="text-gray-900 font-bold">#14 Maxillary 1st Molar</span>
          </div>
          <div className="flex justify-between">
            <span>Calculated RDT</span>
            <span className="text-gray-900 font-bold">{rdt}</span>
          </div>
          <div className="flex justify-between">
            <span>Selected Material</span>
            <span className="text-[#007AFF] font-bold">{material}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-6 space-y-4">
        <AppButton 
          fullWidth 
          onClick={() => navigate('/detailed_result')}
          className="py-4 font-bold text-sm"
        >
          Detailed Report
        </AppButton>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-xs font-bold text-[#007AFF] hover:underline bg-transparent border-none cursor-pointer block mx-auto"
        >
          Back to Dashboard
        </button>
      </div>

    </div>
  );
};

export default ResultScreen;
