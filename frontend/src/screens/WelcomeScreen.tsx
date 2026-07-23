import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppButton from '../components/AppButton';
import { BrainCircuit } from 'lucide-react';
import toothIllustration from '../assets/tooth_illustration.png';

const WelcomeScreen = () => {
  const navigate = useNavigate();

  const StatCard = ({ value, label }: { value: string; label: string }) => (
    <div className="flex flex-col items-center">
      <span className="text-xl font-extrabold text-[#007AFF]">{value}</span>
      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">{label}</span>
    </div>
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#F8F9FA] p-6">
      <div className="w-full max-w-md flex-1 flex flex-col justify-between">
        
        {/* Top Header info */}
        <div className="flex justify-between items-center py-4">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">EndoAI Assistant</span>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        </div>

        {/* Tooth Illustration Card Section */}
        <div className="relative w-full h-[320px] rounded-3xl overflow-hidden shadow-sm bg-white border border-gray-100 flex-shrink-0">
          <img 
            src={toothIllustration} 
            alt="Tooth Illustration" 
            className="w-full h-full object-cover" 
          />
          
          {/* Overlay Info Card */}
          <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-100/50 flex items-center">
            <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <BrainCircuit className="w-6 h-6 text-[#007AFF]" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-black text-gray-900 tracking-wider">
                TOOTH #14 ANALYSIS
              </p>
              <p className="text-[10px] text-gray-500 font-semibold">
                Sub-millimeter pulp exposure detected
              </p>
            </div>
          </div>
        </div>

        {/* Welcome Text Content */}
        <div className="text-center mt-6 px-2">
          <h2 className="text-2xl font-extrabold text-gray-900 leading-tight">
            Welcome to the<br />future of endodontics
          </h2>
          <p className="text-sm text-gray-400 font-medium mt-3 leading-relaxed">
            Precision AI analysis for pulp capping decisions. Elevate your diagnostic accuracy with real-time endodontic insights.
          </p>
        </div>

        {/* Buttons section */}
        <div className="mt-8 space-y-3">
          <AppButton 
            fullWidth
            onClick={() => navigate('/email_input')}
            className="py-4 font-bold text-sm"
          >
            Login
          </AppButton>
          
          <AppButton 
            fullWidth
            variant="outline"
            onClick={() => navigate('/registration')}
            className="py-4 font-bold text-sm bg-white border-gray-200 hover:bg-gray-50"
          >
            Create Account
          </AppButton>
        </div>

        {/* Statistics section */}
        <div className="grid grid-cols-3 gap-2 py-6 mt-6 border-t border-gray-100">
          <StatCard value="98%" label="Efficiency" />
          <StatCard value="50k+" label="Cases Analyzed" />
          <StatCard value="<2s" label="Analysis Time" />
        </div>

      </div>
    </div>
  );
};

export default WelcomeScreen;
