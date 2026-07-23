import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDashboard, Patient, Analysis } from '../contexts/DashboardContext';
import AppButton from '../components/AppButton';
import { ArrowLeft, User, AlertTriangle, ShieldCheck, Heart, Activity } from 'lucide-react';
import toothIllustration from '../assets/tooth_illustration.png';

const PatientSummaryScreen = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const { patients, analyses } = useDashboard();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const found = patients.find(p => p.id === patientId);
    if (found) setPatient(found);
  }, [patientId, patients]);

  const patientAnalyses = analyses.filter(a => a.patientId === patientId);
  const latestAnalysis = patientAnalyses[0];

  if (!patient) return <div className="p-6 text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
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
            <h2 className="text-xl font-black text-gray-900">
              Patient Summary
            </h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Clinical diagnostic overview file</p>
          </div>
        </div>
        <button 
          onClick={() => navigate(`/patient_history/${patient.id}`)}
          className="px-4 py-2 bg-[#E3F2FD] text-[#007AFF] hover:bg-blue-100 font-bold text-xs rounded-xl border-none cursor-pointer"
        >
          View Timeline
        </button>
      </div>

      {/* Main Grid: Left Column (Vitals & Summary), Right Column (Xray & Details) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Side: Summary & Insights Grid (2 columns span) */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Header patient card with status banner */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#E3F2FD] rounded-full flex items-center justify-center text-[#007AFF] text-xl font-black flex-shrink-0">
                  {patient.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900 text-lg">{patient.name}</h3>
                  <p className="text-[10px] text-gray-400 font-semibold mt-0.5">ID: #{patient.id} • {patient.gender} • {patient.age} yrs</p>
                </div>
              </div>
              <div>
                <span className="px-3.5 py-1.5 bg-red-50 text-red-500 text-[10px] font-black uppercase rounded-lg border border-red-100 flex items-center gap-1.5 animate-pulse">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Urgent Action Needed
                </span>
              </div>
            </div>

            {/* Warning Card */}
            <div className="bg-red-50/50 border border-red-100 rounded-2xl p-4 flex gap-3 text-red-700">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-xs uppercase tracking-wide">Critical Alert</h4>
                <p className="text-[10px] text-gray-500 font-semibold leading-relaxed mt-0.5">
                  Root fracture suspected (Tooth #15); Proximity to maxillary sinus requires careful validation before any direct capping procedure.
                </p>
              </div>
            </div>
          </div>

          {/* Grid of AI Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-1">
              <span className="text-[9px] text-[#007AFF] font-bold uppercase tracking-widest block">AI GUIDED INSIGHTS</span>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed pt-1">
                Pulpal/periapical sensitivity in the upper right quadrant. Visual verification shows sub-millimeter pulp exposure.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2">
              <span className="text-[9px] text-purple-600 font-bold uppercase tracking-widest block">RDT CONFIDENCE</span>
              <p className="text-2xl font-black text-gray-900 leading-none">97.0%</p>
              <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider">Metric accuracy standard</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[9px] text-green-600 font-bold uppercase tracking-widest block">CBCT Case Analysis</span>
                <p className="text-xs font-black text-gray-800 mt-1">Completed</p>
              </div>
              <span className="text-[9px] text-gray-400 font-semibold">1m ago</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest block">Clinical History Audit</span>
                <p className="text-xs font-black text-gray-800 mt-1">Full profile</p>
              </div>
              <button 
                onClick={() => navigate(`/patient_history/${patient.id}`)}
                className="text-xs font-bold text-[#007AFF] bg-blue-50 px-3 py-1 rounded-lg border-none cursor-pointer hover:bg-blue-100"
              >
                View
              </button>
            </div>

          </div>

          {/* Vitals & Benchmarks Card */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest pb-2 border-b border-gray-50">
              Clinical Benchmarks
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                <span className="text-[8px] text-gray-400 font-bold uppercase block">Blood Pressure</span>
                <span className="text-xs font-black text-red-500 mt-0.5 block">135/85</span>
                <span className="text-[8px] text-gray-400 font-semibold block mt-0.5">Elevated</span>
              </div>
              <div className="p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                <span className="text-[8px] text-gray-400 font-bold uppercase block">HbA1c</span>
                <span className="text-xs font-black text-orange-500 mt-0.5 block">6.8%</span>
                <span className="text-[8px] text-gray-400 font-semibold block mt-0.5">Pre-Diabetic</span>
              </div>
              <div className="p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                <span className="text-[8px] text-gray-400 font-bold uppercase block">Oxygen Sat.</span>
                <span className="text-xs font-black text-green-600 mt-0.5 block">98%</span>
                <span className="text-[8px] text-gray-400 font-semibold block mt-0.5">Stable</span>
              </div>
              <div className="p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                <span className="text-[8px] text-gray-400 font-bold uppercase block">Heart Rate</span>
                <span className="text-xs font-black text-gray-800 mt-0.5 block">72 BPM</span>
                <span className="text-[8px] text-gray-400 font-semibold block mt-0.5">Normal</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Radiograph Card (1 column span) */}
        <div className="md:col-span-1 bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest pb-2 border-b border-gray-50">
              Latest Radiograph
            </h3>
            <div className="w-full h-44 bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center border border-gray-100 mt-4">
              {patient.latestRadiographUri ? (
                <img src={patient.latestRadiographUri === "/src/assets/tooth_illustration.png" ? toothIllustration : patient.latestRadiographUri} alt="" className="w-full h-full object-cover" />
              ) : (
                <img src={toothIllustration} alt="" className="w-full h-full object-cover" />
              )}
            </div>
            <div className="mt-4 space-y-2">
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">IMAGE COMPLIANCE</span>
              <div className="flex items-center gap-1.5 text-green-600 text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
                Validated Secure DICOM
              </div>
            </div>
          </div>
          
          <AppButton 
            onClick={() => navigate('/upload_option')}
            className="py-3.5 font-bold text-xs mt-6"
          >
            Start Analysis
          </AppButton>
        </div>

      </div>

    </div>
  );
};

export default PatientSummaryScreen;
