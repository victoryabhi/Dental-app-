import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  ArrowLeft, 
  LayoutDashboard, 
  Users, 
  BrainCircuit, 
  BookOpen, 
  BarChart2, 
  HelpCircle 
} from 'lucide-react';
import toothIllustration from '../assets/tooth_illustration.png';

const NavOverviewScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const displayName = user?.name ? `Dr. ${user.name.split(' ')[0]}` : 'Dr. Nancy';
  const displayInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'N';

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in">
      
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
              Navigation Overview
            </h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
              Access all clinical modules and assistant tools from a single centralized view.
            </p>
          </div>
        </div>
      </div>

      {/* Grid Portal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Side Column: Dashboard, Patients, Materials, Analytics */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Card 1: Dashboard */}
          <div 
            onClick={() => navigate('/dashboard')}
            className="bg-white p-5 rounded-3xl border border-gray-100 hover:border-blue-200 transition-all cursor-pointer shadow-sm space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 text-[#007AFF] rounded-xl flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-gray-900 uppercase tracking-wide">Dashboard</h4>
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase">
              <span>• 2 Pending Syncs</span>
              <span>• 4 Patients Today</span>
            </div>
          </div>

          {/* Card 2: Patient Records */}
          <div 
            onClick={() => navigate('/patient_list')}
            className="bg-white p-5 rounded-3xl border border-gray-100 hover:border-blue-200 transition-all cursor-pointer shadow-sm space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-gray-900 uppercase tracking-wide">Patient Records</h4>
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase">
              <span>• Active Database</span>
              <span>• History Archives</span>
            </div>
          </div>

          {/* Card 3: Material Library */}
          <div 
            onClick={() => navigate('/material_library')}
            className="bg-white p-5 rounded-3xl border border-gray-100 hover:border-blue-200 transition-all cursor-pointer shadow-sm space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-gray-900 uppercase tracking-wide">Material Library</h4>
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase">
              <span>• Bio-inert Fillers</span>
              <span>• Liners Catalogue</span>
            </div>
          </div>

          {/* Card 4: Analytics */}
          <div 
            onClick={() => navigate('/all_analyses')}
            className="bg-white p-5 rounded-3xl border border-gray-100 hover:border-blue-200 transition-all cursor-pointer shadow-sm space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center">
                <BarChart2 className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-gray-900 uppercase tracking-wide">Practice Analytics</h4>
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase">
              <span>• Diagnostic Reports</span>
              <span>• Usage Trends</span>
            </div>
          </div>

          {/* Help & Support Card */}
          <div 
            onClick={() => {}}
            className="bg-white p-5 rounded-3xl border border-gray-100 hover:border-blue-200 transition-all cursor-pointer shadow-sm sm:col-span-2 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-50 text-gray-500 rounded-xl flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-gray-900 uppercase tracking-wide">Help & Support</h4>
            </div>
            <span className="text-[10px] text-[#007AFF] font-bold uppercase">Open Documentation</span>
          </div>

        </div>

        {/* Right Side Column: Doctor Profile & Clinical AI (Tooth Illustration) */}
        <div className="space-y-4 flex flex-col justify-between">
          
          {/* Profile Badge Card */}
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-[#E3F2FD] rounded-full flex items-center justify-center text-[#007AFF] text-lg font-black flex-shrink-0">
              {displayInitial}
            </div>
            <div>
              <h4 className="font-extrabold text-gray-900 text-sm">{displayName}</h4>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Endodontist</p>
            </div>
          </div>

          {/* Clinical AI Card (Spans the rest) */}
          <div 
            onClick={() => navigate('/upload_option')}
            className="bg-gradient-to-br from-[#007AFF] to-blue-600 text-white p-6 rounded-3xl shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between flex-1 space-y-8"
          >
            <div>
              <span className="text-[9px] text-blue-100 font-bold uppercase tracking-widest block">Clinical AI Analysis</span>
              <h3 className="text-lg font-black mt-2 leading-tight">
                Deep learning models for root canal detection, rest-line limits, and pathological diagnostic support.
              </h3>
            </div>

            <div className="relative w-full h-32 overflow-hidden rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
              <img src={toothIllustration} alt="" className="w-full h-full object-cover opacity-85" />
            </div>

            <div className="flex justify-between text-[10px] text-blue-100 font-bold uppercase tracking-widest pt-2">
              <span>• RDT Estimator</span>
              <span>• X-Ray Scanner</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default NavOverviewScreen;
