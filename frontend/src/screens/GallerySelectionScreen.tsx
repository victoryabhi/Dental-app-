import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../contexts/DashboardContext';
import AppButton from '../components/AppButton';
import { ArrowLeft, CloudUpload } from 'lucide-react';
import toothIllustration from '../assets/tooth_illustration.png';

const GallerySelectionScreen = () => {
  const navigate = useNavigate();
  const { updateAnalysis } = useDashboard();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [category, setCategory] = useState('Recent');

  const categories = ['Recent', 'Periapical', 'Bite-wing', 'Occlusal'];

  // 6 Mock X-ray images (using our asset as the base sample for simplicity)
  const mockScans = [
    { id: '1', name: 'Scan #14 pre-op', uri: toothIllustration },
    { id: '2', name: 'Scan #15 pre-op', uri: toothIllustration },
    { id: '3', name: 'Scan #30 molar', uri: toothIllustration },
    { id: '4', name: 'Scan #19 molar', uri: toothIllustration },
    { id: '5', name: 'Bite-wing left', uri: toothIllustration },
    { id: '6', name: 'Occlusal upper', uri: toothIllustration }
  ];

  const handleSelectMock = (uri: string) => {
    setSelectedImage(uri);
    updateAnalysis({ xrayImageUri: uri });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedImage(result);
        updateAnalysis({ xrayImageUri: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    if (selectedImage) {
      navigate('/image_preview');
    }
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
              Select Radiographs
            </h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Select image view for AI analysis</p>
          </div>
        </div>
      </div>

      {/* Category selector tags */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase border transition-all cursor-pointer whitespace-nowrap ${
              category === cat 
                ? 'bg-[#007AFF] text-white border-[#007AFF]' 
                : 'bg-white text-gray-400 border-gray-100 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Radiographs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        
        {/* Custom Upload Box */}
        <label className="border-2 border-dashed border-gray-200 hover:border-blue-300 bg-white rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer min-h-[140px] transition-colors">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="hidden" 
          />
          <CloudUpload className="w-8 h-8 text-[#007AFF] mb-2" />
          <span className="font-extrabold text-gray-800 text-xs">Upload File</span>
          <p className="text-[9px] text-gray-400 font-semibold mt-0.5">DICOM or JPG</p>
        </label>

        {/* Sample Mock Scans */}
        {mockScans.map((scan) => {
          const isSelected = selectedImage === scan.uri;
          return (
            <div
              key={scan.id}
              onClick={() => handleSelectMock(scan.uri)}
              className={`bg-white p-2 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between min-h-[140px] shadow-sm ${
                isSelected 
                  ? 'border-[#007AFF] ring-2 ring-blue-500/20' 
                  : 'border-gray-100 hover:border-blue-200'
              }`}
            >
              <div className="w-full h-24 bg-black rounded-xl overflow-hidden relative">
                <img src={scan.uri} alt="" className="w-full h-full object-cover opacity-80" />
                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-[#007AFF] rounded-full flex items-center justify-center text-white border border-white">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="text-center pt-1.5">
                <span className="font-bold text-gray-800 text-[10px] leading-tight block">{scan.name}</span>
              </div>
            </div>
          );
        })}

      </div>

      {selectedImage && (
        <div className="pt-4 flex justify-end">
          <AppButton onClick={handleConfirm} className="py-3 px-8 font-bold text-xs">
            Confirm & Use Image
          </AppButton>
        </div>
      )}

    </div>
  );
};

export default GallerySelectionScreen;
