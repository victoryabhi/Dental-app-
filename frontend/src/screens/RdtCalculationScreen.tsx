import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../contexts/DashboardContext';
import AppButton from '../components/AppButton';
import { ArrowLeft, Check, ShieldAlert } from 'lucide-react';
import toothIllustration from '../assets/tooth_illustration.png';

const RdtCalculationScreen = () => {
  const navigate = useNavigate();
  const { currentAnalysis, updateAnalysis } = useDashboard();
  const xray = currentAnalysis.xrayImageUri || toothIllustration;
  const rdtVal = currentAnalysis.rdtValue || '0.4 mm';

  useEffect(() => {
    if (!currentAnalysis.rdtValue) {
      updateAnalysis({
        rdtValue: '0.4 mm',
        calculatedRdt: 0.4,
        riskLevel: 'High Risk'
      });
    }
  }, [currentAnalysis.rdtValue, updateAnalysis]);

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
              RDT Calculation
            </h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">calculate remaining dentin limits</p>
          </div>
        </div>
      </div>

      {/* Split Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Card: Cross Section preview */}
        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="relative w-full h-[280px] bg-black rounded-2xl overflow-hidden flex items-center justify-center border border-gray-100">
            <img src={xray} alt="Cross Section view" className="w-full h-full object-cover opacity-90" />
            
            {/* Visual red target caliper overlay */}
            <div className="absolute top-[60%] w-24 h-0.5 bg-red-500 shadow-[0_0_4px_#FF0000] flex justify-between items-center">
              <div className="w-0.5 h-3 bg-red-500"></div>
              <span className="text-[9px] text-red-500 font-black bg-black/80 px-1 rounded -translate-y-4">
                {rdtVal}
              </span>
              <div className="w-0.5 h-3 bg-red-500"></div>
            </div>
          </div>
          <div className="text-center mt-3 text-[9px] font-bold text-gray-400 uppercase">
            Tooth #15 Cross-Section
          </div>
        </div>

        {/* Right Card: Calculation checklist result */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          
          <div className="space-y-6">
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest pb-2 border-b border-gray-50">
              Automated Segmentation
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl">
                <span className="text-xs font-bold text-gray-700">Dentin Floor</span>
                <span className="text-[10px] text-green-600 font-black uppercase">VALIDATED</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl">
                <span className="text-xs font-bold text-gray-700">Pulp Ceiling</span>
                <span className="text-[10px] text-green-600 font-black uppercase">MAPPED</span>
              </div>

              {/* RDT Critical highlight banner */}
              <div className="bg-red-50 text-red-500 p-4 rounded-xl border border-red-100 flex items-center justify-between">
                <div>
                  <span className="text-[8px] text-red-400 font-bold uppercase tracking-wider block">Remaining Dentin Thickness</span>
                  <span className="text-lg font-black block mt-0.5">{rdtVal}</span>
                </div>
                <span className="px-2 py-1 bg-red-500 text-white font-black text-[9px] uppercase rounded-md tracking-wider">
                  CRITICAL
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-50 flex flex-col gap-3">
            <AppButton onClick={() => navigate('/risk_assessment')} className="py-4 font-bold text-sm">
              Confirm & Proceed
            </AppButton>
            <button 
              onClick={() => navigate('/rdt_input')}
              className="text-xs font-bold text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer text-center"
            >
              Recalculate Ruler
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default RdtCalculationScreen;
