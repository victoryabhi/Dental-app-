import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../contexts/DashboardContext';
import AppTextField from '../components/AppTextField';
import AppButton from '../components/AppButton';
import { ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';
import toothIllustration from '../assets/tooth_illustration.png';

const RdtInputScreen = () => {
  const navigate = useNavigate();
  const { currentAnalysis, updateAnalysis } = useDashboard();
  
  const [rdtVal, setRdtVal] = useState(currentAnalysis.rdtValue ? parseFloat(currentAnalysis.rdtValue) : 1.5);
  const [dentalPreset, setDentalPreset] = useState('Pre-molar');
  const [error, setError] = useState<string | null>(null);

  const handleContinue = () => {
    if (rdtVal <= 0 || isNaN(rdtVal)) {
      setError('Please enter a valid thickness');
      return;
    }
    setError(null);
    updateAnalysis({ 
      rdtValue: `${rdtVal} mm`, 
      calculatedRdt: rdtVal,
      riskLevel: rdtVal < 0.5 ? 'High Risk' : rdtVal < 1.5 ? 'Moderate' : 'Low Risk'
    });
    navigate('/input_validation');
  };

  const getRestorationAssessment = () => {
    if (rdtVal < 0.5) return { text: "Critical Risk. Pulp exposure likely or imminent. High-performance bioceramic liner required.", color: "text-red-600 bg-red-50 border-red-100" };
    if (rdtVal < 1.5) return { text: "Moderate Risk. Indirect capping indicated. Bioactive liner (Biodentine/MTA) recommended.", color: "text-yellow-600 bg-yellow-50 border-yellow-100" };
    return { text: "Current RDT provides adequate biomaterial protection for the pulp.", color: "text-green-600 bg-green-50/50 border-green-100" };
  };

  const assessment = getRestorationAssessment();

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
              RDT Measurement Input
            </h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">estimate remaining dentin thickness values</p>
          </div>
        </div>
      </div>

      {/* Split Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Card: Reference Diagram */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-gray-50">
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Reference Diagram</h3>
            <span className="text-[9px] text-gray-400 font-bold uppercase">Anatomy Guide</span>
          </div>

          <div className="relative w-full h-52 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center p-4">
            <img 
              src={toothIllustration} 
              alt="Tooth Anatomy Cross Section Diagram" 
              className="h-full object-contain" 
            />
            {/* Guide overlay markers */}
            <div className="absolute bottom-4 left-4 bg-black/60 text-white rounded-lg px-2 py-1 text-[8px] font-bold">
              Target Area: Dentin Wall
            </div>
          </div>
        </div>

        {/* Right Card: Ruler Settings */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6 flex flex-col justify-between">
          
          <div className="space-y-4">
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest pb-2 border-b border-gray-50">
              Ruler Value
            </h3>

            {/* Input & Slider */}
            <div className="space-y-4">
              <div className="flex gap-4 items-center">
                <div className="w-2/3">
                  <input 
                    type="range" 
                    min="0.2" 
                    max="2.0" 
                    step="0.1"
                    value={rdtVal} 
                    onChange={(e) => setRdtVal(parseFloat(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#007AFF]"
                  />
                  <div className="flex justify-between text-[9px] text-gray-400 font-bold uppercase mt-1">
                    <span>0.2 mm</span>
                    <span>1.1 mm</span>
                    <span>2.0 mm</span>
                  </div>
                </div>
                <div className="w-1/3 flex items-center gap-1.5 border border-gray-200 rounded-xl px-3 py-2 bg-gray-50/50">
                  <input 
                    type="number" 
                    step="0.1" 
                    min="0.1" 
                    max="3.0"
                    value={rdtVal} 
                    onChange={(e) => setRdtVal(parseFloat(e.target.value) || 0)}
                    className="w-full bg-transparent text-sm font-black text-gray-950 focus:outline-none text-right"
                  />
                  <span className="text-xs text-gray-400 font-bold">mm</span>
                </div>
              </div>
            </div>

            {/* Dental Presets */}
            <div className="space-y-2">
              <span className="block text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">Dental Presets</span>
              <div className="flex gap-2">
                {['Pre-molar', 'Molar'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setDentalPreset(preset)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase border transition-colors cursor-pointer ${
                      dentalPreset === preset
                        ? 'bg-[#E3F2FD] text-[#007AFF] border-blue-200'
                        : 'bg-white text-gray-400 border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <AppButton onClick={handleContinue} className="py-3 px-8 font-bold text-xs">
              Continuous to Analysis →
            </AppButton>
          </div>
        </div>

      </div>

      {/* Estimation Assessment Banner */}
      <div className={`border rounded-3xl p-5 flex gap-4 ${assessment.color} shadow-sm`}>
        <div className="w-12 h-12 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 text-current">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-extrabold text-xs uppercase tracking-wide">Estimated Restoration Line</h4>
          <p className="text-[10px] leading-relaxed font-semibold mt-1 opacity-90">
            {assessment.text}
          </p>
        </div>
      </div>

    </div>
  );
};

export default RdtInputScreen;
