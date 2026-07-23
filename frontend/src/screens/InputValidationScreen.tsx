import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../contexts/DashboardContext';
import AppButton from '../components/AppButton';
import { ArrowLeft, Check, ShieldCheck } from 'lucide-react';
import toothIllustration from '../assets/tooth_illustration.png';

const InputValidationScreen = () => {
  const navigate = useNavigate();
  const { currentAnalysis } = useDashboard();
  const xray = currentAnalysis.xrayImageUri || toothIllustration;
  const rdtVal = currentAnalysis.rdtValue || '0.4 mm';

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
              Input Validation
            </h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">confirm parameters before AI execution</p>
          </div>
        </div>
      </div>

      {/* Split Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Card: Segmented Xray Preview */}
        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="relative w-full h-[280px] bg-black rounded-2xl overflow-hidden flex items-center justify-center border border-gray-100">
            <img src={xray} alt="Target scan validation" className="w-full h-full object-cover opacity-90" />
            
            {/* Mock overlay Segmented contour borders */}
            <div className="absolute inset-8 border border-green-500/60 rounded-xl pointer-events-none">
              <div className="absolute bottom-2 left-2 bg-green-500/20 text-green-500 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border border-green-400/40">
                Segmented RDT Area
              </div>
            </div>
          </div>
          <div className="text-center mt-3 flex justify-between text-[9px] font-bold text-gray-400 uppercase px-1">
            <span>TOOTH POSITION: #15</span>
            <span>Lower left 3rd Molar (TF)</span>
          </div>
        </div>

        {/* Right Card: Validation checks panel */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-black text-gray-900 leading-none">Validation</h3>
              <p className="text-xs text-gray-400 font-semibold mt-1">Visual data before AI generation.</p>
            </div>

            {/* RDT Value Highlight block */}
            <div className="bg-blue-50/30 border border-blue-100 p-5 rounded-2xl">
              <span className="text-[9px] text-[#007AFF] font-bold uppercase tracking-widest block">Dentin thickness</span>
              <span className="text-3xl font-black text-[#007AFF] block mt-1">{rdtVal}</span>
            </div>

            {/* Checklist states */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs font-bold text-gray-700">
                <div className="w-5 h-5 bg-green-50 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Scan verified</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs font-bold text-gray-700">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping flex-shrink-0"></div>
                <span>Ready for AI processing</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-50 flex gap-4">
            <AppButton 
              fullWidth
              onClick={() => navigate('/analysis_loading')}
              className="py-4 font-bold text-sm"
            >
              Start Analysis →
            </AppButton>
          </div>

        </div>

      </div>

    </div>
  );
};

export default InputValidationScreen;
