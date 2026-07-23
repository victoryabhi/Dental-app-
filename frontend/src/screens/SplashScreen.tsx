import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppButton from '../components/AppButton';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Splash Screen Loaded Successfully");
  }, []);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-[#007AFF] p-6 text-white select-none">
      <div className="flex-1 flex flex-col items-center justify-center max-w-md text-center">
        {/* App Logo Icon Box */}
        <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-lg border border-white/20">
          <svg className="w-12 h-12 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 20,30 Q 20,10 50,10 Q 80,10 80,30 Q 85,60 70,90 L 60,80 L 50,90 L 40,80 L 30,90 Q 15,60 20,30 Z" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="30" r="5" fill="currentColor" />
            <circle cx="38" cy="45" r="4" fill="currentColor" />
            <circle cx="62" cy="45" r="4" fill="currentColor" />
            <line x1="30" y1="65" x2="70" y2="65" stroke="#FF5252" strokeWidth="4" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">
          AI Pulp Capping
        </h1>
        
        <p className="text-sm text-blue-100 font-medium px-4 leading-relaxed max-w-xs">
          Precision diagnostics and partner clinical confidence for endodontic excellence.
        </p>
      </div>

      <div className="w-full max-w-md pb-12 px-4">
        <AppButton 
          fullWidth
          onClick={() => navigate('/welcome')}
          className="bg-white text-[#007AFF] hover:bg-blue-50 font-bold text-base py-4 rounded-xl border-none shadow-md"
        >
          Get Started
        </AppButton>
      </div>
    </div>
  );
};

export default SplashScreen;
