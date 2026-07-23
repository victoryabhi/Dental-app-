import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  UserPlus, 
  BrainCircuit, 
  Search, 
  AlertTriangle, 
  FileSpreadsheet, 
  Camera, 
  Mic 
} from 'lucide-react';

const QuickActionsScreen = () => {
  const navigate = useNavigate();

  const actions = [
    { name: 'New Patient', icon: UserPlus, color: 'bg-blue-50 text-[#007AFF]', path: '/add_patient' },
    { name: 'Start Analysis', icon: BrainCircuit, color: 'bg-blue-50 text-[#007AFF]', path: '/upload_option' },
    { name: 'Search ID', icon: Search, color: 'bg-blue-50 text-[#007AFF]', path: '/search_patient' },
    { name: 'Emergency Alert', icon: AlertTriangle, color: 'bg-red-50 text-red-500', path: '/notifications' },
    { name: 'Recent Reports', icon: FileSpreadsheet, color: 'bg-blue-50 text-[#007AFF]', path: '/all_analyses' },
    { name: 'Quick Scan', icon: Camera, color: 'bg-blue-50 text-[#007AFF]', path: '/camera_capture' }
  ];

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-12">
      
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
            Quick Actions
          </h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Frequently used clinical shortcuts and rapid tools</p>
        </div>
      </div>

      {/* Grid Menu */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <div
              key={act.name}
              onClick={() => navigate(act.path)}
              className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all cursor-pointer flex flex-col items-center justify-center text-center shadow-sm hover:shadow"
            >
              <div className={`w-12 h-12 ${act.color} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-gray-800 text-xs uppercase tracking-wide">
                {act.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* AI Voice Command Tip Card */}
      <div className="bg-[#007AFF] text-white p-6 rounded-3xl shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Mic className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-extrabold text-xs uppercase tracking-wide">Voice Command Tip</h4>
        </div>
        <p className="text-xs text-blue-100 leading-relaxed font-semibold">
          You can use voice commands to start a "New Patient" entry while preparing your clinical space. Just say <span className="text-white font-black italic">"Hey Endo, New Patient"</span>.
        </p>

        {/* Mock Audio Wave Node Visualizer */}
        <div className="flex items-center justify-center gap-1.5 py-2">
          <span className="w-1 h-3 bg-white/50 rounded-full animate-pulse"></span>
          <span className="w-1 h-5 bg-white/70 rounded-full animate-pulse delay-75"></span>
          <span className="w-1 h-7 bg-white rounded-full animate-pulse delay-150"></span>
          <span className="w-1 h-4 bg-white/60 rounded-full animate-pulse delay-100"></span>
          <span className="w-1 h-2 bg-white/40 rounded-full animate-pulse"></span>
        </div>
      </div>

    </div>
  );
};

export default QuickActionsScreen;
