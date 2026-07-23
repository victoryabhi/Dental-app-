import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../contexts/DashboardContext';
import AppTextField from '../components/AppTextField';
import { ArrowLeft, Search, Calendar, ChevronRight } from 'lucide-react';

const AllAnalysesScreen = () => {
  const navigate = useNavigate();
  const { analyses } = useDashboard();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null);

  const riskLevels = ["High Risk", "Moderate", "Low Risk"];

  const filtered = analyses.filter(analysis => {
    const matchesSearch = searchQuery === '' || 
      analysis.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      analysis.patientId.includes(searchQuery);

    const matchesRisk = !selectedRisk || analysis.result === selectedRisk;

    return matchesSearch && matchesRisk;
  });

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
          All Analyses
        </h2>
      </div>

      {/* Search Bar */}
      <AppTextField
        placeholder="Search by Patient Name or ID"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        leftIcon={<Search className="w-5 h-5 text-gray-400" />}
      />

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          onClick={() => setSelectedRisk(null)}
          className={`px-4 py-1.5 text-xs font-bold rounded-full border transition-all cursor-pointer ${
            selectedRisk === null
              ? 'bg-blue-50 text-[#007AFF] border-[#007AFF]'
              : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
          }`}
        >
          All
        </button>
        {riskLevels.map(risk => (
          <button
            key={risk}
            type="button"
            onClick={() => setSelectedRisk(risk)}
            className={`px-4 py-1.5 text-xs font-bold rounded-full border transition-all cursor-pointer whitespace-nowrap ${
              selectedRisk === risk
                ? 'bg-blue-50 text-[#007AFF] border-[#007AFF]'
                : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {risk}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-3xl border border-gray-100 text-gray-400">
            No analyses matches filter.
          </div>
        ) : (
          filtered.map(analysis => {
            const isHigh = analysis.result === 'High Risk';
            const isMod = analysis.result === 'Moderate';
            const riskColor = isHigh ? 'text-red-500 bg-red-50' : isMod ? 'text-yellow-600 bg-yellow-50' : 'text-green-500 bg-green-50';

            return (
              <div
                key={analysis.id}
                onClick={() => navigate(`/analysis_details/${analysis.id}`)}
                className="p-5 bg-white rounded-2xl border border-gray-100 hover:border-blue-100 shadow-sm flex items-center justify-between cursor-pointer transition-all"
              >
                <div className="space-y-1.5">
                  <h4 className="font-extrabold text-gray-900 text-base">{analysis.patientName}</h4>
                  
                  <div className="flex flex-wrap items-center gap-2 text-[10px] text-gray-400 font-bold">
                    <span>ID: #{analysis.patientId}</span>
                    <span>•</span>
                    <span className={`px-2 py-0.5 rounded-md ${riskColor}`}>{analysis.result}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                      <Calendar className="w-3 h-3" />
                      {analysis.date}
                    </span>
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};

export default AllAnalysesScreen;
