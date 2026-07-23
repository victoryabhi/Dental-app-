import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../contexts/DashboardContext';
import AppButton from '../components/AppButton';
import { ArrowLeft, RefreshCw, RotateCw, ZoomIn, ZoomOut, Info } from 'lucide-react';
import toothIllustration from '../assets/tooth_illustration.png';

const ImagePreviewScreen = () => {
  const navigate = useNavigate();
  const { currentAnalysis } = useDashboard();
  const image = currentAnalysis.xrayImageUri || toothIllustration;
  
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.75));
  };

  const handleReset = () => {
    setRotation(0);
    setZoom(1);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-12">
      
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
            <h2 className="text-xl font-bold text-gray-900">
              Preview Radiograph
            </h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Adjust scan alignment and rotation</p>
          </div>
        </div>
        <button 
          onClick={handleReset}
          className="p-2 text-gray-500 hover:text-gray-700 bg-transparent border-none cursor-pointer"
          title="Reset adjustments"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Tooltip Instruction Bubble */}
      <div className="bg-[#007AFF] text-white py-3 px-5 rounded-2xl flex items-center gap-2.5 shadow-sm">
        <Info className="w-4 h-4 text-white flex-shrink-0" />
        <span className="text-[11px] font-bold">Pinch to zoom, drag to pan the radiograph.</span>
      </div>

      {/* Main Image Viewer Container */}
      <div className="relative w-full h-[320px] bg-black rounded-3xl overflow-hidden flex items-center justify-center border border-gray-100 shadow-inner">
        <div 
          className="transition-transform duration-200 ease-out"
          style={{
            transform: `rotate(${rotation}deg) scale(${zoom})`
          }}
        >
          <img 
            src={image} 
            alt="Radiograph Preview" 
            className="max-h-[300px] object-contain opacity-90"
          />
        </div>

        {/* Overlay Grid lines simulation */}
        <div className="absolute inset-0 border border-white/10 pointer-events-none grid grid-cols-3 grid-rows-3">
          <div className="border-r border-b border-white/5"></div>
          <div className="border-r border-b border-white/5"></div>
          <div className="border-b border-white/5"></div>
          <div className="border-r border-b border-white/5"></div>
          <div className="border-r border-b border-white/5"></div>
          <div className="border-b border-white/5"></div>
          <div className="border-r border-white/5"></div>
          <div className="border-r border-white/5"></div>
          <div></div>
        </div>

        {/* Floating Zoom / Rotate Actions Overlay */}
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3.5 py-2 rounded-full flex gap-3 text-white">
          <button onClick={handleZoomIn} className="p-1 hover:text-[#007AFF] bg-transparent border-none cursor-pointer transition-colors">
            <ZoomIn className="w-5 h-5" />
          </button>
          <button onClick={handleZoomOut} className="p-1 hover:text-[#007AFF] bg-transparent border-none cursor-pointer transition-colors">
            <ZoomOut className="w-5 h-5" />
          </button>
          <button onClick={handleRotate} className="p-1 hover:text-[#007AFF] bg-transparent border-none cursor-pointer transition-colors">
            <RotateCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="text-center space-y-1">
        <h4 className="font-extrabold text-sm text-gray-900">Tooth #15 Pre-Op</h4>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Captured Oct 24, 2023 - 10:15 AM</p>
      </div>

      <div className="space-y-4 pt-2">
        <AppButton 
          fullWidth
          onClick={() => navigate('/image_confirmation')}
          className="py-4 font-bold text-sm"
        >
          Confirm & Use Image
        </AppButton>
      </div>

    </div>
  );
};

export default ImagePreviewScreen;
