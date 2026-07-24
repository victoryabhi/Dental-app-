import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../contexts/DashboardContext';
import AppButton from '../components/AppButton';
import { ArrowLeft, FileText, CheckCircle, Share2, Mail, MessageCircle } from 'lucide-react';
import { jsPDF } from 'jspdf';

const DownloadReportScreen = () => {
  const navigate = useNavigate();
  const { selectedPatient, currentAnalysis } = useDashboard();
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const patientName = selectedPatient?.name || 'Nancy Thorne';
  const patientId = selectedPatient?.id || '45210';
  const material = currentAnalysis.selectedMaterial || 'Biodentine';
  const rdt = currentAnalysis.rdtValue || '0.4 mm';
  const risk = currentAnalysis.riskLevel || 'High Risk';

  const fileName = `EndoAI-Report-${patientId}.pdf`;

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
      
      // Document Header Accent Bar
      doc.setFillColor(0, 122, 255);
      doc.rect(0, 0, 210, 15, "F");

      // Brand Title
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(0, 122, 255);
      doc.text("EndoAI Assistant Diagnostic Report", 20, 32);

      // Subheading & Date
      doc.setFontSize(9);
      doc.setFont("Helvetica", "normal");
      doc.setTextColor(140, 140, 140);
      doc.text(`Generated on: ${new Date().toLocaleString()} | System: Web-V2.4`, 20, 40);

      // Horizontal separator line
      doc.setDrawColor(230, 230, 230);
      doc.line(20, 45, 190, 45);

      // PATIENT INFORMATION BOX
      doc.setFillColor(248, 250, 252);
      doc.rect(20, 50, 170, 32, "F");
      doc.setDrawColor(226, 232, 240);
      doc.rect(20, 50, 170, 32, "S");

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text("PATIENT SUMMARY", 25, 57);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105);
      doc.text(`Patient Name: ${patientName}`, 25, 65);
      doc.text(`Patient ID: #${patientId}`, 25, 73);
      doc.text(`Age / Gender: ${selectedPatient?.age || '38'} / ${selectedPatient?.gender || 'Female'}`, 110, 65);
      doc.text(`Contact Phone: ${selectedPatient?.phone || '555-0101'}`, 110, 73);

      // AI DIAGNOSTIC METRICS BOX
      doc.setFillColor(248, 250, 252);
      doc.rect(20, 88, 170, 32, "F");
      doc.rect(20, 88, 170, 32, "S");

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text("AI DIAGNOSTIC METRICS", 25, 95);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105);
      doc.text(`Remaining Dentin Thickness (RDT): ${rdt}`, 25, 103);
      doc.text(`Calculated Risk Assessment: ${risk}`, 25, 111);
      doc.text(`Selected Material: ${material}`, 110, 103);

      // CLINICAL RECOMMENDATION SECTION
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text("CLINICAL RECOMMENDATION", 20, 132);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105);
      
      const recommendationText = currentAnalysis.recommendations || 
        (risk === "High Risk" 
          ? "Direct Pulp Capping recommended due to close proximity to the pulp chamber." 
          : "Indirect pulp capping is suitable for this case.");
      
      const splitRecommendation = doc.splitTextToSize(recommendationText, 170);
      doc.text(splitRecommendation, 20, 139);

      // EMBEDDED RADIOGRAPH / X-RAY IMAGE
      const imgData = currentAnalysis.xrayImageUri || selectedPatient?.latestRadiographUri;
      if (imgData && imgData.startsWith("data:image")) {
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(15, 23, 42);
        doc.text("ANALYZED RADIOGRAPH", 20, 160);

        try {
          doc.addImage(imgData, "JPEG", 20, 166, 80, 80);
          
          // Image border
          doc.setDrawColor(200, 200, 200);
          doc.rect(19.5, 165.5, 81, 81, "S");
        } catch (imgErr) {
          console.warn("Could not embed image in PDF:", imgErr);
        }
      }

      // Footer Accent
      doc.setFontSize(8);
      doc.setTextColor(160, 160, 160);
      doc.text("This is an AI-assisted report and should be clinically verified by a professional endodontist.", 20, 285);

      doc.save(fileName);
    } catch (e) {
      console.error("PDF Generation Error", e);
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Hi, here is the EndoAI pulp capping diagnostic summary for patient *${patientName}* (ID: #${patientId}).\n\n*Results*:\n- RDT: ${rdt}\n- Risk: ${risk}\n- Suggested Material: ${material}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent(`EndoAI Diagnostic Summary - ${patientName}`);
    const body = encodeURIComponent(`Dear Colleague,\n\nHere is the clinical pulp capping diagnostic summary for patient:\n\nPatient Name: ${patientName}\nPatient ID: #${patientId}\nRemaining Dentin Thickness: ${rdt}\nRisk Assessment: ${risk}\nRecommended Material: ${material}\n\nGenerated by EndoAI Assistant.`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `EndoAI Report - ${patientName}`,
          text: `Diagnostic report for patient ${patientName}: RDT is ${rdt}, Risk level is ${risk}.`,
        });
      } catch (err) {
        console.warn("Native share error", err);
      }
    } else {
      setShowShareOptions(true);
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
              Download Report
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
          The comprehensive endodontic AI analysis for patient {patientName} is ready for download and sharing.
        </p>
      </div>

      {/* Progress/File Card */}
      <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4 max-w-sm mx-auto text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h5 className="font-extrabold text-gray-950 text-xs truncate">{fileName}</h5>
            <p className="text-[9px] text-gray-400 font-bold mt-0.5">RDT: {rdt} • Assessment: {risk}</p>
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
          Open & Save PDF
        </AppButton>

        {/* Share Suite */}
        <div className="space-y-3">
          <button
            onClick={handleNativeShare}
            disabled={!isCompleted}
            className="flex items-center justify-center gap-2 text-xs font-bold text-gray-500 hover:text-[#007AFF] bg-transparent border-none cursor-pointer block mx-auto py-2 transition-all"
          >
            <Share2 className="w-4 h-4" /> Share Diagnostic Summary
          </button>

          {(showShareOptions || !navigator.share) && (
            <div className="flex justify-center gap-4 py-2 border border-gray-50 rounded-2xl bg-gray-50/50 p-3 animate-fade-in max-w-xs mx-auto">
              <button 
                onClick={handleShareWhatsApp}
                className="flex items-center gap-1.5 text-xs font-bold text-[#25D366] hover:bg-green-50 p-2 rounded-xl transition-all border-none bg-transparent cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </button>
              <button 
                onClick={handleShareEmail}
                className="flex items-center gap-1.5 text-xs font-bold text-[#EA4335] hover:bg-red-50 p-2 rounded-xl transition-all border-none bg-transparent cursor-pointer"
              >
                <Mail className="w-4 h-4" /> Email
              </button>
            </div>
          )}
        </div>

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
