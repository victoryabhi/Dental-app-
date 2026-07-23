import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Brain, Layers, Cpu, Sparkles, CheckCircle } from 'lucide-react';

const ClinicalAiScreen = () => {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const AiFeatureCard = ({ 
    title, 
    desc, 
    icon: Icon, 
    status, 
    active 
  }: { 
    title: string; 
    desc: string; 
    icon: React.ComponentType<any>; 
    status: string; 
    active: boolean 
  }) => (
    <div 
      onClick={() => setActiveModule(title)}
      className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-sm hover:shadow ${
        active 
          ? 'bg-blue-50/20 border-[#007AFF] ring-1 ring-[#007AFF]' 
          : 'bg-white border-gray-100'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
          active ? 'bg-blue-100 text-[#007AFF]' : 'bg-gray-50 text-gray-400'
        }`}>
          <Icon className="w-6 h-6" />
        </div>
        
        <div className="min-w-0 flex-1">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-gray-900 text-sm">{title}</h4>
            <span className="text-[10px] text-green-500 font-bold bg-green-50 px-2 py-0.5 rounded-md uppercase">
              {status}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full border-none cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-gray-900">
          Clinical AI Engine
        </h2>
      </div>

      {/* Hero Header Box */}
      <div className="bg-[#E3F2FD] p-6 rounded-3xl text-center flex flex-col items-center border border-blue-100">
        <Brain className="w-14 h-14 text-[#007AFF] mb-4" />
        <h3 className="text-lg font-bold text-[#007AFF]">
          Advanced Neural Analysis
        </h3>
        <p className="text-xs text-green-500 font-bold mt-1 uppercase tracking-wide flex items-center gap-1">
          <CheckCircle className="w-3.5 h-3.5" />
          System Status: Online & Active
        </p>
      </div>

      {/* Core AI Capabilities Section */}
      <div className="space-y-4 pt-2">
        <div>
          <h4 className="font-bold text-gray-950 text-base">Core AI Capabilities</h4>
          <p className="text-xs text-gray-400">Select a module to view parameters</p>
        </div>

        <AiFeatureCard
          title="Structure Segmentation"
          desc="Deep learning layers identify enamel, dentin, and pulp chamber boundaries."
          icon={Layers}
          status="Ready"
          active={activeModule === "Structure Segmentation"}
        />

        <AiFeatureCard
          title="RDT Calculation"
          desc="Automated spatial mapping calculates Remaining Dentin Thickness."
          icon={Cpu}
          status="Ready"
          active={activeModule === "RDT Calculation"}
        />

        <AiFeatureCard
          title="Predictive Modeling"
          desc="Simulates capping success ratios using historical material trials."
          icon={Sparkles}
          status="Ready"
          active={activeModule === "Predictive Modeling"}
        />
      </div>

    </div>
  );
};

export default ClinicalAiScreen;
