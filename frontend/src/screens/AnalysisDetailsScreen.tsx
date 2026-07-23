import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDashboard } from '../contexts/DashboardContext';
import AppButton from '../components/AppButton';
import { ArrowLeft, User, Sparkles, AlertTriangle, FileText, CheckCircle2, Share2 } from 'lucide-react';
import toothIllustration from '../assets/tooth_illustration.png';

const AnalysisDetailsScreen = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { analyses } = useDashboard();
  const analysis = analyses.find(a => a.id === id);

  if (!analysis) {
    return (
      <div className="text-center py-20 text-gray-500 font-bold">
        Analysis record not found.
      </div>
    );
  }

  const isHigh = analysis.result === 'High Risk';
  const isMod = analysis.result === 'Moderate';
  const riskColor = isHigh ? 'text-red-500 bg-red-50' : isMod ? 'text-yellow-600 bg-yellow-50' : 'text-green-500 bg-green-50';

  return (
    <div className="max-w-xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full border-none cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-bold text-gray-900">
            Analysis Details
          </h2>
        </div>
        <button className="p-2 text-gray-500 hover:text-gray-700 bg-transparent border-none cursor-pointer">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Patient Summary Card */}
      <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-50 text-[#007AFF] rounded-xl flex items-center justify-center">
          <User className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-extrabold text-gray-950 text-base">{analysis.patientName}</h3>
          <p className="text-xs text-gray-400 font-bold mt-0.5">Patient ID: #{analysis.patientId}</p>
        </div>
      </div>

      {/* Radiograph Card */}
      <div className="space-y-3">
        <h4 className="font-bold text-gray-900 text-sm">Diagnostic Image</h4>
        <div className="bg-black rounded-3xl h-[200px] overflow-hidden flex items-center justify-center border border-gray-100">
          <img 
            src={analysis.xRayUri || toothIllustration} 
            alt="Radiograph Preview" 
            className="w-full h-full object-contain" 
          />
        </div>
      </div>

      {/* Assessment Results Card */}
      <div className="space-y-3">
        <h4 className="font-bold text-gray-900 text-sm">Assessment Results</h4>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3 text-xs font-semibold text-gray-500">
          <div className="flex justify-between items-center">
            <span>Risk Level</span>
            <span className={`px-2 py-0.5 rounded-md font-bold ${riskColor}`}>
              {analysis.result}
            </span>
          </div>
          <div className="border-t border-gray-50 pt-3 flex justify-between">
            <span>Calculated RDT</span>
            <span className="text-gray-950 font-bold">{analysis.rdtValue}</span>
          </div>
          <div className="border-t border-gray-50 pt-3 flex justify-between">
            <span>AI Confidence</span>
            <span className="text-[#007AFF] font-bold">{analysis.confidence}</span>
          </div>
          <div className="border-t border-gray-50 pt-3 flex justify-between">
            <span>Analysis Date</span>
            <span>{analysis.date}</span>
          </div>
        </div>
      </div>

      {/* Clinical Recommendations Card */}
      <div className="space-y-3">
        <h4 className="font-bold text-gray-900 text-sm">Clinical Recommendations</h4>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex gap-3">
            <FileText className="w-5 h-5 text-[#007AFF] flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-gray-900 text-xs">Clinical Findings</h5>
              <p className="text-[11px] text-gray-400 leading-relaxed mt-0.5">
                Calculated RDT is {analysis.rdtValue}. AI detected significant proximity to pulp chamber.
              </p>
            </div>
          </div>

          <div className="flex gap-3 border-t border-gray-50 pt-4">
            <Sparkles className="w-5 h-5 text-[#007AFF] flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-gray-900 text-xs">AI Advice</h5>
              <p className="text-[11px] text-gray-400 leading-relaxed mt-0.5">
                {analysis.recommendations}
              </p>
            </div>
          </div>

          <div className="flex gap-3 border-t border-gray-50 pt-4">
            <CheckCircle2 className="w-5 h-5 text-[#007AFF] flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-gray-900 text-xs">Recommended Material</h5>
              <p className="text-xs font-bold text-green-500 mt-0.5">
                {analysis.material}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-6">
        <AppButton 
          fullWidth
          onClick={() => navigate('/download_report')}
        >
          Download PDF Report
        </AppButton>

        <AppButton 
          variant="secondary"
          fullWidth
          onClick={() => navigate('/dashboard')}
        >
          Return to Dashboard
        </AppButton>
      </div>

    </div>
  );
};

export default AnalysisDetailsScreen;
