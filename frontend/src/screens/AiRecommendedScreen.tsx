import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../contexts/DashboardContext';
import AppButton from '../components/AppButton';
import { ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';
import toothIllustration from '../assets/tooth_illustration.png';

const AiRecommendedScreen = () => {
  const navigate = useNavigate();
  const { currentAnalysis, updateAnalysis } = useDashboard();
  
  const rdt = currentAnalysis.rdtValue || '0.4 mm';
  const recommendedMaterial = 'Biodentine';

  const handleUseRecommended = () => {
    updateAnalysis({ selectedMaterial: recommendedMaterial });
    navigate('/final_selection');
  };

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
              AI Recommended
            </h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">optimal clinical biomaterial choice</p>
          </div>
        </div>
      </div>

      {/* Split Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Side: Material & Justification */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6 flex flex-col justify-between">
          
          <div className="space-y-4">
            
            {/* RDT alert tag */}
            <div className="flex justify-between items-center pb-2 border-b border-gray-50">
              <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">RDT value</span>
              <span className="px-2 py-0.5 bg-red-50 text-red-500 text-[9px] font-black uppercase rounded-lg border border-red-100">
                {rdt} Critical
              </span>
            </div>

            {/* Recommended Box */}
            <div className="bg-green-50/50 border border-green-100 rounded-2xl p-4 flex gap-3.5 items-center">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[8px] text-green-600 font-bold uppercase tracking-wider">AI RECOMMENDATION</span>
                <h3 className="text-base font-black text-gray-900 mt-0.5">{recommendedMaterial}</h3>
              </div>
            </div>

            {/* Justification */}
            <div className="space-y-2">
              <span className="text-[9px] text-[#007AFF] font-bold uppercase tracking-wider block">Justification</span>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                Superior sealing biocompatibility for the dental cavity floor. Form a dentin substitute with resistance property similar to natural dentin. Minimizing pulp irritation when RDT &lt; 0.5mm.
              </p>
            </div>

          </div>

          <div className="pt-6 border-t border-gray-50 flex flex-col gap-3">
            <AppButton onClick={handleUseRecommended} className="py-4 font-bold text-sm">
              Use Recommended
            </AppButton>
            <button 
              onClick={() => navigate('/material_comparison')}
              className="text-xs font-bold text-[#007AFF] hover:underline bg-transparent border-none cursor-pointer text-center"
            >
              Compare Materials
            </button>
          </div>

        </div>

        {/* Right Side: Cross Section */}
        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="relative w-full h-[280px] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center p-6">
            <img src={toothIllustration} alt="Anatomy" className="h-full object-contain" />
            <div className="absolute bottom-4 left-4 right-4 text-center text-white/80 text-[10px] font-black uppercase tracking-wider bg-black/45 py-1.5 rounded-xl">
              Cross-Sectional Scan Analysis
            </div>
          </div>
          <div className="text-center mt-3 text-[9px] font-bold text-gray-400 uppercase">
            "High confidence response (98.4%) of suggested material application."
          </div>
        </div>

      </div>

    </div>
  );
};

export default AiRecommendedScreen;
