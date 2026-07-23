import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDashboard, Patient, Analysis } from '../contexts/DashboardContext';
import AppButton from '../components/AppButton';
import { ArrowLeft, Edit, Trash2, Calendar, FileText, Image as ImageIcon, Sparkles } from 'lucide-react';
import toothIllustration from '../assets/tooth_illustration.png';

const PatientDetailsScreen = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const { patients, analyses, deletePatient, setSelectedPatient } = useDashboard();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const found = patients.find(p => p.id === patientId);
    if (found) {
      setPatient(found);
    }
  }, [patientId, patients]);

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <p>Patient record not found.</p>
        <AppButton onClick={() => navigate('/patient_list')} className="mt-4">
          Back to Records
        </AppButton>
      </div>
    );
  }

  // Filter analyses for this patient
  const patientAnalyses = analyses.filter(a => a.patientId === patientId);
  const latestAnalysis = patientAnalyses[0];

  const handleDelete = () => {
    deletePatient(patient.id);
    setShowDeleteModal(false);
    navigate('/patient_list');
  };

  const handleStartAnalysis = () => {
    setSelectedPatient(patient);
    navigate('/upload_option');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      
      {/* Top App Bar */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/patient_list')} 
            className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full border-none cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-xl font-black text-gray-900">Patient File</h2>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Manage patient details and radiographs</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => navigate(`/edit_patient/${patient.id}`)}
            className="p-2 text-[#007AFF] hover:bg-blue-50 rounded-xl border-none cursor-pointer"
            title="Edit Patient"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setShowDeleteModal(true)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-xl border-none cursor-pointer"
            title="Delete Patient"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Patient Profile Header Card */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
        <div className="w-20 h-20 bg-[#E3F2FD] rounded-full flex items-center justify-center text-[#007AFF] text-3xl font-extrabold flex-shrink-0">
          {patient.profilePhotoUri ? (
            <img src={patient.profilePhotoUri} alt="" className="w-full h-full object-cover rounded-full" />
          ) : (
            patient.name.charAt(0).toUpperCase()
          )}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl font-extrabold text-gray-900">
            {patient.name}
          </h3>
          <p className="text-xs text-gray-400 mt-1 font-semibold">
            ID: #{patient.id} • {patient.age} years old • {patient.gender}
          </p>
          <p className="text-xs text-gray-500 mt-2 font-medium">
            Contact: {patient.phone}
          </p>
          <p className="text-xs text-gray-500 font-medium">
            Clinical History: {patient.history || 'No major clinical issues'}
          </p>
        </div>
      </div>

      {/* Blue Clinical Status Highlights Banner Card */}
      <div className="bg-[#007AFF] text-white p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <span className="text-[10px] text-blue-100 font-bold uppercase tracking-wider">CLINICAL STATUS</span>
          <h3 className="text-lg font-black text-white mt-1">
            {patient.status === 'High Risk' 
              ? 'Complex Deep Carious Therapy Required' 
              : patient.status === 'Moderate' 
              ? 'Moderate Pulpal Involvement Detected' 
              : 'Standard Restoration Suitable'}
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[9px] text-blue-100 font-bold uppercase tracking-wider block">Confidence</span>
            <span className="text-2xl font-black text-white leading-none block mt-1">{latestAnalysis?.confidence || '98.4%'}</span>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center border border-white/25">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Recent Radiographs Gallery */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-extrabold text-gray-900 uppercase tracking-wide">
            Recent Radiographs
          </h4>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">3 Views Available</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Thumb 1 */}
          <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm space-y-2">
            <div className="w-full h-28 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center">
              {patient.latestRadiographUri ? (
                <img src={patient.latestRadiographUri === "/src/assets/tooth_illustration.png" ? toothIllustration : patient.latestRadiographUri} alt="" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-8 h-8 text-gray-300" />
              )}
            </div>
            <div className="text-center">
              <p className="font-extrabold text-gray-800 text-xs">Periapical View - #14</p>
              <p className="text-[9px] text-gray-400 font-semibold mt-0.5">Radiograph View</p>
            </div>
          </div>

          {/* Thumb 2 */}
          <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm space-y-2">
            <div className="w-full h-28 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center text-gray-300 font-black text-xs uppercase tracking-wider">
              CBCT SECTION
            </div>
            <div className="text-center">
              <p className="font-extrabold text-gray-800 text-xs">CBCT Axial Section</p>
              <p className="text-[9px] text-gray-400 font-semibold mt-0.5">3D Render</p>
            </div>
          </div>

          {/* Thumb 3 */}
          <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm space-y-2">
            <div className="w-full h-28 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center text-gray-300 font-black text-xs uppercase tracking-wider">
              BITE-WING
            </div>
            <div className="text-center">
              <p className="font-extrabold text-gray-800 text-xs">Bite-wing Right</p>
              <p className="text-[9px] text-gray-400 font-semibold mt-0.5">Molar View</p>
            </div>
          </div>

        </div>

        <div className="pt-2 flex justify-end">
          <AppButton onClick={handleStartAnalysis} className="flex items-center gap-2 py-3 px-6 font-bold text-xs">
            <Sparkles className="w-4 h-4" />
            Start AI Analysis
          </AppButton>
        </div>
      </div>

      {/* Delete Patient Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-left shadow-xl border border-gray-100">
            <h3 className="text-lg font-black text-gray-900 mb-2">Delete Record</h3>
            <p className="text-xs text-gray-400 font-semibold mb-6">Are you sure you want to permanently delete this patient record? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 text-xs font-bold text-gray-400 bg-transparent border-none cursor-pointer">Cancel</button>
              <button onClick={handleDelete} className="px-5 py-2.5 text-xs font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl border-none cursor-pointer">Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PatientDetailsScreen;
