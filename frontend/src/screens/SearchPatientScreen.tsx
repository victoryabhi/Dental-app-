import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard, Patient } from '../contexts/DashboardContext';
import AppTextField from '../components/AppTextField';
import { Search, ArrowLeft, User, Clock, ChevronRight } from 'lucide-react';

const SearchPatientScreen = () => {
  const navigate = useNavigate();
  const { patients, setSelectedPatient } = useDashboard();
  const [query, setQuery] = useState('');

  const recentSearches = [
    { id: "45210", name: "Robert Chen" },
    { id: "45212", name: "Sarah Jenkins" },
    { id: "45211", name: "Michael Melco" }
  ];

  const results = query.trim() === '' ? patients : patients.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.id.toLowerCase().includes(query.toLowerCase())
  );

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    navigate(`/patient_details/${patient.id}`);
  };

  const handleRecentClick = (name: string) => {
    setQuery(name);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
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
            Search Patient Screen
          </h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Search patient files by name or index ID</p>
        </div>
      </div>

      <div className="relative">
        <AppTextField
          placeholder="Search patients by name, ID, or procedure..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          leftIcon={<Search className="w-5 h-5 text-gray-400" />}
          autoFocus
        />
      </div>

      {/* Split Layout Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Side: Recent Searches */}
        <div className="md:col-span-1 bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest pb-2 border-b border-gray-50 flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            Recent
          </h3>
          <div className="space-y-2">
            {recentSearches.map((rec) => (
              <div 
                key={rec.id}
                onClick={() => handleRecentClick(rec.name)}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors"
              >
                <span className="text-xs font-extrabold text-gray-700">{rec.name}</span>
                <span className="text-[9px] font-bold text-gray-400">#{rec.id}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Matching Patients */}
        <div className="md:col-span-2 bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest pb-2 border-b border-gray-50">
            {query.trim() === '' ? 'All Patients' : 'Matching Patients'}
          </h3>

          <div className="space-y-3">
            {results.map((patient) => (
              <div
                key={patient.id}
                onClick={() => handlePatientSelect(patient)}
                className="bg-gray-50/50 hover:bg-blue-50/20 p-4 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 text-[#007AFF] rounded-full flex items-center justify-center font-extrabold">
                    {patient.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-sm">{patient.name}</h4>
                    <p className="text-[10px] text-gray-400 font-semibold mt-0.5">ID: #{patient.id} • {patient.gender} • {patient.age} yrs</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 text-[9px] font-black uppercase rounded-lg ${
                    patient.status === 'High Risk' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'
                  }`}>
                    {patient.status}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}

            {results.length === 0 && (
              <div className="text-center py-12 text-gray-400 text-xs font-semibold">
                No patient found matching "{query}"
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default SearchPatientScreen;
