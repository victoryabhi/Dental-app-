import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../contexts/DashboardContext';
import AppButton from '../components/AppButton';
import { ArrowLeft, FileText, CheckCircle } from 'lucide-react';
import { jsPDF } from 'jspdf';

const DownloadReportScreen = () => {
  const navigate = useNavigate();
  const { selectedPatient, currentAnalysis } = useDashboard();
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const patientName = selectedPatient?.name || 'Nancy Thorne';
  const patientId = selectedPatient?.id || '45210';
  const material = currentAnalysis.selectedMaterial || 'Biodentine';
  const rdt = currentAnalysis.rdtValue || '0.4 mm';
  const risk = currentAnalysis.riskLevel || 'High Risk';

  const fileName = `EndoAI-14_Report_2023.pdf`;

  useEffect(() => {
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCompleted(true);
          return 100;
        }
        return prev + 10;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  const generatePDF = () => {
    try {
      const doc = new jsPDF();
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(0, 122, 255);
      doc.text("EndoAI Assistant Diagnostic Report", 20, 30);

      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 38);

      doc.setDrawColor(220, 220, 220);
      doc.line(20, 42, 190, 42);

      doc.setFontSize(12);
      doc.setTextColor(50, 50, 50);
      doc.setFont("Helvetica", "bold");
      doc.text("PATIENT INFORMATION", 20, 52);
      
      doc.setFont("Helvetica", "normal");
      doc.text(`Patient Name: ${patientName}`, 20, 60);
      doc.text(`Patient ID: #${patientId}`, 20, 68);
      doc.text(`Age / Gender: ${selectedPatient?.age || '38'} / ${selectedPatient?.gender || 'Female'}`, 20, 76);

      doc.setFont("Helvetica", "bold");
      doc.text("AI DIAGNOSTIC METRICS", 20, 92);
      doc.setFont("Helvetica", "normal");
      doc.text(`Remaining Dentin Thickness (RDT): ${rdt}`, 20, 100);
      doc.text(`Risk Assessment: ${risk}`, 20, 108);

      doc.setFont("Helvetica", "bold");
      doc.text("CLINICAL RECOMMENDATION", 20, 132);
      doc.setFont("Helvetica", "normal");
      doc.text(`Selected Material: ${material}`, 20, 140);

      doc.save(fileName);
    } catch (e) {
      console.error("PDF Generation Error", e);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-12 animate-fade-in text-center">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 text-left">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full border-none cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Download Report Screen
            </h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">radiograph report export</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center mb-4 shadow-md shadow-green-100">
          <CheckCircle className="w-8 h-8 stroke-[3]" />
        </div>
        <h3 className="text-xl font-black text-gray-950">
          Report Generated Successfully
        </h3>
        <p className="text-xs text-gray-400 font-semibold mt-1 px-4 leading-relaxed max-w-sm">
          The comprehensive endodontic AI analysis for Case #REP-2026-45212 is ready.
        </p>
      </div>

      {/* Progress card or completed card */}
      <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4 max-w-sm mx-auto text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h5 className="font-extrabold text-gray-950 text-xs truncate">{fileName}</h5>
            <p className="text-[9px] text-gray-400 font-bold mt-0.5">Size: 4.8MB • Generated Just Now</p>
          </div>
        </div>

        {/* Progress Bar */}
        {!isCompleted && (
          <div className="space-y-1 pt-2">
            <div className="flex justify-between text-[8px] text-gray-400 font-bold uppercase tracking-wider">
              <span>Generating Document...</span>
              <span>{downloadProgress}%</span>
            </div>
            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#007AFF] transition-all duration-75"
                style={{ width: `${downloadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4 pt-6 max-w-sm mx-auto">
        <AppButton 
          fullWidth
          disabled={!isCompleted}
          onClick={generatePDF}
          className="py-4 font-bold text-sm"
        >
          Open PDF
        </AppButton>

        <button
          onClick={() => {}}
          disabled={!isCompleted}
          className="text-xs font-bold text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer block mx-auto"
        >
          Share
        </button>

        <button
          onClick={() => navigate('/dashboard')}
          className="text-xs font-bold text-[#007AFF] hover:underline bg-transparent border-none cursor-pointer block mx-auto pt-4"
        >
          Return to Dashboard
        </button>
      </div>

    </div>
  );
};

export default DownloadReportScreen;
