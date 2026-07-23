import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Image, CloudUpload, Info, ArrowLeft } from 'lucide-react';

const UploadOptionScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full border-none cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-gray-900">
          Diagnostic Upload
        </h2>
      </div>

      <p className="text-sm text-gray-500 text-center leading-relaxed">
        Select a method to import dental images for AI analysis. High-resolution DICOM or JPEG formats are recommended.
      </p>

      {/* Camera Capture Card */}
      <div 
        onClick={() => navigate('/camera_capture')}
        className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-blue-200 transition-all cursor-pointer flex items-center gap-4 shadow-sm hover:shadow"
      >
        <div className="w-14 h-14 bg-blue-50 text-[#007AFF] rounded-2xl flex items-center justify-center flex-shrink-0">
          <Camera className="w-7 h-7" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-base">Take Photo</h4>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Capture a high-quality clinical photo using the device camera.
          </p>
        </div>
      </div>

      {/* Other Options Row */}
      <div className="grid grid-cols-2 gap-4">
        <div 
          onClick={() => navigate('/gallery_selection')}
          className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-blue-200 transition-all cursor-pointer flex flex-col items-center text-center shadow-sm"
        >
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-3">
            <Image className="w-6 h-6" />
          </div>
          <span className="font-bold text-gray-800 text-sm">Gallery</span>
        </div>

        <div 
          onClick={() => {}}
          className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-blue-200 transition-all cursor-pointer flex flex-col items-center text-center shadow-sm opacity-60"
        >
          <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mb-3">
            <CloudUpload className="w-6 h-6" />
          </div>
          <span className="font-bold text-gray-800 text-sm">PACS / Cloud</span>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-[#E3F2FD] p-4 rounded-2xl flex items-center gap-4">
        <CloudUpload className="w-6 h-6 text-[#007AFF] flex-shrink-0" />
        <p className="text-xs text-[#007AFF] font-medium leading-relaxed">
          Imported radiographs will be synced with clinical records for optimal patient review.
        </p>
      </div>

    </div>
  );
};

export default UploadOptionScreen;
