import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../contexts/DashboardContext';
import AppButton from '../components/AppButton';
import { ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';
import toothIllustration from '../assets/tooth_illustration.png';

const AnalysisSummaryScreen = () => {
  const navigate = useNavigate();
  const { currentAnalysis, selectedPatient } = useDashboard();
  
  const xray = currentAnalysis.xrayImageUri || toothIllustration;
  const rdt = currentAnalysis.rdtValue || '0.4 mm';
  const risk = currentAnalysis.riskLevel || 'High Risk';
  const patientName = selectedPatient?.name || 'Nancy Thorne';
  const patientId = selectedPatient?.id || '45210';

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
              Analysis Summary
            </h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Reviewing AI findings for Tooth #14 (Upper Left First Molar)</p>
          </div>
        </div>
      </div>

      {/* Split Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Card: Xray Preview */}
        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="relative w-full h-[280px] bg-black rounded-2xl overflow-hidden flex items-center justify-center border border-gray-100">
            <img src={xray} alt="Radiograph Analysis" className="w-full h-full object-cover opacity-90" />
            <div className="absolute bottom-4 left-4 right-4 text-center text-white/80 text-[10px] font-black uppercase tracking-wider bg-black/40 py-1.5 rounded-xl">
              Radiography Scan View
            </div>
          </div>
          <div className="text-center mt-3 text-[9px] font-bold text-gray-400 uppercase">
            Tooth #14 Scan Analysis Complete
          </div>
        </div>

        {/* Right Card: Stats & Findings */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            
            {/* Stats row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                <span className="text-[8px] text-gray-400 font-bold uppercase block">RDT Measurement</span>
                <span className="text-xs font-black text-gray-800 mt-0.5 block">{rdt}</span>
              </div>
              <div className="p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                <span className="text-[8px] text-gray-400 font-bold uppercase block">Status</span>
                <span className="text-xs font-black text-red-500 mt-0.5 block">{risk}</span>
              </div>
            </div>

            {/* Diagnostic Findings */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest pb-2 border-b border-gray-50">
                Diagnostic Findings
              </h4>
              
              <div className="space-y-3">
                <div>
                  <span className="text-[9px] text-[#007AFF] font-bold uppercase tracking-wider block">Pulp Necrosis</span>
                  <p className="text-xs text-gray-500 font-semibold leading-relaxed mt-0.5">
                    Significant radiolucency observed in pulpal ceilings. Biomarkers analysis suggests potential carious fissure invasion based on dense density profiles.
                  </p>
                </div>

                <div>
                  <span className="text-[9px] text-[#007AFF] font-bold uppercase tracking-wider block">Caries Depth</span>
                  <p className="text-xs text-gray-500 font-semibold leading-relaxed mt-0.5">
                    Deep carious lesion progressing into the inner third of dentin.
                  </p>
                </div>
              </div>

            </div>

          </div>

          <div className="pt-6 border-t border-gray-50 flex flex-col gap-3">
            <AppButton onClick={() => navigate('/recommendation_trigger')} className="py-4 font-bold text-sm">
              Proceed to Recommendations
            </AppButton>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AnalysisSummaryScreen;
