import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldAlert, Lock, BookOpen } from 'lucide-react';
import appLogo from '../assets/app_logo.png';

const AboutAppScreen = () => {
  const navigate = useNavigate();

  const AboutLinkItem = ({ label, desc, icon: Icon }: any) => (
    <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100/60 shadow-sm cursor-pointer hover:border-blue-200 transition-all">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-blue-50 text-[#007AFF] rounded-xl flex items-center justify-center">
          <Icon className="w-5 h-5" />
        </div>
        <div className="text-left">
          <span className="text-xs font-bold text-gray-900 block">{label}</span>
          <span className="text-[9px] text-gray-400 font-semibold block mt-0.5">{desc}</span>
        </div>
      </div>
      <span className="text-xs text-gray-400 font-bold">&gt;</span>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-12 animate-fade-in">
      
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
            About App
          </h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Application information & partners</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-6 text-center">
        <div className="w-24 h-24 bg-[#E3F2FD] rounded-3xl flex items-center justify-center p-4 shadow-sm mb-4">
          <img src={appLogo} alt="EndoAI Logo" className="w-full h-full object-contain" />
        </div>

        <h3 className="text-lg font-black text-gray-900">
          EndoAI Assistant
        </h3>
        <p className="text-[10px] text-[#007AFF] mt-1 font-bold uppercase tracking-wider">
          Version v1.2.0
        </p>
      </div>

      {/* Links list */}
      <div className="space-y-3 pt-2">
        <AboutLinkItem label="Legal Information" desc="Standard medical software disclosures" icon={ShieldAlert} />
        <AboutLinkItem label="Privacy Policy" desc="How we handle your clinical data" icon={Lock} />
        <AboutLinkItem label="Terms of Service" desc="Usage agreements for health clinics" icon={BookOpen} />
      </div>

      {/* Partner Clinics */}
      <div className="space-y-3 pt-6">
        <span className="block text-[10px] text-gray-400 font-extrabold uppercase tracking-widest text-center">Partner Clinics</span>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm text-center">
            <span className="font-extrabold text-xs text-gray-900 block">Metropolitan Dental Hub</span>
            <span className="text-[8px] text-[#007AFF] font-bold uppercase mt-1 block">Diagnostic Research Partner</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm text-center">
            <span className="font-extrabold text-xs text-gray-900 block">Apex Orthodontics</span>
            <span className="text-[8px] text-[#007AFF] font-bold uppercase mt-1 block">Clinical Beta Tests Clinic</span>
          </div>
        </div>
      </div>

      <p className="text-[9px] text-gray-400 text-center font-bold pt-8">
        © 2026 Saveetha Dental College & Hospitals. All Rights Reserved.
      </p>

    </div>
  );
};

export default AboutAppScreen;
