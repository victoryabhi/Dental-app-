import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../contexts/DashboardContext';
import { ArrowLeft, Bell, Trash2 } from 'lucide-react';

const NotificationsScreen = () => {
  const { notifications, clearNotifications, setSelectedPatient, patients } = useDashboard();
  const navigate = useNavigate();

  const handleNotificationClick = (patientId?: string | null) => {
    if (patientId) {
      const patientObj = patients.find(p => p.id === patientId);
      if (patientObj) {
        setSelectedPatient(patientObj);
        navigate(`/patient_details/${patientId}`);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full border-none cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-bold text-gray-900">
            Notifications
          </h2>
        </div>
        
        {notifications.length > 0 && (
          <button 
            onClick={clearNotifications}
            className="text-sm font-semibold text-[#007AFF] hover:text-blue-700 flex items-center gap-1.5 bg-transparent border-none cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Bell className="w-12 h-12 mx-auto stroke-[1.5] mb-3 opacity-60 text-gray-300" />
          No new notifications
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((item) => (
            <div 
              key={item.id}
              onClick={() => handleNotificationClick(item.patientId)}
              className={`flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-100 ${
                item.patientId ? 'hover:border-blue-200 hover:bg-blue-50/10 cursor-pointer' : ''
              }`}
            >
              <div className="w-10 h-10 bg-blue-50 text-[#007AFF] rounded-xl flex items-center justify-center flex-shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-gray-900 text-sm truncate">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-gray-400 font-semibold whitespace-nowrap">
                    {item.time}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Clinical Accuracy Tip Card */}
      <div className="bg-[#007AFF] text-white rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="font-extrabold text-sm text-white uppercase tracking-wide">Clinical Accuracy Tip</h3>
        </div>
        <p className="text-xs text-blue-100 leading-relaxed font-semibold">
          Using the high-frequency diagnostic filter in the image preview optimizer increases AI classification by 4.2% on sub-millimeter pulp exposures.
        </p>
        <button className="w-full py-3 bg-white text-[#007AFF] hover:bg-blue-50 font-bold text-xs rounded-xl border-none transition-colors cursor-pointer">
          View Tutorial
        </button>
      </div>
    </div>
  );
};

export default NotificationsScreen;
