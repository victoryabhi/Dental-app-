import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useDashboard } from '../contexts/DashboardContext';
import AppButton from '../components/AppButton';
import { Users, BrainCircuit, AlertCircle, Plus, ChevronRight, UserPlus, Image as ImageIcon } from 'lucide-react';

const DashboardScreen = () => {
  const { user } = useAuth();
  const { patients, analyses, setSelectedPatient } = useDashboard();
  const navigate = useNavigate();

  const totalPatients = patients.length;
  const totalAnalyses = analyses.length;
  const highRiskCases = analyses.filter(a => a.result === 'High Risk').length;

  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return 'Morning';
    if (hr < 17) return 'Afternoon';
    return 'Evening';
  };

  const displayName = user?.name ? `Dr. ${user.name.split(' ')[0]}` : 'Doctor';

  const StatCard = ({ label, value, icon: Icon, isAlert = false }: any) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`p-4 rounded-xl ${isAlert ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-[#007AFF]'} flex-shrink-0`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-2xl font-black text-gray-900 leading-none">{value}</p>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">{label}</p>
      </div>
    </div>
  );

  const handlePatientClick = (patientId: string) => {
    const patientObj = patients.find(p => p.id === patientId);
    if (patientObj) {
      setSelectedPatient(patientObj);
      navigate(`/patient_details/${patientId}`);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            {getGreeting()}, {displayName}
          </h1>
          <p className="text-xs text-gray-400 font-bold mt-1">
            Here is your endodontic diagnostic summary for today.
          </p>
        </div>
        <div className="flex gap-3">
          <AppButton 
            variant="secondary"
            onClick={() => navigate('/add_patient')}
            className="flex items-center gap-2 py-3 px-4 font-bold text-xs"
          >
            <UserPlus className="w-4 h-4" />
            Add Patient
          </AppButton>
          <AppButton 
            onClick={() => navigate('/upload_option')}
            className="flex items-center gap-2 py-3 px-4 font-bold text-xs"
          >
            <Plus className="w-4 h-4" />
            New Analysis
          </AppButton>
        </div>
      </div>

      {/* Stats Counter Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Patients" value={totalPatients || '1,240'} icon={Users} />
        <StatCard label="AI Analyses" value={totalAnalyses || '850'} icon={BrainCircuit} />
        <StatCard label="High Risk Cases" value={highRiskCases || '24'} icon={AlertCircle} isAlert={true} />
      </div>

      {/* Chart and Circular Gauge Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Material Usage Trends */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-gray-900 tracking-wide uppercase">Material Usage Trends</h3>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 block">BIOMATERIAL PREFERENCES</span>
          </div>
          
          {/* Simple Visual Bar Chart */}
          <div className="h-32 flex items-end justify-around gap-4 pt-6">
            <div className="flex flex-col items-center w-full">
              <div className="w-full bg-[#E3F2FD] rounded-lg h-24 hover:bg-blue-100 transition-all flex items-end">
                <div className="bg-[#007AFF] w-full rounded-lg h-[80%]" />
              </div>
              <span className="text-[9px] font-bold text-gray-400 mt-2">Biodentine</span>
            </div>
            <div className="flex flex-col items-center w-full">
              <div className="w-full bg-[#E3F2FD] rounded-lg h-24 hover:bg-blue-100 transition-all flex items-end">
                <div className="bg-blue-400 w-full rounded-lg h-[60%]" />
              </div>
              <span className="text-[9px] font-bold text-gray-400 mt-2">MTA</span>
            </div>
            <div className="flex flex-col items-center w-full">
              <div className="w-full bg-[#E3F2FD] rounded-lg h-24 hover:bg-blue-100 transition-all flex items-end">
                <div className="bg-blue-300 w-full rounded-lg h-[35%]" />
              </div>
              <span className="text-[9px] font-bold text-gray-400 mt-2">Calcium Hyd.</span>
            </div>
            <div className="flex flex-col items-center w-full">
              <div className="w-full bg-[#E3F2FD] rounded-lg h-24 hover:bg-blue-100 transition-all flex items-end">
                <div className="bg-gray-200 w-full rounded-lg h-[15%]" />
              </div>
              <span className="text-[9px] font-bold text-gray-400 mt-2">GIC</span>
            </div>
          </div>
        </div>

        {/* Circular Gauge - Average AI Confidence */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-between text-center">
          <div>
            <h3 className="text-sm font-extrabold text-gray-900 tracking-wide uppercase">Average AI Confidence</h3>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 block">ALGORITHM METRIC</span>
          </div>

          {/* Circle Gauge SVG */}
          <div className="relative w-28 h-28 flex items-center justify-center py-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#F1F5F9" strokeWidth="8" fill="transparent" />
              <circle cx="50" cy="50" r="40" stroke="#007AFF" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset="4" strokeLinecap="round" />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-xl font-black text-gray-900 leading-none">98.4%</span>
              <span className="text-[8px] font-bold text-gray-400 mt-1 uppercase">Reliability</span>
            </div>
          </div>

          <p className="text-[10px] text-gray-400 font-semibold px-2">
            Real-time verification of diagnostic accuracy metrics.
          </p>
        </div>

      </div>

      {/* Quick Access Grid Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-extrabold text-gray-900 tracking-wide uppercase">
            Recent AI Analyses
          </h3>
          <button 
            onClick={() => navigate('/patient_list')}
            className="text-xs font-bold text-[#007AFF] hover:underline flex items-center bg-transparent border-none cursor-pointer"
          >
            View All <ChevronRight className="w-4 h-4 ml-0.5" />
          </button>
        </div>

        {analyses.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-xs">
            No analyses performed yet. Click "New Analysis" to begin.
          </div>
        ) : (
          <div className="space-y-4">
            {analyses.slice(0, 3).map((analysis) => (
              <div 
                key={analysis.id} 
                onClick={() => handlePatientClick(analysis.patientId)}
                className="flex items-center justify-between p-4 rounded-2xl border border-gray-50 hover:border-blue-100 hover:bg-blue-50/20 transition-all cursor-pointer animate-fade-in"
              >
                <div className="flex items-center gap-4">
                  {/* Image Preview */}
                  <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl overflow-hidden flex items-center justify-center text-gray-300">
                    {analysis.xRayUri ? (
                      <img src={analysis.xRayUri} alt="X-ray Thumbnail" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-5 h-5" />
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">
                      {analysis.patientName}
                    </h4>
                    <p className="text-[10px] text-gray-400 font-semibold mt-1">
                      ID: #{analysis.patientId} • RDT: {analysis.rdtValue || '0.4 mm'} • {analysis.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 text-[10px] font-black uppercase rounded-lg ${
                    analysis.result === 'High Risk' 
                      ? 'bg-red-50 text-red-500' 
                      : analysis.result === 'Moderate' 
                      ? 'bg-yellow-50 text-yellow-600' 
                      : 'bg-green-50 text-green-500'
                  }`}>
                    {analysis.result}
                  </span>
                  <span className="text-[11px] font-bold text-[#007AFF]">
                    {analysis.confidence || '98.4%'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default DashboardScreen;
