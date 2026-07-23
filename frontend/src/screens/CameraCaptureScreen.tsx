import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../contexts/DashboardContext';
import { Camera, X, ZapOff } from 'lucide-react';
import toothIllustration from '../assets/tooth_illustration.png';

const CameraCaptureScreen = () => {
  const navigate = useNavigate();
  const { updateAnalysis } = useDashboard();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [hasCamera, setHasCamera] = useState(true);

  useEffect(() => {
    async function startCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.warn("Webcam not available, using simulation.", err);
        setHasCamera(false);
      }
    }
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    // Stop camera stream
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    // Save mock dental x-ray image URI
    updateAnalysis({ xrayImageUri: toothIllustration });
    navigate('/image_preview');
  };

  const handleClose = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col justify-between p-6">
      
      {/* Top Header */}
      <div className="flex justify-between items-center text-white">
        <button 
          onClick={handleClose}
          className="p-2 text-white/80 hover:text-white bg-transparent border-none cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>
        
        <span className="text-sm font-semibold tracking-wide">
          ALIGN RADIOGRAPH
        </span>

        <button className="p-2 text-white/80 hover:text-white bg-transparent border-none cursor-pointer">
          <ZapOff className="w-6 h-6" />
        </button>
      </div>

      {/* Viewfinder */}
      <div className="flex-1 flex items-center justify-center my-6 relative">
        {hasCamera ? (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full max-w-md aspect-[3/4] object-cover rounded-3xl border border-white/20 bg-gray-900" 
          />
        ) : (
          <div className="w-full max-w-md aspect-[3/4] bg-gray-900 rounded-3xl border border-white/20 flex flex-col items-center justify-center p-6 text-center text-white/60">
            <Camera className="w-12 h-12 mb-3 text-white/40" />
            <p className="text-sm font-bold">Simulator Viewfinder</p>
            <p className="text-xs text-white/40 mt-1">Webcam permission or device not detected. You can capture a sample radiograph instead.</p>
          </div>
        )}

        {/* Alignment bracket overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-48 h-48 border-2 border-dashed border-[#007AFF]/60 rounded-2xl"></div>
        </div>
      </div>

      {/* Shutter Button area */}
      <div className="flex justify-center pb-6">
        <button
          onClick={handleCapture}
          className="w-20 h-20 bg-white hover:bg-gray-100 rounded-full border-[6px] border-white/30 flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
        >
          <div className="w-14 h-14 bg-white rounded-full shadow-inner flex items-center justify-center text-[#007AFF]">
            <Camera className="w-6 h-6" />
          </div>
        </button>
      </div>

    </div>
  );
};

export default CameraCaptureScreen;
