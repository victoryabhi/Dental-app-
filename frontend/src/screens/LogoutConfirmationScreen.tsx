import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, ShieldAlert } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AppButton from '../components/AppButton';

const LogoutConfirmationScreen = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/welcome');
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-[#F8F9FA] p-6 text-center animate-fade-in">
      
      {/* Top Spacer */}
      <div />

      {/* Main Confirm Card */}
      <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm flex flex-col items-center">
        
        {/* Top Graphic Header */}
        <div className="w-full h-36 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center relative p-6">
          {/* Simulated Lock Graphic outline */}
          <div className="w-16 h-20 border-4 border-white/20 rounded-t-full flex items-center justify-center relative mt-4">
            <div className="w-12 h-10 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-white rounded-full" />
            </div>
          </div>
        </div>

        {/* Card Body content */}
        <div className="p-6 flex flex-col items-center space-y-6 w-full">
          
          {/* Logout bubble icon */}
          <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center -mt-12 border-4 border-white shadow-sm">
            <LogOut className="w-5 h-5 ml-0.5" />
          </div>

          <div>
            <h3 className="text-base font-black text-gray-900 leading-tight">
              Are you sure you want to log out?
            </h3>
            <p className="text-xs text-gray-400 font-semibold leading-relaxed mt-2 px-2">
              Your current clinical session will be securely closed.
            </p>
          </div>

          {/* Action buttons */}
          <div className="w-full flex flex-col gap-3">
            <button 
              onClick={handleLogout}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl border-none transition-colors cursor-pointer"
            >
              Logout
            </button>
            <button 
              onClick={() => navigate(-1)}
              className="w-full py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
            >
              Stay Logged In
            </button>
          </div>

          {/* HIPAA message */}
          <div className="pt-2 border-t border-gray-50 flex items-center gap-1.5 text-[8px] text-gray-400 font-black uppercase tracking-widest justify-center">
            <ShieldAlert className="w-3.5 h-3.5 text-gray-400" />
            <span>Secure Clinical Protocol Active</span>
          </div>

        </div>

      </div>

      {/* Footer Info */}
      <div className="space-y-1">
        <p className="text-[9px] text-gray-400 font-bold">EndoAI Assistant v2.4.0</p>
        <p className="text-[8px] text-gray-400/80 font-semibold">Authenticated Session: 8820-XJ</p>
      </div>

    </div>
  );
};

export default LogoutConfirmationScreen;
