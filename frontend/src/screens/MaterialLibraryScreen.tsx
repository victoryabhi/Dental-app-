import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Layers, CheckCircle } from 'lucide-react';

const MaterialLibraryScreen = () => {
  const navigate = useNavigate();

  const MaterialDetailCard = ({ 
    name, 
    desc, 
    indications, 
    pros, 
    colorClass 
  }: { 
    name: string; 
    desc: string; 
    indications: string; 
    pros: string; 
    colorClass: string 
  }) => (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4 hover:border-blue-100 transition-all">
      <div className="flex items-center gap-3">
        <div className={`w-3.5 h-3.5 rounded-full ${colorClass}`} />
        <h4 className="font-extrabold text-gray-900 text-base">{name}</h4>
      </div>

      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>

      <div className="border-t border-gray-50 pt-3 space-y-2 text-xs">
        <div>
          <span className="text-[10px] text-gray-400 font-extrabold uppercase">Indications</span>
          <p className="text-gray-700 mt-0.5">{indications}</p>
        </div>
        <div className="pt-1">
          <span className="text-[10px] text-gray-400 font-extrabold uppercase">Pros / Strengths</span>
          <p className="text-green-600 font-medium mt-0.5">{pros}</p>
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
          Material Library
        </h2>
      </div>

      <p className="text-sm text-gray-500">
        Clinical database of pulp capping materials and their specific indications.
      </p>

      <div className="space-y-6 pt-2">
        <MaterialDetailCard
          name="Biodentine™"
          desc="Calcium silicate based material. Known for its 'Active Biosilicate Technology'."
          indications="Direct pulp capping, perforation repair, and apexification."
          pros="Bioactive, high biocompatibility, rapid setting time (12 min)."
          colorClass="bg-[#007AFF]"
        />

        <MaterialDetailCard
          name="MTA (Mineral Trioxide Aggregate)"
          desc="A standard bioactive material for vital pulp therapy."
          indications="Indirect pulp capping, root-end filling, and pulpotomy."
          pros="Excellent seal, low solubility, promotes tissue regeneration."
          colorClass="bg-green-500"
        />

        <MaterialDetailCard
          name="Calcium Hydroxide"
          desc="Traditional alkaline material for promoting bridge formation."
          indications="Standard indirect pulp capping in non-critical cases."
          pros="Strong antibacterial action, low cost, easy application."
          colorClass="bg-yellow-500"
        />

        <MaterialDetailCard
          name="Glass Ionomer (GIC)"
          desc="A resin-modified or conventional restorative material."
          indications="Liner or base under permanent restorations."
          pros="Fluoride release, chemical bond to tooth structure."
          colorClass="bg-pink-500"
        />
      </div>

    </div>
  );
};

export default MaterialLibraryScreen;
