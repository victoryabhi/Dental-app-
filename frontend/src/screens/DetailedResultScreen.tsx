import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../contexts/DashboardContext';
import AppButton from '../components/AppButton';
import { ArrowLeft, Sparkles, Check, Info } from 'lucide-react';
import toothIllustration from '../assets/tooth_illustration.png';

const DetailedResultScreen = () => {
  const navigate = useNavigate();
  const { currentAnalysis } = useDashboard();
  
  const xray = currentAnalysis.xrayImageUri || toothIllustration;
  const material = currentAnalysis.selectedMaterial || 'Biodentine';
  const risk = currentAnalysis.riskLevel || 'High Risk';
  const rdt = currentAnalysis.rdtValue || '0.4 mm';

  const handleGenerateMap = () => {
    navigate('/report_preview');
  };

  const MetricItem = ({ label, value, isAlert = false, colorClass = "" }: any) => (
    <div className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-none text-xs">
      <span className="font-extrabold text-gray-400 uppercase tracking-wide text-[9px]">{label}</span>
      {isAlert ? (
        <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase ${colorClass}`}>
          {value}
        </span>
      ) : (
        <span className="font-black text-gray-800 uppercase text-[10px]">{value}</span>
      )}
    </div>
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
              Clinical Assessment
            </h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">micro-segmentation details and neural diagnostics</p>
          </div>
        </div>
      </div>

      {/* Split Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Card: Canal Segmentation view */}
        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-4">
          <div className="relative w-full h-[280px] bg-black rounded-2xl overflow-hidden flex items-center justify-center border border-gray-100">
            <img src={toothIllustration} alt="Canal View" className="h-full object-contain opacity-95" />
            <div className="absolute top-4 left-4 bg-red-500 text-white rounded-lg px-2 py-0.5 text-[8px] font-bold">
              Canal Segmentation
            </div>
          </div>
          
          {/* Confidence Slider Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-gray-500">
              <span>AI Confidence</span>
              <span className="text-[#007AFF]">94%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#007AFF]" style={{ width: '94%' }} />
            </div>
          </div>
        </div>

        {/* Right Card: Stats details */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest pb-2 border-b border-gray-50">
              Structural Metrics
            </h3>

            <div>
              <MetricItem label="Risk Assessment" value={risk} isAlert={true} colorClass="bg-red-50 text-red-500" />
              <MetricItem label="Procedural Complexity" value="Moderate" />
              <MetricItem label="Restorative Depth" value="Deep" isAlert={true} colorClass="bg-orange-50 text-orange-500" />
              <MetricItem label="Canal Calcification" value="Minimal" />
            </div>

            {/* Tooth location */}
            <div className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-xl border border-gray-100">
              <div className="w-9 h-9 bg-blue-50 text-[#007AFF] rounded-lg flex items-center justify-center font-extrabold text-sm flex-shrink-0">
                14
              </div>
              <div>
                <span className="text-[8px] text-gray-400 font-bold uppercase block">Tooth Location</span>
                <span className="text-xs font-extrabold text-gray-800 block mt-0.5">Maxillary 1st Molar</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <AppButton onClick={handleGenerateMap} className="py-4 font-bold text-sm">
              Generate Treatment Map
            </AppButton>
          </div>

        </div>

      </div>

      {/* Suggested Plan Card */}
      <div className="bg-blue-50/30 border border-blue-100 rounded-3xl p-6 shadow-sm space-y-4 text-left">
        <div className="flex items-center gap-3 pb-2 border-b border-gray-100/50">
          <Sparkles className="w-5 h-5 text-[#007AFF] flex-shrink-0" />
          <h4 className="font-extrabold text-gray-900 text-xs uppercase tracking-wide">AI Suggested Plan</h4>
        </div>
        <div className="space-y-2 text-xs font-semibold text-gray-500">
          <div className="flex items-start gap-2.5">
            <div className="w-4 h-4 bg-green-50 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span>Indirect pulp capping (MTA/Biodentine) recommended to preserve vitality.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <div className="w-4 h-4 bg-green-50 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span>Perform clinical vitality checks (cold test/EPT) at 2-week follow-up.</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DetailedResultScreen;
