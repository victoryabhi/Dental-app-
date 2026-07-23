import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../contexts/DashboardContext';
import AppButton from '../components/AppButton';
import { ArrowLeft, CloudUpload, FileText, Check } from 'lucide-react';
import toothIllustration from '../assets/tooth_illustration.png';

const ReportPreviewScreen = () => {
  const navigate = useNavigate();
  const { currentAnalysis, selectedPatient } = useDashboard();
  
  const material = currentAnalysis.selectedMaterial || 'Biodentine';
  const patientName = selectedPatient?.name || 'Sarah J. Miller';
  const patientId = selectedPatient?.id || '45212';
  const rdt = currentAnalysis.rdtValue || '0.4 mm';
  const risk = currentAnalysis.riskLevel || 'High Risk';
  const xray = currentAnalysis.xrayImageUri || toothIllustration;

  const today = new Date().toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' });

  const handleConfirmAndSave = () => {
    navigate('/save_report');
  };

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
              Report Preview
            </h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Review report layout and structure before finalizing</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-3.5 py-1.5 bg-[#E3F2FD] text-[#007AFF] hover:bg-blue-100 font-bold text-xs rounded-xl border-none cursor-pointer">
            Save as PDF
          </button>
          <button className="px-3.5 py-1.5 bg-gray-50 text-gray-500 hover:bg-gray-100 font-bold text-xs rounded-xl border border-gray-200 cursor-pointer">
            Share
          </button>
        </div>
      </div>

      {/* Main Document Container (Paper style) */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-6 md:p-8 space-y-6 max-w-2xl mx-auto">
        
        {/* Document Header */}
        <div className="flex justify-between items-start pb-4 border-b border-gray-100">
          <div>
            <h3 className="font-extrabold text-[#007AFF] text-base">EndoAI Diagnostic Report</h3>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5 block">Clinical Decision Support</span>
          </div>
          <div className="text-right">
            <span className="text-[9px] text-gray-400 font-bold uppercase block">REPORT ID</span>
            <span className="text-xs font-black text-gray-900 block mt-0.5">#REP-2026-45212</span>
          </div>
        </div>

        {/* Client Metadata block */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-gray-500">
          <div>
            <span className="text-gray-400 block text-[9px] uppercase tracking-wider">Patient Name</span>
            <span className="text-gray-900 font-bold block mt-0.5">{patientName}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9px] uppercase tracking-wider">Operator Doctor</span>
            <span className="text-gray-900 font-bold block mt-0.5">Dr. Alex Smith</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9px] uppercase tracking-wider">Clinical Facility</span>
            <span className="text-gray-900 font-bold block mt-0.5">Dental Research Lab</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[9px] uppercase tracking-wider">Date</span>
            <span className="text-gray-900 font-bold block mt-0.5">{today}</span>
          </div>
        </div>

        {/* Side-by-Side Diagnostic Images */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black rounded-2xl h-36 overflow-hidden flex items-center justify-center border border-gray-100">
            <img src={xray} alt="Scan Preview" className="w-full h-full object-cover" />
          </div>
          <div className="bg-black rounded-2xl h-36 overflow-hidden flex items-center justify-center border border-gray-100">
            <img src={toothIllustration} alt="AI Mapping overlay" className="w-full h-full object-cover opacity-75" />
          </div>
        </div>

        {/* Metrics details table */}
        <div className="border-t border-b border-gray-100 py-4 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-gray-500">
            <span>Calculated RDT</span>
            <span className="text-red-500 font-black">{rdt} (Critical)</span>
          </div>
          <div className="flex justify-between items-center text-xs font-bold text-gray-500">
            <span>Pulp Exposure Probability</span>
            <span className="text-red-500 font-black">94.0%</span>
          </div>
          <div className="flex justify-between items-center text-xs font-bold text-gray-500">
            <span>Selected Material</span>
            <span className="text-[#007AFF] font-black">{material}</span>
          </div>
        </div>

        {/* Clinical justification */}
        <div className="space-y-2">
          <span className="text-[9px] text-[#007AFF] font-bold uppercase tracking-wider block">Clinical justification</span>
          <p className="text-xs text-gray-500 font-semibold leading-relaxed">
            Non-surgical pulp capping procedure recommended for deep carious lesions. Biodentine application on pulpal floor shows superior sealing, minimal micro-leakage, and accelerates tertiary dentin bridge formation.
          </p>
        </div>

        {/* Signatures block */}
        <div className="flex justify-between items-end pt-8 border-t border-gray-100">
          <div className="text-left">
            <span className="text-[8px] text-gray-400 font-bold block">OPERATING CLINICIAN</span>
            <div className="h-8 flex items-center justify-start italic font-serif text-gray-800 text-sm">
              Alex Smith, DMD
            </div>
            <span className="text-[10px] text-gray-400 font-bold block mt-1 border-t border-gray-100 pt-1 w-32">Dr. Alex Smith</span>
          </div>
          <div className="text-right">
            <span className="text-[8px] text-gray-400 font-bold block">VERIFIED SYSTEM</span>
            <div className="h-8 flex items-center justify-end text-green-600 text-xs font-bold">
              EndoAI-Engine v2.4
            </div>
            <span className="text-[10px] text-gray-400 font-bold block mt-1 border-t border-gray-100 pt-1 w-32 ml-auto">System Signature</span>
          </div>
        </div>

      </div>

      {/* Action Button */}
      <div className="pt-4 flex justify-center">
        <AppButton onClick={handleConfirmAndSave} className="w-full max-w-md py-4 font-bold text-sm">
          Confirm and Send to Patient
        </AppButton>
      </div>

    </div>
  );
};

export default ReportPreviewScreen;
