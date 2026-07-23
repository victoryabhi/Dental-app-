import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../contexts/DashboardContext';
import AppButton from '../components/AppButton';
import { ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';

const MaterialComparisonScreen = () => {
  const navigate = useNavigate();
  const { updateAnalysis } = useDashboard();

  const handleSelectMaterial = (materialName: string) => {
    updateAnalysis({ selectedMaterial: materialName });
    navigate('/final_selection');
  };

  const AttributeRow = ({ label, biodentine, mta, calciumHyd }: any) => (
    <tr className="border-b border-gray-100 text-xs font-semibold text-gray-700">
      <td className="py-4 font-bold text-gray-500 uppercase text-[9px] tracking-wider">{label}</td>
      <td className="py-4 px-2 text-center text-[#007AFF] font-black">{biodentine}</td>
      <td className="py-4 px-2 text-center text-gray-800">{mta}</td>
      <td className="py-4 px-2 text-center text-gray-400">{calciumHyd}</td>
    </tr>
  );

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
              Material Comparison
            </h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
              Select the most suitable operative material for the pulp procedure.
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-black uppercase tracking-wider text-gray-400">
                <th className="py-3 text-left w-1/4">Attribute</th>
                <th className="py-3 px-2 text-center bg-blue-50/20 text-[#007AFF] rounded-xl w-1/4">Biodentine</th>
                <th className="py-3 px-2 text-center w-1/4">MTA</th>
                <th className="py-3 px-2 text-center w-1/4">Calcium Hyd.</th>
              </tr>
            </thead>
            <tbody>
              <AttributeRow 
                label="Setting Time" 
                biodentine="12 min (Fast)" 
                mta="150 min (Slow)" 
                calciumHyd="Immediate" 
              />
              <AttributeRow 
                label="Biocompatibility" 
                biodentine="Very High" 
                mta="High" 
                calciumHyd="Moderate" 
              />
              <AttributeRow 
                label="Solubility" 
                biodentine="Excellent" 
                mta="Good" 
                calciumHyd="Poor" 
              />
              <AttributeRow 
                label="Sealing Ability" 
                biodentine="Excellent" 
                mta="High" 
                calciumHyd="Moderate" 
              />
              
              {/* Select buttons row */}
              <tr className="text-center">
                <td className="py-6"></td>
                <td className="py-6 px-1.5 bg-blue-50/15">
                  <button 
                    onClick={() => handleSelectMaterial('Biodentine')}
                    className="w-full py-2 bg-[#007AFF] text-white hover:bg-blue-600 font-bold text-[10px] uppercase rounded-xl border-none cursor-pointer"
                  >
                    Select Bio.
                  </button>
                </td>
                <td className="py-6 px-1.5">
                  <button 
                    onClick={() => handleSelectMaterial('MTA')}
                    className="w-full py-2 bg-gray-50 text-gray-700 hover:bg-gray-100 font-bold text-[10px] uppercase rounded-xl border border-gray-200 cursor-pointer"
                  >
                    Select MTA
                  </button>
                </td>
                <td className="py-6 px-1.5">
                  <button 
                    onClick={() => handleSelectMaterial('Calcium Hydroxide')}
                    className="w-full py-2 bg-gray-50 text-gray-700 hover:bg-gray-100 font-bold text-[10px] uppercase rounded-xl border border-gray-200 cursor-pointer"
                  >
                    Select Cal.
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Documentation Disclaimer */}
      <div className="bg-blue-50/30 border border-blue-100 rounded-3xl p-5 flex gap-4 shadow-sm">
        <div className="w-12 h-12 bg-blue-100 text-[#007AFF] rounded-xl flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-extrabold text-gray-900 text-xs uppercase tracking-wide">AI Clinical Documentation</h4>
          <p className="text-[10px] text-gray-400 font-semibold leading-relaxed mt-1">
            Based on the recent diagnosis for Tooth #14 (Pulpitis with decay), Biodentine is highly recommended due to setting time advantages and superior bioactive properties supporting dentin bridge formation.
          </p>
        </div>
      </div>

    </div>
  );
};

export default MaterialComparisonScreen;
