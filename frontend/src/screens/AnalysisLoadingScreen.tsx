import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, Check } from 'lucide-react';

const AnalysisLoadingScreen = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        navigate('/ai_processing', { replace: true });
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, navigate]);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-[#F8F9FA] p-6 text-center">
      
      {/* Top Spacer */}
      <div />

      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col items-center py-10 space-y-6">
        
        {/* Progress Circle */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" stroke="#F1F5F9" strokeWidth="6" fill="transparent" />
            <circle cx="50" cy="50" r="42" stroke="#007AFF" strokeWidth="6" fill="transparent" strokeDasharray="263.8" strokeDashoffset={263.8 * (1 - progress / 100)} strokeLinecap="round" className="transition-all duration-100" />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-xl font-black text-gray-900 leading-none">{progress}%</span>
            <span className="text-[8px] font-bold text-gray-400 mt-1 uppercase tracking-wider">Loading</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-black text-gray-900 leading-tight">
            Initializing AI models...
          </h3>
          <p className="text-xs text-gray-400 font-semibold leading-relaxed mt-2 max-w-xs">
            Analyzing periapical radiographs for potential pathology and canal morphology.
          </p>
        </div>

        {/* Checklist statuses */}
        <div className="w-full max-w-xs space-y-3 pt-2 text-left">
          
          <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl">
            <span className="text-xs font-bold text-gray-700">Image Pre-processing</span>
            <span className="text-[9px] font-black uppercase text-green-600 bg-green-50 px-2 py-0.5 rounded-md">COMPLETED</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl">
            <span className="text-xs font-bold text-gray-700">Neural Network Inference</span>
            {progress < 100 ? (
              <span className="text-[9px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{Math.min(progress, 99)}%</span>
            ) : (
              <span className="text-[9px] font-black uppercase text-green-600 bg-green-50 px-2 py-0.5 rounded-md">COMPLETED</span>
            )}
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl">
            <span className="text-xs font-bold text-gray-300">Potential Exposure Map</span>
            {progress === 100 ? (
              <span className="text-[9px] font-black uppercase text-green-600 bg-green-50 px-2 py-0.5 rounded-md">COMPLETED</span>
            ) : (
              <span className="text-[9px] font-black uppercase text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">WAITING</span>
            )}
          </div>

        </div>

        {/* Info Tip Box */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex gap-3 text-left w-full">
          <Info className="w-5 h-5 text-[#007AFF] flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-extrabold text-[#007AFF] text-xs">Did you know?</h4>
            <p className="text-[9px] text-gray-400 font-semibold leading-relaxed mt-0.5">
              An analysis typically takes 8-12 seconds per tooth segment. Detailed canal mapping is currently being prioritized for Tooth #14.
            </p>
          </div>
        </div>

      </div>

      {/* Footer disclaimer */}
      <div className="pb-6">
        <span className="text-[9px] text-gray-400 font-extrabold tracking-widest uppercase">
          HIPAA ENCRYPTED NETWORK PIPELINE
        </span>
      </div>

    </div>
  );
};

export default AnalysisLoadingScreen;
