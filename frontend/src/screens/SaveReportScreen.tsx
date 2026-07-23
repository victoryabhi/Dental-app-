import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../contexts/DashboardContext';
import AppButton from '../components/AppButton';
import { ArrowLeft, FolderHeart, HardDrive, Cloud, Check } from 'lucide-react';

const SaveReportScreen = () => {
  const navigate = useNavigate();
  const { selectedPatient } = useDashboard();
  
  const [patientRecord, setPatientRecord] = useState(true);
  const [localStorageCheck, setLocalStorageCheck] = useState(true);
  const [cloudArchive, setCloudArchive] = useState(false);

  const patientId = selectedPatient?.id || '45212';

  const handleSaveAndContinue = () => {
    navigate('/download_report');
  };

  const CheckboxOption = ({ checked, onChange, title, desc, icon: Icon }: any) => (
    <div
      onClick={onChange}
      className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between shadow-sm bg-white ${
        checked 
          ? 'border-[#007AFF] ring-2 ring-blue-500/10' 
          : 'border-gray-100 hover:border-blue-200'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          checked ? 'bg-blue-100 text-[#007AFF]' : 'bg-gray-50 text-gray-400'
        }`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-extrabold text-gray-900 text-sm">{title}</h4>
          <p className="text-[10px] text-gray-400 font-semibold mt-0.5">{desc}</p>
        </div>
      </div>
      
      <div className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 ${
        checked 
          ? 'border-[#007AFF] bg-[#007AFF] text-white' 
          : 'border-gray-300'
      }`}>
        {checked && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
      </div>
    </div>
  );

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
            Save Report
          </h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
            Select where you would like to store the finalized diagnostic analysis for Case #{patientId}.
          </p>
        </div>
      </div>

      {/* Options List */}
      <div className="space-y-4">
        <CheckboxOption 
          checked={patientRecord} 
          onChange={() => setPatientRecord(!patientRecord)} 
          title="Patient Record" 
          desc="Sync directly to patient history database system." 
          icon={FolderHeart} 
        />
        
        <CheckboxOption 
          checked={localStorageCheck} 
          onChange={() => setLocalStorageCheck(!localStorageCheck)} 
          title="Local Storage" 
          desc="Save as DICOM file on this workstation." 
          icon={HardDrive} 
        />
        
        <CheckboxOption 
          checked={cloudArchive} 
          onChange={() => setCloudArchive(!cloudArchive)} 
          title="Cloud Archive" 
          desc="Secure cloud backup with HIPAA compliant logging." 
          icon={Cloud} 
        />
      </div>

      <div className="pt-6">
        <AppButton
          fullWidth
          onClick={handleSaveAndContinue}
          className="py-4 font-bold text-sm"
        >
          Confirm Save
        </AppButton>
      </div>

    </div>
  );
};

export default SaveReportScreen;
