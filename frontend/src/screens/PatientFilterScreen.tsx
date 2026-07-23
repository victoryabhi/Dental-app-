import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../contexts/DashboardContext';
import { ArrowLeft, Sliders } from 'lucide-react';
import AppButton from '../components/AppButton';

const PatientFilterScreen = () => {
  const navigate = useNavigate();
  const { patients } = useDashboard();
  
  const [highRisk, setHighRisk] = useState(true);
  const [modRisk, setModRisk] = useState(true);
  const [lowRisk, setLowRisk] = useState(false);
  const [timeframe, setTimeframe] = useState(12); // months range
  
  const [selectedProcedures, setSelectedProcedures] = useState<string[]>(['Root Canal Therapy', 'Pulp Capping']);
  const [materials, setMaterials] = useState({
    biodentine: true,
    bioceramic: false,
    mta: true,
    zoe: false,
    ahplus: false
  });

  const toggleProcedure = (proc: string) => {
    if (selectedProcedures.includes(proc)) {
      setSelectedProcedures(selectedProcedures.filter(p => p !== proc));
    } else {
      setSelectedProcedures([...selectedProcedures, proc]);
    }
  };

  const handleApply = () => {
    navigate('/patient_list');
  };

  const handleReset = () => {
    setHighRisk(true);
    setModRisk(true);
    setLowRisk(true);
    setTimeframe(12);
    setSelectedProcedures([]);
    setMaterials({
      biodentine: false,
      bioceramic: false,
      mta: false,
      zoe: false,
      ahplus: false
    });
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full border-none cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-xl font-black text-gray-900">
            Refine Patient List
          </h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
            Adjust parameters to filter clinical records and diagnostic views.
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        
        {/* Risk Classification Section */}
        <div className="space-y-3">
          <span className="block text-xs font-black text-gray-900 uppercase tracking-wide">Risk Classification</span>
          <div className="space-y-2">
            <label className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl cursor-pointer">
              <span className="flex items-center gap-3 text-xs font-bold text-gray-700">
                <input 
                  type="checkbox" 
                  checked={highRisk} 
                  onChange={() => setHighRisk(!highRisk)}
                  className="w-4 h-4 rounded text-[#007AFF] border-gray-300 focus:ring-[#007AFF]" 
                />
                High Risk
              </span>
              <span className="px-2 py-0.5 bg-red-50 text-red-500 text-[9px] font-black uppercase rounded-lg">Critical</span>
            </label>

            <label className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl cursor-pointer">
              <span className="flex items-center gap-3 text-xs font-bold text-gray-700">
                <input 
                  type="checkbox" 
                  checked={modRisk} 
                  onChange={() => setModRisk(!modRisk)}
                  className="w-4 h-4 rounded text-[#007AFF] border-gray-300 focus:ring-[#007AFF]" 
                />
                Moderate Risk
              </span>
              <span className="px-2 py-0.5 bg-yellow-50 text-yellow-600 text-[9px] font-black uppercase rounded-lg">Caution</span>
            </label>

            <label className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl cursor-pointer">
              <span className="flex items-center gap-3 text-xs font-bold text-gray-700">
                <input 
                  type="checkbox" 
                  checked={lowRisk} 
                  onChange={() => setLowRisk(!lowRisk)}
                  className="w-4 h-4 rounded text-[#007AFF] border-gray-300 focus:ring-[#007AFF]" 
                />
                Low Risk
              </span>
              <span className="px-2 py-0.5 bg-green-50 text-green-500 text-[9px] font-black uppercase rounded-lg">Stable</span>
            </label>
          </div>
        </div>

        {/* Timeframe Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black text-gray-900 uppercase tracking-wide">Timeframe</span>
            <span className="text-xs font-bold text-[#007AFF]">{timeframe} Mos</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="24" 
            value={timeframe} 
            onChange={(e) => setTimeframe(parseInt(e.target.value))}
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#007AFF]"
          />
          <div className="flex justify-between text-[9px] text-gray-400 font-bold uppercase">
            <span>1 Mo</span>
            <span>12 Mos</span>
            <span>24 Mos</span>
          </div>
        </div>

        {/* Procedures Section */}
        <div className="space-y-3">
          <span className="block text-xs font-black text-gray-900 uppercase tracking-wide">Diagnostic Category</span>
          <div className="flex flex-wrap gap-2">
            {['Root Canal Therapy', 'Retreatment', 'Apicoectomy', 'Pulp Capping', 'Emergency Pulpotomy'].map((proc) => {
              const active = selectedProcedures.includes(proc);
              return (
                <button
                  key={proc}
                  type="button"
                  onClick={() => toggleProcedure(proc)}
                  className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase border transition-colors cursor-pointer ${
                    active 
                      ? 'bg-blue-50 text-[#007AFF] border-blue-200' 
                      : 'bg-white text-gray-400 border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  {proc}
                </button>
              );
            })}
          </div>
        </div>

        {/* Materials Selection */}
        <div className="space-y-3">
          <span className="block text-xs font-black text-gray-900 uppercase tracking-wide">Biomaterial Preferences</span>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center gap-3 text-xs font-bold text-gray-700 cursor-pointer">
              <input 
                type="checkbox" 
                checked={materials.biodentine} 
                onChange={() => setMaterials({...materials, biodentine: !materials.biodentine})}
                className="w-4 h-4 rounded text-[#007AFF] border-gray-300 focus:ring-[#007AFF]" 
              />
              Biodentine
            </label>
            <label className="flex items-center gap-3 text-xs font-bold text-gray-700 cursor-pointer">
              <input 
                type="checkbox" 
                checked={materials.bioceramic} 
                onChange={() => setMaterials({...materials, bioceramic: !materials.bioceramic})}
                className="w-4 h-4 rounded text-[#007AFF] border-gray-300 focus:ring-[#007AFF]" 
              />
              Bioceramic Sealer
            </label>
            <label className="flex items-center gap-3 text-xs font-bold text-gray-700 cursor-pointer">
              <input 
                type="checkbox" 
                checked={materials.mta} 
                onChange={() => setMaterials({...materials, mta: !materials.mta})}
                className="w-4 h-4 rounded text-[#007AFF] border-gray-300 focus:ring-[#007AFF]" 
              />
              MTA
            </label>
            <label className="flex items-center gap-3 text-xs font-bold text-gray-700 cursor-pointer">
              <input 
                type="checkbox" 
                checked={materials.zoe} 
                onChange={() => setMaterials({...materials, zoe: !materials.zoe})}
                className="w-4 h-4 rounded text-[#007AFF] border-gray-300 focus:ring-[#007AFF]" 
              />
              Zinc Oxide (ZOE)
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-50">
          <AppButton 
            type="button" 
            variant="outline" 
            onClick={handleReset}
            className="w-1/2 py-3.5 bg-white hover:bg-gray-50 border-gray-200 text-gray-500 font-bold"
          >
            Reset
          </AppButton>
          <AppButton type="button" onClick={handleApply} className="w-1/2 py-3.5 font-bold">
            Apply Filters
          </AppButton>
        </div>

      </div>

    </div>
  );
};

export default PatientFilterScreen;
