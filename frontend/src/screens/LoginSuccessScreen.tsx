import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AppButton from '../components/AppButton';
import { Check } from 'lucide-react';

const LoginSuccessScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const displayName = user?.name ? `Dr. ${user.name.split(' ')[0]}` : 'Doctor';
  const displayInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'D';

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-[#F8F9FA] p-6 text-center">
      
      {/* Top Spacer / Header Logo */}
      <div className="pt-8 flex flex-col items-center">
        <div className="w-12 h-12 bg-[#007AFF] rounded-xl flex items-center justify-center mb-2 shadow-md shadow-blue-100 text-white">
          <svg className="w-6 h-6" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 20,30 Q 20,10 50,10 Q 80,10 80,30 Q 85,60 70,90 L 60,80 L 50,90 L 40,80 L 30,90 Q 15,60 20,30 Z" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="30" r="5" fill="currentColor" />
            <circle cx="38" cy="45" r="4" fill="currentColor" />
            <circle cx="62" cy="45" r="4" fill="currentColor" />
            <line x1="30" y1="65" x2="70" y2="65" stroke="#FF5252" strokeWidth="4" />
          </svg>
        </div>
      </div>

      {/* Success Card container */}
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-sm border border-gray-100 flex flex-col items-center py-10">
        
        {/* Checkmark Icon Circle */}
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white mb-6 shadow-md shadow-green-100">
          <Check className="w-10 h-10 stroke-[3]" />
        </div>

        <h2 className="text-xl font-black text-gray-900 mb-6">
          Login Successful
        </h2>

        {user ? (
          <>
            {/* Doctor Avatar Profile Placeholder */}
            <div className="w-20 h-20 bg-[#E3F2FD] rounded-full flex items-center justify-center text-[#007AFF] text-2xl font-black mb-4 shadow-inner">
              {displayInitial}
            </div>

            <h3 className="text-base font-black text-gray-800 mb-1">
              Welcome back, {displayName}
            </h3>
            <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest mb-8">
              Endodontist
            </p>
          </>
        ) : (
          <div className="py-8 text-gray-400 text-xs font-bold uppercase tracking-wider animate-pulse">
            Syncing user profile session...
          </div>
        )}

        <AppButton 
          fullWidth 
          onClick={() => navigate('/dashboard')}
          disabled={!user}
          className="py-4 font-bold text-sm"
        >
          Go to Dashboard
        </AppButton>
      </div>

      {/* HIPAA check bottom */}
      <div className="pb-6">
        <span className="text-[9px] text-gray-400 font-extrabold tracking-widest uppercase">
          Secured Clinical Workspace
        </span>
      </div>

    </div>
  );
};

export default LoginSuccessScreen;
