import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../contexts/DashboardContext';
import { Check, ShieldCheck } from 'lucide-react';
import toothIllustration from '../assets/tooth_illustration.png';

const AiProcessingScreen = () => {
  const navigate = useNavigate();
  const { currentAnalysis } = useDashboard();
  const xray = currentAnalysis.xrayImageUri || toothIllustration;
  
  const [progress, setProgress] = useState(0);
  const [scanOffset, setScanOffset] = useState(0);

  useEffect(() => {
    // Scan line animation loop
    const animInterval = setInterval(() => {
      setScanOffset((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 20);

    // Progress counter loader
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => {
      clearInterval(animInterval);
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        navigate('/region_detection', { replace: true });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, navigate]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              AI Processing Engine
            </h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">neural network scanning pipeline</p>
          </div>
        </div>
      </div>

      {/* Split Layout Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Side: Animated Scan view */}
        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="relative w-full h-[280px] bg-black rounded-2xl overflow-hidden flex items-center justify-center border border-gray-100">
            <img src={xray} alt="Scan target" className="w-full h-full object-cover opacity-60" />
            
            {/* Scan animation line */}
            <div 
              className="absolute left-0 right-0 h-1 bg-[#007AFF] shadow-[0_0_8px_#007AFF] transition-all duration-75"
              style={{ top: `${scanOffset}%` }}
            />

            {/* Circular Progress Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-[1px]">
              <div className="w-24 h-24 bg-black/60 border border-white/10 rounded-full flex flex-col items-center justify-center text-white">
                <span className="text-xl font-black">{progress}%</span>
                <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest mt-1">Analyzing</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-3 text-[9px] font-bold text-gray-400 uppercase">
            Scanner active • processing radiography nodes
          </div>
        </div>

        {/* Right Side: Step queue card */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-black text-gray-900 leading-none">Diagnostic Engine</h3>
              <p className="text-xs text-gray-400 font-semibold mt-1">Analysing radiometry and mapping dentin density thresholds.</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl">
                <span className="text-xs font-bold text-gray-700">Risk Analysis</span>
                <span className="text-[9px] font-black uppercase text-green-600 bg-green-50 px-2 py-0.5 rounded-md">COMPLETED</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl">
                <span className="text-xs font-bold text-gray-700">Analysing pulpal limits</span>
                {progress > 50 ? (
                  <span className="text-[9px] font-black uppercase text-green-600 bg-green-50 px-2 py-0.5 rounded-md">COMPLETED</span>
                ) : (
                  <span className="text-[9px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">IN PROGRESS</span>
                )}
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl">
                <span className="text-xs font-bold text-gray-300">Scanning dentin density</span>
                {progress === 100 ? (
                  <span className="text-[9px] font-black uppercase text-green-600 bg-green-50 px-2 py-0.5 rounded-md">COMPLETED</span>
                ) : (
                  <span className="text-[9px] font-black uppercase text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">WAITING</span>
                )}
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-gray-50 flex items-center gap-2 text-blue-600 text-xs font-bold justify-center">
            <ShieldCheck className="w-5 h-5 animate-pulse" />
            <span>Analysing Radiography. Please do not close this window.</span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AiProcessingScreen;
