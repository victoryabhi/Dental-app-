import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../contexts/DashboardContext';
import AppButton from '../components/AppButton';
import { ArrowLeft, Sparkles, Check } from 'lucide-react';

const MaterialSelectionScreen = () => {
  const navigate = useNavigate();
  const { currentAnalysis, updateAnalysis } = useDashboard();
  const [selected, setSelected] = useState('Biodentine');

  const materials = [
    { 
      name: 'Biodentine', 
      tag: 'AI Recommendation', 
      desc: 'Bioactive dentin substitute for root repair.', 
      time: '12 min' 
    },
    { 
      name: 'MTA', 
      desc: 'Mineral Trioxide Aggregate for sealing.', 
      time: '150 min' 
    },
    { 
      name: 'Calcium Hydroxide', 
      desc: 'Traditional antibacterial liner/base.', 
      time: 'Immediate' 
    },
    { 
      name: 'Glass Ionomer', 
      desc: 'Secondary liner and base restorative.', 
      time: '5 min' 
    }
  ];

  const handleConfirm = () => {
    updateAnalysis({ selectedMaterial: selected });
    navigate('/ai_recommended');
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-12 animate-fade-in">
      
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
              Material Selection
            </h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
              Choose the optimal lining/fill material for the capping procedure.
            </p>
          </div>
        </div>
      </div>

      {/* See AI Suggestion Helper Link */}
      <div className="flex justify-between items-center bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#007AFF] animate-pulse" />
          <span className="text-xs font-bold text-gray-700">See AI Suggestion</span>
        </div>
        <button 
          onClick={() => navigate('/ai_recommended')} 
          className="text-xs font-bold text-[#007AFF] hover:underline bg-transparent border-none cursor-pointer"
        >
          Optimized for Tooth #14
        </button>
      </div>

      {/* Materials List */}
      <div className="space-y-3">
        {materials.map((mat) => {
          const isSelected = selected === mat.name;
          return (
            <div
              key={mat.name}
              onClick={() => setSelected(mat.name)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between shadow-sm bg-white ${
                isSelected 
                  ? 'border-[#007AFF] ring-2 ring-blue-500/10' 
                  : 'border-gray-100 hover:border-blue-200'
              }`}
            >
              <div className="space-y-1 pr-4 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-extrabold text-gray-900 text-sm">{mat.name}</h4>
                  {mat.tag && (
                    <span className="px-2 py-0.5 bg-green-50 text-green-600 border border-green-100 rounded text-[8px] font-black uppercase tracking-wider">
                      {mat.tag}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-gray-400 font-semibold leading-relaxed">
                  {mat.desc}
                </p>
                <span className="text-[9px] text-[#007AFF] font-bold uppercase tracking-wider block pt-0.5">
                  Setting Time: {mat.time}
                </span>
              </div>

              {/* Radio check circle */}
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                isSelected 
                  ? 'border-[#007AFF] bg-[#007AFF] text-white' 
                  : 'border-gray-300'
              }`}>
                {isSelected && <Check className="w-3 h-3 stroke-[3.5]" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirm Button */}
      <div className="pt-4">
        <AppButton onClick={handleConfirm} className="w-full py-4 font-bold text-sm">
          Confirm Selection
        </AppButton>
      </div>

    </div>
  );
};

export default MaterialSelectionScreen;
