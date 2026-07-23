import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../contexts/DashboardContext';
import AppButton from '../components/AppButton';
import { ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';
import toothIllustration from '../assets/tooth_illustration.png';

const RecommendationTriggerScreen = () => {
  const navigate = useNavigate();
  const { selectedPatient, currentAnalysis } = useDashboard();
  const [isGenerating, setIsGenerating] = useState(false);

  const patientName = selectedPatient?.name || 'Nancy Thorne';
  const patientId = selectedPatient?.id || '45210';
  const xray = currentAnalysis.xrayImageUri || toothIllustration;

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      navigate('/material_selection');
    }, 1200);
  };

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

      {/* Analysis Complete Card */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6 flex flex-col items-center">
        
        {/* Shield Check Icon */}
        <div className="w-14 h-14 bg-blue-50 text-[#007AFF] rounded-full flex items-center justify-center shadow-inner">
          <ShieldCheck className="w-7 h-7" />
        </div>

        <div>
          <h3 className="text-lg font-black text-gray-900 leading-tight">
            Analysis Complete
          </h3>
          <p className="text-xs text-gray-400 font-semibold leading-relaxed mt-2 max-w-xs">
            All files are saved. Click below to see recommended materials based on tooth position and radiomorphology.
          </p>
        </div>

        {/* Confidence metric indicator */}
        <div className="w-full bg-gray-50 p-3.5 rounded-xl border border-gray-100 flex justify-between items-center text-xs font-bold text-gray-600">
          <span>Confidence Score</span>
          <span className="text-[#007AFF] font-black">98.4%</span>
        </div>

      </div>

      {/* Thumbnails Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-full h-24 bg-black rounded-xl overflow-hidden">
            <img src={xray} alt="" className="w-full h-full object-cover opacity-80" />
          </div>
          <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-1.5 block">Radiograph Scan</span>
        </div>
        <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-full h-24 bg-gray-50 rounded-xl overflow-hidden p-2 flex items-center justify-center">
            <img src={toothIllustration} alt="" className="h-full object-contain" />
          </div>
          <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-1.5 block">Anatomy Model</span>
        </div>
      </div>

      {/* Generate Button */}
      <div className="pt-4">
        <AppButton 
          fullWidth 
          onClick={handleGenerate} 
          isLoading={isGenerating}
          className="py-4 font-bold text-sm"
        >
          {isGenerating ? 'Analyzing Teeth...' : 'Generate Recommendation'}
        </AppButton>
      </div>

    </div>
  );
};

export default RecommendationTriggerScreen;
