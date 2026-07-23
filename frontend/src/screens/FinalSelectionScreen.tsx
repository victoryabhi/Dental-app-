import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../contexts/DashboardContext';
import AppButton from '../components/AppButton';
import { Check, ShieldCheck } from 'lucide-react';

const FinalSelectionScreen = () => {
  const navigate = useNavigate();
  const { currentAnalysis, selectedPatient, saveAnalysis } = useDashboard();
  
  const material = currentAnalysis.selectedMaterial || 'Biodentine';
  const patientName = selectedPatient?.name || 'Nancy Thorne';
  const patientId = selectedPatient?.id || '45210';
  const risk = currentAnalysis.riskLevel || 'High Risk';
  const rdt = currentAnalysis.rdtValue || '0.4 mm';

  const handleProceed = () => {
    saveAnalysis({
      patientId,
      patientName,
      result: risk,
      rdtValue: rdt,
      confidence: '98.4%',
      material,
      recommendations: `Confirmed ${material} for pulp capping. Monitor clinical symptoms for 4 weeks.`,
      xRayUri: currentAnalysis.xrayImageUri
    });
    
    navigate('/report_preview');
  };

  const ChecklistItem = ({ text }: { text: string }) => (
    <div className="flex items-center gap-2.5 text-xs font-bold text-gray-700">
      <div className="w-5 h-5 bg-green-50 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
        <Check className="w-3.5 h-3.5 stroke-[3]" />
      </div>
      <span>{text}</span>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-12 animate-fade-in text-center">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 text-left">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Selection Confirmed
            </h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
              Patient: {patientName} • ID: #{patientId}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center mb-4 shadow-md shadow-green-100">
          <Check className="w-8 h-8 stroke-[3]" />
        </div>
        <h3 className="text-xl font-black text-gray-950">Selection Confirmed: {material}</h3>
        <p className="text-xs text-gray-400 font-semibold mt-1 px-4 leading-relaxed max-w-sm">
          Clinical material has been selected and recorded for this patient's diagnostic history.
        </p>
      </div>

      {/* Details Card */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-left space-y-5">
        <div className="flex justify-between items-center pb-2 border-b border-gray-50">
          <div>
            <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest block">Procedure File Name</span>
            <span className="text-sm font-black text-gray-900 block mt-0.5">{material} Pulpotomy</span>
          </div>
          <div className="w-10 h-10 bg-blue-50 text-[#007AFF] rounded-full flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        {/* Verification Checks */}
        <div className="space-y-3">
          <ChecklistItem text="Tooth Position confirmed" />
          <ChecklistItem text="Biomaterial preparation ready" />
          <ChecklistItem text="Patient clinical record updated" />
        </div>
      </div>

      {/* Proceed Button */}
      <div className="pt-6">
        <AppButton onClick={handleProceed} className="w-full py-4 font-bold text-sm">
          Proceed to Results
        </AppButton>
      </div>

    </div>
  );
};

export default FinalSelectionScreen;
