import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard, Patient } from '../contexts/DashboardContext';
import AppTextField from '../components/AppTextField';
import AppButton from '../components/AppButton';
import { Search, SlidersHorizontal, Plus, User, ArrowRight, UserPlus } from 'lucide-react';

const PatientListScreen = () => {
  const navigate = useNavigate();
  const { patients, setSelectedPatient } = useDashboard();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
    navigate(`/patient_details/${patient.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 relative min-h-[calc(100vh-8rem)]">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Patient Records
        </h2>
        <button 
          onClick={() => navigate('/patient_filter')}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl border-none cursor-pointer"
          title="Filter Patients"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <AppTextField
          placeholder="Search by name or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search className="w-5 h-5 text-gray-400" />}
        />
      </div>

      {/* Patients List */}
      {filteredPatients.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          No patients found matching "{searchQuery}"
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              onClick={() => handlePatientClick(patient)}
              className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all cursor-pointer flex items-center justify-between shadow-sm hover:shadow"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-[#007AFF] rounded-full flex items-center justify-center font-bold">
                  {patient.profilePhotoUri ? (
                    <img src={patient.profilePhotoUri} alt="" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <User className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base">
                    {patient.name}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    ID: #{patient.id} • {patient.age} yrs • {patient.gender}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 text-[11px] font-bold rounded-lg ${
                  patient.status === 'High Risk' 
                    ? 'bg-red-50 text-red-500' 
                    : patient.status === 'Moderate' 
                    ? 'bg-yellow-50 text-yellow-600' 
                    : 'bg-green-50 text-green-500'
                }`}>
                  {patient.status}
                </span>
                <ChevronRightIcon />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Patient Dashed Card Action */}
      <div 
        onClick={() => navigate('/add_patient')}
        className="w-full border-2 border-dashed border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/5 transition-all rounded-2xl p-5 flex items-center justify-center gap-3 cursor-pointer select-none py-6 shadow-sm"
      >
        <div className="w-10 h-10 bg-blue-50 text-[#007AFF] rounded-xl flex items-center justify-center">
          <UserPlus className="w-5 h-5" />
        </div>
        <div className="text-left">
          <h4 className="font-extrabold text-gray-900 text-sm">New Patient</h4>
          <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Register a new patient record</p>
        </div>
      </div>



    </div>
  );
};

const ChevronRightIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
  </svg>
);

export default PatientListScreen;
