import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDashboard, Patient, Analysis } from '../contexts/DashboardContext';
import { ArrowLeft, Clock, Sparkles, Activity, ShieldAlert } from 'lucide-react';
import toothIllustration from '../assets/tooth_illustration.png';

const PatientHistoryScreen = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const { patients, analyses } = useDashboard();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const found = patients.find(p => p.id === patientId);
    if (found) setPatient(found);
  }, [patientId, patients]);

  const patientAnalyses = analyses.filter(a => a.patientId === patientId);
  const latest = patientAnalyses[0];

  if (!patient) return <div className="p-6 text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      
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
              Clinical History
            </h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
              Historical diagnosis record timeline
            </p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-black text-gray-900">{patient.name}</h3>
        <p className="text-xs text-gray-400 font-bold">ID: #{patient.id} • {patient.age} yrs • {patient.gender}</p>
      </div>

      {patientAnalyses.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-gray-100 text-gray-400 text-xs">
          No previous analysis history found.
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Card 1: AI Diagnostic Analysis */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#007AFF]" />
                <h4 className="font-extrabold text-sm text-gray-900 uppercase tracking-wide">AI Diagnostic Analysis</h4>
              </div>
              <span className="text-[10px] text-gray-400 font-bold">{latest?.date || 'Today'}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
              <div className="w-24 h-24 bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                {latest?.xRayUri ? (
                  <img src={latest.xRayUri} alt="" className="w-full h-full object-cover" />
                ) : (
                  <img src={toothIllustration} alt="" className="w-full h-full object-cover" />
                )}
              </div>
              <div className="space-y-2">
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  "Pulpal/periapical sensitivity detected in the upper left quadrant. Visual representation indicates sub-millimeter pulp exposure."
                </p>
                <div className="flex gap-4">
                  <div>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Confidence</span>
                    <span className="text-xs font-black text-gray-900 mt-0.5 block">{latest?.confidence || '98.4%'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">RDT Value</span>
                    <span className="text-xs font-black text-red-500 mt-0.5 block">{latest?.rdtValue || '0.4 mm'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Clinical Recommendation */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
              <Activity className="w-5 h-5 text-purple-600" />
              <h4 className="font-extrabold text-sm text-gray-900 uppercase tracking-wide">Clinical Recommendation</h4>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Recommended Procedure</span>
                <p className="text-xs font-black text-gray-800 mt-0.5">{latest?.recommendations || 'Direct Pulp Capping recommended.'}</p>
              </div>
              <div>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Clinical Notes</span>
                <p className="text-xs text-gray-500 font-semibold leading-relaxed mt-0.5">
                  Non-surgical endodontic treatment guidelines followed. Proximity of caries suggest direct capping protocol to preserve pulp vitality.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Material Protocol */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
              <ShieldAlert className="w-5 h-5 text-green-600" />
              <h4 className="font-extrabold text-sm text-gray-900 uppercase tracking-wide">Material Protocol</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Bioactive Liner</span>
                <p className="text-xs font-black text-gray-800 mt-0.5">{latest?.material || 'Biodentine'}</p>
              </div>
              <div>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Secondary Liner</span>
                <p className="text-xs font-black text-gray-800 mt-0.5">Glass Ionomer (GIC)</p>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default PatientHistoryScreen;
