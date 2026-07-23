import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../contexts/DashboardContext';
import AppButton from '../components/AppButton';
import AppTextField from '../components/AppTextField';
import { ArrowLeft, Search, ShieldAlert } from 'lucide-react';

const ManualSelectionScreen = () => {
  const navigate = useNavigate();
  const { updateAnalysis } = useDashboard();
  const [query, setQuery] = useState('');
  const [reason, setReason] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('MTA');
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = () => {
    if (!reason.trim()) {
      setError('Please provide a reason for manual override');
      return;
    }
    setError(null);
    updateAnalysis({ selectedMaterial });
    navigate('/final_selection');
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-12 animate-fade-in">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full border-none cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Manual Selection
          </h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
            Override the AI recommendation to select alternative clinical materials for this procedure.
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        
        {/* Search Input */}
        <div className="space-y-2">
          <span className="block text-xs font-black text-gray-900 uppercase tracking-wide">Alternative Materials</span>
          <AppTextField
            placeholder="e.g. Zinc oxide, AH Plus..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            leftIcon={<Search className="w-5 h-5 text-gray-400" />}
          />
        </div>

        {/* Frequently Used */}
        <div className="space-y-2">
          <span className="block text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">Frequently Used</span>
          <div className="grid grid-cols-2 gap-3">
            {['MTA Repair', 'AH Sealer'].map((mat) => {
              const active = selectedMaterial === (mat === 'MTA Repair' ? 'MTA' : 'AH Plus');
              return (
                <button
                  key={mat}
                  type="button"
                  onClick={() => setSelectedMaterial(mat === 'MTA Repair' ? 'MTA' : 'AH Plus')}
                  className={`p-3 rounded-xl border text-xs font-bold uppercase tracking-wide cursor-pointer transition-all ${
                    active 
                      ? 'bg-blue-50 text-[#007AFF] border-blue-200' 
                      : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  {mat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Why are you overriding */}
        <div className="space-y-2">
          <span className="block text-xs font-black text-gray-900 uppercase tracking-wide">Why are you overriding?</span>
          <textarea
            rows={3}
            placeholder="Clinician explanation. Please detail clinical diagnostic justifications..."
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              setError(null);
            }}
            className="block w-full rounded-xl border border-gray-200 focus:ring-blue-500 focus:border-blue-500 py-3 px-4 shadow-sm text-sm bg-gray-50/50"
          />
          {error && <span className="text-[10px] text-red-500 font-bold block">{error}</span>}
        </div>

        {/* References links */}
        <div className="flex gap-2 justify-center pt-2">
          {['Clinical History', 'Patient File', 'Material Comparison'].map((link) => (
            <button
              key={link}
              type="button"
              onClick={() => {
                if (link === 'Material Comparison') navigate('/material_comparison');
              }}
              className="px-3 py-1.5 bg-gray-50 text-gray-500 hover:bg-gray-100 text-[9px] font-black uppercase rounded-lg border border-gray-100 cursor-pointer"
            >
              {link}
            </button>
          ))}
        </div>

        {/* Confirm Override */}
        <div className="pt-4 border-t border-gray-50 flex flex-col gap-3">
          <AppButton onClick={handleConfirm} className="py-4 font-bold text-sm">
            Confirm Override
          </AppButton>
        </div>

      </div>

    </div>
  );
};

export default ManualSelectionScreen;
