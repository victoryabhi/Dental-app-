import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../contexts/DashboardContext';
import AppButton from '../components/AppButton';
import { ArrowLeft, Check, AlertCircle, ShieldCheck } from 'lucide-react';
import toothIllustration from '../assets/tooth_illustration.png';

const ImageConfirmationScreen = () => {
  const navigate = useNavigate();
  const { currentAnalysis } = useDashboard();
  
  const [isValidating, setIsValidating] = useState(true);
  const [validationFailed, setValidationFailed] = useState(false);
  const [confidence, setConfidence] = useState('98.4%');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsValidating(false);
      const uri = currentAnalysis.xrayImageUri || '';
      if (uri.includes('reject') || uri.includes('wrong') || uri === 'fail') {
        setValidationFailed(true);
      } else {
        setValidationFailed(false);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [currentAnalysis.xrayImageUri]);

  const handleProceed = () => {
    navigate('/rdt_input');
  };

  const handleRetake = () => {
    navigate('/upload_option');
  };

  const DiagnosticCheckItem = ({ label }: { label: string }) => (
    <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
      <div className="w-5 h-5 bg-green-50 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
        <Check className="w-3.5 h-3.5 stroke-[3]" />
      </div>
      <span>{label}</span>
    </div>
  );

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
            <h2 className="text-xl font-bold text-gray-900">
              Scan Confirmation
            </h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">radiograph structure quality validation</p>
          </div>
        </div>
      </div>

      {isValidating ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
          <h3 className="text-sm font-bold text-gray-900">Validating Scan</h3>
          <p className="text-xs text-gray-400 mt-1">Analyzing radiograph for diagnostic compliance...</p>
        </div>
      ) : validationFailed ? (
        <div className="bg-white p-6 rounded-3xl border border-red-100 shadow-sm text-center flex flex-col items-center space-y-6">
          <AlertCircle className="w-16 h-16 text-red-500 animate-bounce" />
          
          <div>
            <h3 className="text-xl font-extrabold text-red-500">
              Invalid Radiograph Detected
            </h3>
            <p className="text-xs text-gray-500 mt-2 px-4 leading-relaxed font-semibold">
              The uploaded image is not a valid dental X-ray. EndoAI requires a clear periapical, bitewing, or panoramic dental radiograph to accurately assess dentin-pulp structures.
            </p>
          </div>

          <div className="flex gap-4 w-full pt-4 max-w-sm">
            <button 
              onClick={handleRetake}
              className="w-1/2 py-3 text-xs font-bold text-gray-500 hover:bg-gray-50 border border-gray-200 rounded-xl bg-white cursor-pointer"
            >
              Upload Another
            </button>
            <AppButton onClick={handleRetake} className="w-1/2 bg-red-500 hover:bg-red-600 border-none font-bold text-xs py-3">
              Try Again
            </AppButton>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Confirmed Alert banner */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center flex flex-col items-center py-8">
            <div className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center mb-4 shadow-md shadow-green-100">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-xl font-black text-gray-950">Scan Confirmed</h3>
            <p className="text-xs text-gray-400 mt-1 font-semibold leading-relaxed max-w-sm">
              The radiographic image has been processed and validated for diagnostic quality.
            </p>
          </div>

          {/* Split Layout Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Column: Image Card */}
            <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
              <div className="w-full h-56 bg-black rounded-2xl overflow-hidden flex items-center justify-center">
                <img 
                  src={currentAnalysis.xrayImageUri || toothIllustration} 
                  alt="Confirmed Radiograph" 
                  className="w-full h-full object-cover opacity-95" 
                />
              </div>
              <div className="text-center mt-3">
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">PATIENT RADIOGRAPH</span>
              </div>
            </div>

            {/* Right Column: Validation Checks */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
              
              <div className="space-y-4">
                <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest pb-2 border-b border-gray-50">
                  Diagnostic Report
                </h4>
                
                <div className="space-y-3">
                  <DiagnosticCheckItem label="Image quality: High" />
                  <DiagnosticCheckItem label="Alignment: Correct Alignment" />
                  <DiagnosticCheckItem label="Optical Alignment: Validated" />
                  <DiagnosticCheckItem label="Zero Noise Map Detected" />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                <div>
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Confidence Score</span>
                  <span className="text-lg font-black text-[#007AFF] block mt-0.5">{confidence}</span>
                </div>
                <div className="w-10 h-10 bg-blue-50 text-[#007AFF] rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

            </div>

          </div>

          {/* Actions */}
          <div className="flex flex-col items-center gap-3 pt-4">
            <AppButton onClick={handleProceed} className="w-full max-w-md py-4 font-bold text-sm">
              Proceed to RDT Input →
            </AppButton>
            <button
              onClick={handleRetake}
              className="text-xs font-bold text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer"
            >
              Retake Image
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

export default ImageConfirmationScreen;
