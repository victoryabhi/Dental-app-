import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../contexts/DashboardContext';
import { Sparkles, ShieldCheck } from 'lucide-react';
import toothIllustration from '../assets/tooth_illustration.png';

const RegionDetectionScreen = () => {
  const navigate = useNavigate();
  const { currentAnalysis } = useDashboard();
  const xray = currentAnalysis.xrayImageUri || toothIllustration;
  
  const [percent, setPercent] = useState(80);

  useEffect(() => {
    // Increment to 100% then redirect
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (percent === 100) {
      const timer = setTimeout(() => {
        navigate('/rdt_calculation', { replace: true });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [percent, navigate]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Region Detection
            </h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">segmented identification of dental tissue levels</p>
          </div>
        </div>
      </div>

      {/* Split Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Card: Tooth Section */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="relative w-full h-[280px] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center p-6">
            <img src={xray} alt="Segmented Tooth" className="w-full h-full object-cover opacity-90" />
            
            {/* Visual labels overlay */}
            <div className="absolute top-4 left-4 bg-red-500 text-white rounded-lg px-2 py-0.5 text-[8px] font-bold">
              Pulp Segmented: 98.2%
            </div>
            <div className="absolute bottom-4 right-4 bg-blue-500 text-white rounded-lg px-2 py-0.5 text-[8px] font-bold">
              Enamel Limit: 96.8%
            </div>
          </div>
        </div>

        {/* Right Card: Legends and Radiometry */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          
          <div className="space-y-6">
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest pb-2 border-b border-gray-50">
              Identified Regions
            </h3>

            <div className="space-y-4">
              
              {/* Legend 1 */}
              <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-500" />
                  <span className="text-xs font-bold text-gray-700">Pulp Chamber</span>
                </div>
                <span className="text-[10px] text-gray-400 font-bold">Soft tissue and nerves</span>
              </div>

              {/* Legend 2 */}
              <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-3.5 h-3.5 rounded-full bg-yellow-400" />
                  <span className="text-xs font-bold text-gray-700">Dentin Layer</span>
                </div>
                <span className="text-[10px] text-gray-400 font-bold">Primary tooth structure</span>
              </div>

              {/* Legend 3 */}
              <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-3.5 h-3.5 rounded-full bg-blue-500" />
                  <span className="text-xs font-bold text-gray-700">Enamel Shell</span>
                </div>
                <span className="text-[10px] text-gray-400 font-bold">Enamel structure</span>
              </div>

            </div>
          </div>

          {/* Radiometry mapping circle loader */}
          <div className="pt-6 border-t border-gray-50 flex items-center gap-4 text-xs font-bold text-gray-700 justify-center">
            <div className="relative flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
            </div>
            <div>
              <span className="block text-gray-900 leading-none">Analysing Radiometry...</span>
              <span className="block text-[10px] text-gray-400 font-semibold mt-1">Mapping RDT lines: {percent}% Complete</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default RegionDetectionScreen;
